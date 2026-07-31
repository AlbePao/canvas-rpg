import { Events } from '../../lib/Events';
import { checkDuplicateIds, Game } from '../../lib/Game';
import { GameObject } from '../../lib/GameObject';
import { GameRegistry } from '../../lib/GameRegistry';
import { userPressExitKeys } from '../../lib/Input';
import { ScreenTransition } from '../../lib/ScreenTransition';
import { StoryFlags } from '../../lib/StoryFlags';
import { TeamMembers } from '../../lib/TeamMembers';
import { Vector2 } from '../../lib/Vector2';
import { ArrowIndicator } from '../ArrowIndicator';
import { Combatant } from '../Combatant';
import type { InteractiveObject } from '../InteractiveObject';
import { SELECTION_BOX_CLOSE, SELECTION_BOX_OPEN, SelectionBox, type SelectionOption } from '../SelectionBox';
import { Sprite } from '../Sprite';
import { BATTLE_END } from './battle.constants';
import type { BattleActionsValue, BattleConfig, BattleRewardsData } from './battle.types';

export class Battle extends GameObject {
  protected readonly indicator = new ArrowIndicator({
    id: `${this.id}-team-arrow-indicator`,
    direction: 'right',
  });

  readonly background: Sprite;
  readonly addsFlag?: string;
  readonly rewardsData: BattleRewardsData;
  readonly opponentTeam: Combatant[] = [];
  readonly team: Combatant[] = [];

  // Track if combatants are moving to center of the field or starting point to prevent user input during that time
  private readonly _areCombatantsMoving = false;

  constructor(
    config: BattleConfig,
    readonly starter?: InteractiveObject,
  ) {
    super({
      id: 'battle',
    });

    const { background, team, addsFlag, rewardsData } = config;
    const { canvasWidth, canvasHeight } = Game.containerSizes;
    const { hFrames, vFrames, frameSize, position, resource } = GameRegistry.assets.get(background);

    this.drawLayer = 'hud';

    this.addsFlag = addsFlag;
    this.rewardsData = rewardsData;

    this.opponentTeam = team.map((memberConfig) => new Combatant(memberConfig, 'opponent'));
    this.team = TeamMembers.getAll().map((memberConfig) => new Combatant(memberConfig, 'player'));

    const hasDuplicatedIds = checkDuplicateIds([...this.opponentTeam, ...this.team]);

    if (hasDuplicatedIds) {
      throw new Error('Battle: two or more combatants have the same id');
    }

    this.background = new Sprite({
      id: 'battle-background',
      resource,
      frameSize: frameSize ?? new Vector2(canvasWidth, canvasHeight),
      hFrames,
      vFrames,
      position,
    });
  }

  override ready(): void {
    if (this.starter) {
      console.log('Battle started by:', this.starter.id);
    }

    Events.on(SELECTION_BOX_OPEN, this, () => {
      const endingSub = Events.on<SelectionOption<BattleActionsValue>>(SELECTION_BOX_CLOSE, this, ({ key }) => {
        if (key === 'attack') {
          // Select enemy member to attack, then start to reach the middle of the screen, attack the selected enemy, then return to starting position
          console.log('attack...');
        } else if (key === 'useItem') {
          // Open inventory screen to select an item to use, then apply the item's effect and return to battle. Decrement item count in inventory if its consumable. Weapons can't be equipped during battle, but can be used if they have a special effect (e.g. throwing knife)
          console.log('use item...');
        } else if (key === 'flee') {
          // Attempt to flee from battle. If successful, return to the previous screen. If not, the enemy gets a free attack and the player loses their turn
          new ScreenTransition(() => {
            Events.emit(BATTLE_END);
          });
        }

        Events.off(endingSub);
      });
    });

    // TODO: open when battle is initiated and at least one combatant is at starting position
    this._openSelectionBox();
  }

  override step(): void {
    if (userPressExitKeys()) {
      this._endBattle();
    }

    if (this._areCombatantsMoving) {
      return;
    }

    // TODO: open selection box when at least one player combatant is at starting position and set _areCombatantsMoving to false
  }

  override drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number): void {
    this.background.draw(ctx, drawPosX, drawPosY);

    if (!this._areCombatantsMoving) {
      this.indicator.drawImage(ctx, drawPosX, drawPosY);
    }
  }

  private _openSelectionBox(): void {
    // Logic to open the selection box for battle actions
    Events.emit<SelectionBox>(
      SELECTION_BOX_OPEN,
      new SelectionBox<BattleActionsValue>({
        id: `selection-box-for-${this.id}`,
        x: 0,
        y: 0,
        options: [
          { key: 'attack', text: 'Attack' },
          { key: 'useItem', text: 'Use Item' },
          { key: 'flee', text: 'Flee' },
        ],
      }),
    );
  }

  private _endBattle(): void {
    if (this.addsFlag) {
      // Add the story flag to indicate that the battle has been completed
      StoryFlags.add(this.addsFlag);
    }

    new ScreenTransition(() => {
      Events.emit(BATTLE_END);
    });
  }
}
