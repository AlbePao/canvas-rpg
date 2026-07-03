import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import { Game } from '../../lib/Game';
import type { GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import { emitHeroItemCollect, getHeroObject, HERO_REQUESTS_ACTION } from '../Hero';
import type { ItemKey } from '../Item';
import { BEHAVIOR_END, isPositionBlocked, MovableObject } from '../MovableObject';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, SelectionBox, type SelectionOption } from '../SelectionBox';
import { Sprite } from '../Sprite';
import { TEXT_BOX_CLOSE, TEXT_BOX_END, TEXT_BOX_OPEN, TextBox } from '../TextBox';
import {
  NPC_STAND_DOWN,
  NPC_STAND_LEFT,
  NPC_STAND_RIGHT,
  NPC_STAND_UP,
  NPC_WALK_DOWN,
  NPC_WALK_LEFT,
  NPC_WALK_RIGHT,
  NPC_WALK_UP,
} from './npc.animations';
import type { NpcBehavior, NpcConfig } from './npc.types';

export class Npc extends MovableObject {
  protected readonly body: Sprite;
  private _contentItemKey: ItemKey | null = null;
  /**
   * Tracks whether THIS Npc is the one currently awaiting its own text box to
   * close, since TEXT_BOX_CLOSE is a global event fired for any text box in the game.
   */
  private _isAwaitingTextBoxClose = false;
  private _isWalking = false;

  constructor(config: NpcConfig) {
    super(config);

    const { id, npc } = config;

    // Opt into being solid
    this.isSolid = true;

    // Shadow under feet is separated from body to stay in place when npc is doing some actions, like walking or jumping
    this.addChild(this.createShadowSprite(`${id}-npc-shadow-sprite`));

    // Body sprite
    this.body = new Sprite({
      id: `${id}-npc-body-sprite`,
      resource: Resources.images[npc],
      frameSize: new Vector2(32, 32),
      hFrames: 4,
      vFrames: 4,
      position: new Vector2(-8, -20),
      animations: new Animations({
        standDown: new FrameIndexPattern(NPC_STAND_DOWN),
        standLeft: new FrameIndexPattern(NPC_STAND_LEFT),
        standRight: new FrameIndexPattern(NPC_STAND_RIGHT),
        standUp: new FrameIndexPattern(NPC_STAND_UP),
        walkDown: new FrameIndexPattern(NPC_WALK_DOWN),
        walkLeft: new FrameIndexPattern(NPC_WALK_LEFT),
        walkRight: new FrameIndexPattern(NPC_WALK_RIGHT),
        walkUp: new FrameIndexPattern(NPC_WALK_UP),
      }),
    });
    this.addChild(this.body);
  }

