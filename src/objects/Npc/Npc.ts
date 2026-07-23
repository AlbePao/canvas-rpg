import { Events } from '../../lib/Events';
import { GRID_SIZE } from '../../lib/Game';
import type { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { StoryFlags } from '../../lib/StoryFlags';
import { Battle, BATTLE_START } from '../Battle';
import { emitHeroItemCollect, getHeroObject, HERO_REQUESTS_ACTION } from '../Hero';
import { BEHAVIOR_END, isPositionBlocked, MovableObject, moveTowards } from '../MovableObject';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, SelectionBox, type SelectionOption } from '../SelectionBox';
import { Sprite } from '../Sprite';
import { TEXT_BOX_CLOSE, TEXT_BOX_CLOSE_REQUESTED, TEXT_BOX_END, TEXT_BOX_OPEN, TextBox } from '../TextBox';
import type { NpcBehavior, NpcConfig } from './npc.types';

export class Npc extends MovableObject {
  protected readonly body: Sprite;
  private _contentItemKey: string | null = null;
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

    const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.getAssetData(npc);

    // Body sprite
    this.body = new Sprite({
      id: `${id}-npc-body-sprite`,
      resource,
      frameSize,
      hFrames,
      vFrames,
      position,
      animations: this.createAnimations('npc'),
    });
    this.addChild(this.body);
  }

  override ready(): void {
    super.ready();

    Events.on<GameObject>(HERO_REQUESTS_ACTION, this, ({ position }) => {
      const content = this.getContent();
      const { x, y } = position;

      if (!this.position.matches([x, y]) || !content) {
        return;
      }

      const heroDirection = getHeroObject(this.parent)?.facingDirection;

      if (heroDirection === 'down') {
        this.changeFacingDirection('up');
      } else if (heroDirection === 'up') {
        this.changeFacingDirection('down');
      } else if (heroDirection === 'right') {
        this.changeFacingDirection('left');
      } else if (heroDirection === 'left') {
        this.changeFacingDirection('right');
      }

      const { addsFlag, portraitFrame, text, itemKey, options, battle } = content;

      // Potentially add a story flag
      if (addsFlag) {
        StoryFlags.add(addsFlag);
      }

      // Save locally the item to collect when text box is closed and hero satisfies the story flags
      if (itemKey) {
        this._contentItemKey = itemKey;
      }

      // Instantiate and emit the textbox
      const textBox = new TextBox({
        id: `text-box-for-${this.id}`,
        portraitFrame,
        text,
        autoClose: !battle, // If there is a battle, disable auto-close
      });

      Events.emit<TextBox>(TEXT_BOX_OPEN, textBox);
      this._isAwaitingTextBoxClose = true;

      // Start battle
      if (battle) {
        const confirmSub = Events.on<TextBox>(TEXT_BOX_CLOSE_REQUESTED, this, (currentTextBox) => {
          if (currentTextBox !== textBox) {
            return;
          }

          // Lock text box to prevent further interaction until the battle is started
          textBox.lock();

          new ScreenTransition(() => {
            // Transition is done, now we can close the text box and start the battle
            Events.emit<TextBox>(TEXT_BOX_CLOSE, textBox);
            Events.emit<Battle>(BATTLE_START, new Battle(battle, this));
          });

          Events.off(confirmSub);
        });

        return;
      }

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
            // Save locally the item to collect when text box is closed
            if (itemKey) {
              this._contentItemKey = itemKey;
            }

            // Update textbox instance with selected option response
            textBox.updateLines({
              id: `text-box-for-${this.id}`,
              portraitFrame,
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

      const resetDirection = this.behaviorConfig[this.behaviorIndex]?.direction ?? this.defaultFacingDirection;
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
    const distance = moveTowards(this, this.destinationPosition, this.walkingSpeed);
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

      if (direction === 'down') {
        nextY += GRID_SIZE;
        this.body.animations?.play('walkDown');
      } else if (direction === 'up') {
        nextY -= GRID_SIZE;
        this.body.animations?.play('walkUp');
      } else if (direction === 'left') {
        nextX -= GRID_SIZE;
        this.body.animations?.play('walkLeft');
      } else if (direction === 'right') {
        nextX += GRID_SIZE;
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
