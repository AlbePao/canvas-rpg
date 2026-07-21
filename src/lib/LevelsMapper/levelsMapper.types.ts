export interface LevelSchemas {
  decorationKeys: string[];
  itemKeys: string[];
  levelsIds: string[];
  tileKeys: string[];
}

export interface LevelLoadResult {
  id: string;
  success: boolean;
  error?: string;
}
