import { Events } from '../../lib/Events';
import { Resources } from '../../lib/Resources';
import { SCREEN_TRANSITION_END, SCREEN_TRANSITION_START } from '../../lib/ScreenTransition';
import { Vector2 } from '../../lib/Vector2';
import type { Directions } from '../../types/directions';
import { InteractiveObject } from '../InteractiveObject';
import type { Main } from '../Main';
import { PAUSE_OFF, PAUSE_ON } from '../PauseMenu';
import { Sprite } from '../Sprite';
import { TEXT_BOX_CLOSE, TEXT_BOX_OPEN } from '../TextBox';
import { BEHAVIOR_END } from './movableObject.constants';
import type { MovableObjectBehavior, MovableObjectConfig } from './movableObject.types';
import { getStandingFrame } from './movableObject.utils';

/**
 * Shared base for any grid-walking GameObject (Hero, Npc): tracks facing direction and a
 * "reserved" destination cell it's walking towards, locks movement/animation while a
 * text box is open, the game is paused, or the level is transitioning, and drives the
 * optional sequenced `behaviorConfig` loop (walk/stand steps used by Npc patrols).
 */
export abstract class MovableObject extends InteractiveObject {
  facingDirection: Directions = 'DOWN';
  // Not readonly: Hero swaps the whole Vector2 reference when snapping to a collected item's position
  destinationPosition: Vector2;
  protected abstract readonly body: Sprite;
  protected isLocked = false;
  protected walkingSpeed = 1;

  protected readonly behaviorConfig: MovableObjectBehavior[];
  protected behaviorIndex = 0;
  private _retryTimeout: number | null = null;

  constructor(config: MovableObjectConfig) {
    super(config);
    const { behaviorConfig = [] } = config;
    this.behaviorConfig = behaviorConfig;
    this.destinationPosition = this.position.duplicate();
  }

  override ready(): void {
    // Lock movement + freeze animation while paused, a text box is open, or the level is transitioning
    [PAUSE_ON, TEXT_BOX_OPEN, SCREEN_TRANSITION_START].forEach((event) => {
      Events.on(event, this, () => {
        this._tryLockMovement();
      });
    });
    [PAUSE_OFF, TEXT_BOX_CLOSE, SCREEN_TRANSITION_END].forEach((event) => {
      Events.on(event, this, () => {
        this._tryUnlockMovement();
      });
    });
  }

  private _tryLockMovement(): void {
    this.isLocked = true;
    this.body.animations?.pause();
  }

  private _tryUnlockMovement(): void {
    this.isLocked = false;
    this.body.animations?.resume();
  }

  // Set and start the behavior loop once `root` is available
  protected override afterReady(root: Main): void {
    this._setBehaviorLoop(root);
  }

  protected startBehavior(_behavior: MovableObjectBehavior): void {
    // ...
  }

  private _setBehaviorLoop(root: Main): void {
    if (this.behaviorConfig.length === 0) {
      return;
    }

    // If we have a behavior, kick off after a short delay - track this timeout
    this.scheduleTimeout(() => {
      this._doBehaviorEvent(root);
    }, 10);

    Events.on<string>(BEHAVIOR_END, this, (id) => {
      if (id !== this.id) {
        return;
      }

      // Setting the next event to fire
      this.behaviorIndex += 1;

      if (this.behaviorIndex === this.behaviorConfig.length) {
        this.behaviorIndex = 0;
      }

      // Do it again!
      this._doBehaviorEvent(root);
    });
  }

  private _doBehaviorEvent(root: Main): void {
    const { isCutscenePlaying } = root;
    if (isCutscenePlaying || this.behaviorConfig.length === 0) {
      return;
    }

    if (isCutscenePlaying) {
      if (this._retryTimeout) {
        clearTimeout(this._retryTimeout);
      }

      this._retryTimeout = this.scheduleTimeout(() => {
        this._doBehaviorEvent(root);
      }, 1000);

      return;
    }

    this.startBehavior(this.behaviorConfig[this.behaviorIndex]);
  }

  protected changeFacingDirection(direction: Directions): void {
    this.facingDirection = direction;
    this.body.animations?.play(getStandingFrame(direction));
  }

  protected createShadowSprite(id: string): Sprite {
    return new Sprite({
      id,
      resource: Resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
  }
}
