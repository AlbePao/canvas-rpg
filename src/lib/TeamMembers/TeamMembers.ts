import { Singleton } from '../Singleton';
import type { TeamMember } from './teamMembers.types';

class TeamMembersSingleton extends Singleton<TeamMembersSingleton>() {
  private readonly _membersMap = new Map<string, TeamMember>();

  add(memberKey: string): void {
    const existing = this._membersMap.get(memberKey);

    if (!existing) {
      // TODO: add a registry of team members
      this._membersMap.set(memberKey, {} as TeamMember);
    } else {
      console.warn(`Team member with key "${memberKey}" already exists.`);
    }
  }

  swapPosition(memberKey1: string, memberKey2: string): void {
    const member1 = this._membersMap.get(memberKey1);
    const member2 = this._membersMap.get(memberKey2);

    if (member1 && member2) {
      const tempOrder = member1.order;
      member1.order = member2.order;
      member2.order = tempOrder;
    } else {
      console.warn(`Cannot swap positions: one or both team members not found.`);
    }
  }

  getAll(): TeamMember[] {
    return [...this._membersMap.values()].sort((a, b) => a.order - b.order);
  }

  get(memberKey: string): TeamMember | null {
    return this._membersMap.get(memberKey) ?? null;
  }
}

export const TeamMembers = TeamMembersSingleton.getInstance();
