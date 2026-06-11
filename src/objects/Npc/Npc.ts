import { GRID_SIZE } from '../../constants/gridSize';
import { STANDING_DIRECTIONS } from '../../constants/standingDirections';
import { emitPickupAnimation } from '../../helpers/emitPickupAnimation';
import { getHeroObject, isHeroObject } from '../../helpers/getHeroObject';
import { moveTowards } from '../../helpers/moveTowards';
import { Animations } from '../../lib/Animations';
import { Events } from '../../lib/Events';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import { BEHAVIOR_END, type GameObject } from '../../lib/GameObject';
import { Resources } from '../../lib/Resources';
import { SCREEN_TRANSITION_END, SCREEN_TRANSITION_START } from '../../lib/ScreenTransition';
import { StoryFlags } from '../../lib/StoryFlags';
import { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import { HERO_REQUESTS_ACTION } from '../Hero';
import { InteractiveObject } from '../InteractiveObject';
import type { ItemKey } from '../Item';
import { PAUSE_OFF, PAUSE_ON } from '../PauseMenu';
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

export class Npc extends InteractiveObject {
  private readonly _body: Sprite;
  private _contentItemKey: ItemKey | null = null;
  private _isLocked = false;
  private _isWalking = false;
  private _walkingSpeed = 1;
  facingDirection: Directions = 'DOWN';
  readonly destinationPosition: Vector2;

  constructor(config: NpcConfig) {
    super(config);

    const { id, npc } = config;

    // Opt into being solid
    this.isSolid = true;

    // Shadow under feet is separated from body to stay in place when npc is doing some actions, like walking or jumping
    const shadow = new Sprite({
      id: `${id}-npc-shadow-sprite`,
      resource: Resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    // Body sprite
    this._body = new Sprite({
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
    this.addChild(this._body);

    this.destinationPosition = this.position.duplicate();
  }

  override ready(): void {
    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getTextContent();
      const { x, y } = position;

      if (!this.position.matches([x, y]) || !content) {
        return;
      }

      const heroDirection = getHeroObject(this.parent)?.facingDirection;

      if (heroDirection === 'DOWN') {
        this._changeFacingDirection('UP');
      } else if (heroDirection === 'UP') {
        this._changeFacingDirection('DOWN');
      } else if (heroDirection === 'RIGHT') {
        this._changeFacingDirection('LEFT');
      } else if (heroDirection === 'LEFT') {
        this._changeFacingDirection('RIGHT');
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
            emitPickupAnimation(itemKey);
          }

          Events.off(selectionBoxClosedSub);
        });
      }
    });

    Events.on(TEXT_BOX_CLOSE, this, () => {
      const resetDirection = this.behaviorConfig[this.behaviorIndex]?.direction ?? 'DOWN';
      this._changeFacingDirection(resetDirection);

      if (this._contentItemKey) {
        // Now hero can collect the item
        emitPickupAnimation(this._contentItemKey);
        // Reset the items once hero collects it
        this._contentItemKey = null;
      }
    });

    // Lock npc when game is paused, cutscene is playing or hero is changing level
    [PAUSE_ON, TEXT_BOX_OPEN, SCREEN_TRANSITION_START].forEach((event) => {
      Events.on(event, this, () => {
        this._isLocked = true;
        // Freeze animation
        this._body.animations?.pause();
      });
    });
    [PAUSE_OFF, TEXT_BOX_CLOSE, SCREEN_TRANSITION_END].forEach((event) => {
      Events.on(event, this, () => {
        this._isLocked = false;
        // Resume animation
        this._body.animations?.resume();
      });
    });
  }

  override step(): void {
    if (!this._isWalking || this._isLocked) {
      return;
    }

    // Move towards the walk target
    const distance = moveTowards(this, this.destinationPosition, this._walkingSpeed);
    const hasArrived = distance <= 1;

    if (hasArrived) {
      this._isWalking = false;
      this._walkingSpeed = 1;
      this.position.x = this.destinationPosition.x;
      this.position.y = this.destinationPosition.y;
      Events.emit<string>(BEHAVIOR_END, this.id);
    }
  }

  protected override startBehavior(behavior: NpcBehavior): void {
    const { type } = behavior;

    if (type === 'stand') {
      const { direction, duration } = behavior;

      if (!this._isLocked) {
        this._changeFacingDirection(direction);
      }

      if (duration) {
        this.scheduleTimeout(() => {
          Events.emit<string>(BEHAVIOR_END, this.id);
        }, duration);
      }
    } else if (type === 'walk') {
      if (this._isLocked) {
        this.scheduleTimeout(() => {
          this.startBehavior(behavior);
        }, 10);

        return;
      }

      const { direction, speed } = behavior;

      // Calculate the walk target based on direction and distance
      let nextX = this.destinationPosition.x;
      let nextY = this.destinationPosition.y;

      if (direction === 'DOWN') {
        nextY += GRID_SIZE;
        this._body.animations?.play('walkDown');
      }
      if (direction === 'UP') {
        nextY -= GRID_SIZE;
        this._body.animations?.play('walkUp');
      }
      if (direction === 'LEFT') {
        nextX -= GRID_SIZE;
        this._body.animations?.play('walkLeft');
      }
      if (direction === 'RIGHT') {
        nextX += GRID_SIZE;
        this._body.animations?.play('walkRight');
      }

      this._walkingSpeed = speed ?? 1;
      this.facingDirection = direction;

      // Validate the walk target is free
      const solidBodyAtSpace = this.parent?.children.find((child) => {
        // Check if solid body is at the target position
        if (child.isSolid && child.position.x === nextX && child.position.y === nextY) {
          return true;
        }

        // Check if Hero is walking to that position (reserve the space)
        if (isHeroObject(child) && child.destinationPosition.x === nextX && child.destinationPosition.y === nextY) {
          return true;
        }

        return false;
      });

      if (solidBodyAtSpace) {
        this._changeFacingDirection(direction);
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

  private _changeFacingDirection(direction: Directions): void {
    this.facingDirection = direction;
    this._body.animations?.play(STANDING_DIRECTIONS[direction]);
  }
}
