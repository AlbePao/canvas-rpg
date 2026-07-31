import type { GameObjectConfig } from '../../lib/GameObject';
import type { TeamMember } from '../../lib/TeamMembers';

export type CombatantConfig = GameObjectConfig & TeamMember;

export type CombatantSide = 'player' | 'opponent';
