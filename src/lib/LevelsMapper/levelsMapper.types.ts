export interface LevelSchemaAssets {
  levelIds: NonEmptyTuple;
  itemKeys: NonEmptyTuple;
  npcKeys: NonEmptyTuple;
  decorationTileNames: NonEmptyTuple;
  levelTilesNames: NonEmptyTuple;
}

// Zod requires that z.enum receives a non-empty tuple: [string, ...string[]]
type NonEmptyTuple = [string, ...string[]];