  override ready(): void {
    super.ready();

    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getTextContent();
      const { x, y } = position;

      if (!this.position.matches([x, y]) || !content) {
        return;
      }

      const heroDirection = getHeroObject(this.parent)?.facingDirection;

      if (heroDirection === 'DOWN') {
        this.changeFacingDirection('UP');
      } else if (heroDirection === 'UP') {
        this.changeFacingDirection('DOWN');
      } else if (heroDirection === 'RIGHT') {
        this.changeFacingDirection('LEFT');
      } else if (heroDirection === 'LEFT') {
        this.changeFacingDirection('RIGHT');
      }

      const { addsFlag, portraitFrame, text, itemKey, options } = content;

      // Potentially add a story flag
      if (addsFlag) {
        StoryFlags.add(addsFlag);
      }

      // Save locally the item to pick when text box is closed and hero satisfies the story flags
      if (itemKey) {
        this._contentItemKey = itemKey;
      }

      // Instantiate and emit the textbox
      const textBox = new TextBox({
        id: `text-box-for-${this.id}`,
        portraitFrame,
        text,
      });

      Events.emit<TextBox>(TEXT_BOX_OPEN, textBox);
      this._isAwaitingTextBoxClose = true;

      // After all text is displayed, open possibly selection box if options are available
      if (options.length > 0) {
        const textBoxEndSub = Events.on(TEXT_BOX_END, this, () => {
          Events.emit<SelectionBox>(
            SELECTION_BOX_OPEN,
            new SelectionBox({
              id: `selection-box-for-${this.id}`,
              options,
            }),
          );

          Events.off(textBoxEndSub);
        });

        const selectionBoxClosedSub = Events.on<SelectionOption>(SELECTION_BOX_CLOSE, this, (selectedOption) => {
          const { response, addsFlag, itemKey } = selectedOption;

          // Potentially add a story flag
          if (addsFlag) {
            StoryFlags.add(addsFlag);
          }

          if (response && response.length > 0) {
            // Save locally the item to pick when text box is closed
            if (itemKey) {
              this._contentItemKey = itemKey;
            }

            // Update textbox instance with selected option response
            textBox.updateLines({
              id: `text-box-for-${this.id}`,
              portraitFrame: content?.portraitFrame ?? null,
              text: response,
            });
          } else if (itemKey) {
            // No response, give item directly to the hero after closing the textbox
            Events.emit(TEXT_BOX_CLOSE);
            emitHeroItemCollect(itemKey);
          }

          Events.off(selectionBoxClosedSub);
        });
      }
    });

    Events.on(TEXT_BOX_CLOSE, this, () => {
      /**
       * TEXT_BOX_CLOSE fires for ANY text box closing (another Npc, aChest, the save confirmation, etc.),
       * so only react when this Npc actually has one open/pending.
       */
      if (!this._isAwaitingTextBoxClose) {
        return;
      }
      this._isAwaitingTextBoxClose = false;

      const resetDirection = this.behaviorConfig[this.behaviorIndex]?.direction ?? 'DOWN';
      this.changeFacingDirection(resetDirection);

      if (this._contentItemKey) {
        // Now hero can collect the item
        emitHeroItemCollect(this._contentItemKey);
        // Reset the items once hero collects it
        this._contentItemKey = null;
      }
    });
  }

  override step(): void {
    if (!this._isWalking || this.isLocked) {
      return;
    }

    // Move towards the walk target
    const distance = Game.moveTowards(this, this.destinationPosition, this.walkingSpeed);
    const hasArrived = distance <= 1;

    if (hasArrived) {
      this._isWalking = false;
      this.walkingSpeed = 1;
      this.position.x = this.destinationPosition.x;
      this.position.y = this.destinationPosition.y;
      Events.emit<string>(BEHAVIOR_END, this.id);
    }
  }

  protected override startBehavior(behavior: NpcBehavior): void {
    const { type } = behavior;

    if (type === 'stand') {
      const { direction, duration } = behavior;

      if (!this.isLocked) {
        this.changeFacingDirection(direction);
      }

      if (duration) {
        this.scheduleTimeout(() => {
          Events.emit<string>(BEHAVIOR_END, this.id);
        }, duration);
      }
    } else if (type === 'walk') {
      if (this.isLocked) {
        this.scheduleTimeout(() => {
          this.startBehavior(behavior);
        }, 10);

        return;
      }

      const { direction, speed } = behavior;

      // Calculate the walk target based on direction and distance
      let nextX = this.destinationPosition.x;
      let nextY = this.destinationPosition.y;

      const { gridSize } = Game;

      if (direction === 'DOWN') {
        nextY += gridSize;
        this.body.animations?.play('walkDown');
      }
      if (direction === 'UP') {
        nextY -= gridSize;
        this.body.animations?.play('walkUp');
      }
      if (direction === 'LEFT') {
        nextX -= gridSize;
        this.body.animations?.play('walkLeft');
      }
      if (direction === 'RIGHT') {
        nextX += gridSize;
        this.body.animations?.play('walkRight');
      }

      this.walkingSpeed = speed ?? 1;
      this.facingDirection = direction;

      // Validate the walk target is free
      const isBlocked = isPositionBlocked(this.parent?.children ?? [], nextX, nextY);

      if (isBlocked) {
        this.changeFacingDirection(direction);
        this.scheduleTimeout(() => {
          this.startBehavior(behavior);
        }, 10);
        return;
      }

      this._isWalking = true;
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
