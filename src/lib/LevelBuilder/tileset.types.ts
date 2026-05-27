type TileBorder = `${'Upper' | 'Lower' | ''}${'Left' | 'Right' | ''}`;
type WaterTileIndex = 1 | 2 | 3 | 4;

export type LevelGroundTileset =
  // Grass
  | 'grass'

  // Sand
  | 'sand'

  // Snow
  | 'snow'

  // Bushes
  | `bushBg${'Grass' | 'Sand' | 'Snow'}`

  // Ice
  | 'ice'

  // Sand with grass border
  | `sandGrassBorder${TileBorder}`

  // Grass with sand border
  | `grassSandBorder${TileBorder}`

  // Grass with cliff border
  | `grassCliffBorder${TileBorder}`

  // Cliff with grass border
  | `cliffGrassBorder${TileBorder}`

  // Sand with cliff border
  | `sandCliffBorder${TileBorder}`

  // Cliff with sand border
  | `cliffSandBorder${TileBorder}`

  // Snow with cliff border
  | `snowCliffBorder${TileBorder}`

  // Cliff with snow border
  | `cliffSnowBorder${TileBorder}`

  // Snow with grass border
  | `snowGrassBorder${TileBorder}`

  // Grass with snow border
  | `grassSnowBorder${TileBorder}`

  // Grass with ledge border
  | `grassLedgeBorder${TileBorder}`

  // Ledge with grass border
  | `ledgeGrassBorder${TileBorder}`

  // Grass ledges
  | `ledgeGrass${'Lower1' | 'Lower2' | 'Upper1' | 'Upper2' | 'Right1' | 'Right2' | 'Left1' | 'Left2'}`

  // Grass Stairs
  | `grassStairs${'2stepsLower' | '3stepsLower' | '2stepsLeft' | '2stepsRight'}`

  // Sand with ledge border
  | `sandLedgeBorder${TileBorder}`

  // Ledge with sand border
  | `ledgeSandBorder${TileBorder}`

  // Sand ledges
  | `ledgeSand${'Lower1' | 'Lower2' | 'Upper1' | 'Upper2' | 'Right1' | 'Right2' | 'Left1' | 'Left2'}`

  // Sand Stairs
  | `sandStairs${'2stepsLower' | '3stepsLower' | '2stepsLeft' | '2stepsRight'}`

  // Snow with ledge border
  | `snowLedgeBorder${TileBorder}`

  // Ledge with snow border
  | `ledgeSnowBorder${TileBorder}`

  // Snow ledges
  | `ledgeSnow${'Lower1' | 'Lower2' | 'Upper1' | 'Upper2' | 'Right1' | 'Right2' | 'Left1' | 'Left2'}`

  // Snow Stairs
  | `snowStairs${'2stepsLower' | '3stepsLower' | '2stepsLeft' | '2stepsRight'}`

  // Ice with snow ledge border
  | `iceSnowLedgeBorder${TileBorder}`

  // Snow ledge with ice border
  | `snowLedgeIceBorder${TileBorder}`;

export type LevelWaterTileSet =
  // Water animations
  | `water${WaterTileIndex}`

  // Water animations with grass ledge border
  | `water${WaterTileIndex}GrassLedgeBorder${TileBorder}`

  // Grass ledge with water animations border
  | `grassLedgeWater${WaterTileIndex}Border${TileBorder}`

  // Water animations with sand ledge border
  | `water${WaterTileIndex}SandLedgeBorder${TileBorder}`

  // Sand ledge with water animations border
  | `sandLedgeWater${WaterTileIndex}Border${TileBorder}`

  // Water animations with snow ledge border
  | `water${WaterTileIndex}SnowLedgeBorder${TileBorder}`

  // Snow ledge with water animations border
  | `snowLedgeWater${WaterTileIndex}Border${TileBorder}`

  // Sand shore with water animations border
  | `sandShoreWater${WaterTileIndex}Border${TileBorder}`

  // Water animations with sand shore border
  | `water${WaterTileIndex}SandShoreBorder${TileBorder}`;

export type LevelDecorationTileset =
  // Trees
  // TODO: add trees
  // | 'tree';
  // Bushes
  | 'bushBgTransparent'
  // Rocks
  | `rock${1 | 2}Base${'Grass' | 'Sand' | 'Snow'}`;

export type LevelWaterAnimatedTileName =
  // Water
  | 'waterAnimated'

  // Water with grass ledge border
  | `waterAnimatedGrassLedgeBorder${TileBorder}`

  // Grass ledge with water border
  | `grassLedgeWaterAnimatedBorder${TileBorder}`

  // Water with sand ledge border
  | `waterAnimatedSandLedgeBorder${TileBorder}`

  // Sand ledge with water border
  | `sandLedgeWaterAnimatedBorder${TileBorder}`

  // Water with snow ledge border
  | `waterAnimatedSnowLedgeBorder${TileBorder}`

  // Snow ledge with water border
  | `snowLedgeWaterAnimatedBorder${TileBorder}`

  // Sand shore with water border
  | `sandShoreWaterAnimatedBorder${TileBorder}`

  // Water with sand shore border
  | `waterAnimatedSandShoreBorder${TileBorder}`;

export type LevelWaterStillTileName =
  // Water
  | 'water'

  // Water with grass ledge border
  | `waterGrassLedgeBorder${TileBorder}`

  // Grass ledge with water border
  | `grassLedgeWaterBorder${TileBorder}`

  // Water with sand ledge border
  | `waterSandLedgeBorder${TileBorder}`

  // Sand ledge with water border
  | `sandLedgeWaterBorder${TileBorder}`

  // Water with snow ledge border
  | `waterSnowLedgeBorder${TileBorder}`

  // Snow ledge with water border
  | `snowLedgeWaterBorder${TileBorder}`

  // Sand shore with water border
  | `sandShoreWaterBorder${TileBorder}`

  // Water with sand shore border
  | `waterSandShoreBorder${TileBorder}`;

export type LevelWaterTileName = LevelWaterAnimatedTileName | LevelWaterStillTileName;

export type LevelTileSet = LevelGroundTileset | LevelWaterTileSet | LevelDecorationTileset;
export type LevelTileName = LevelGroundTileset | LevelWaterTileName;

export type TilesetFrameMap = Record<LevelTileSet, number>;
