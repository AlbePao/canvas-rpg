import { GameObject } from '../../lib/GameObject';
import type { CombatantConfig, CombatantSide } from './combatant.types';

export class Combatant extends GameObject {
  hp: number;
  maxHp: number;
  xp: number;
  maxXp: number;
  readonly side: CombatantSide;

  // TODO: Combatant should carry current combat state and should be rendered on battle field
  constructor(config: CombatantConfig, side: CombatantSide) {
    const { id, hp, maxHp, xp, maxXp } = config;

    super({
      id,
    });

    this.maxHp = maxHp;
    this.hp = hp;
    this.xp = xp;
    this.maxXp = maxXp;

    // Side determines if the combatant is on the player's team or the opponent's team and renders the combatant on the correct side of the battle field and with the correct orientation
    this.side = side;
  }

  get hpPercent(): number {
    const percent = (this.hp / this.maxHp) * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent(): number {
    return (this.xp / this.maxXp) * 100;
  }
}
