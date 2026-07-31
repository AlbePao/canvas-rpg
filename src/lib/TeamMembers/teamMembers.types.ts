export interface TeamMember {
  id: string;
  order: number; // Determines the order of the team members in the battle
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  xp: number;
  maxXp: number;
  mana: number;
  equipment: {
    weapon: string;
    head: string;
    body: string;
    legs: string;
    feet: string;
  };
  // Add other stats as needed
}
