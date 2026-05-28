type TileBorder = `${'Upper' | 'Lower' | ''}${'Left' | 'Right' | ''}`;
type WaterTileIndex = 1 | 2 | 3 | 4;
type TileBiome = 'Grass' | 'Sand' | 'Snow';
type StairsDirection = '2stepsLower' | '3stepsLower' | '2stepsLeft' | '2stepsRight';
type LedgeDirection = 'Lower1' | 'Lower2' | 'Upper1' | 'Upper2' | 'Right1' | 'Right2' | 'Left1' | 'Left2';

export type LevelGroundTileset =
  // Grass
  | 'grass'

  // Sand
  | 'sand'

  // Snow
  | 'snow'

  // Bushes
  | `bushBg${TileBiome}`

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
  | `ledgeGrass${LedgeDirection}`

  // Grass Stairs
  | `grassStairs${StairsDirection}`

  // Sand with ledge border
  | `sandLedgeBorder${TileBorder}`

  // Ledge with sand border
  | `ledgeSandBorder${TileBorder}`

  // Sand ledges
  | `ledgeSand${LedgeDirection}`

  // Sand Stairs
  | `sandStairs${StairsDirection}`

  // Snow with ledge border
  | `snowLedgeBorder${TileBorder}`

  // Ledge with snow border
  | `ledgeSnowBorder${TileBorder}`

  // Snow ledges
  | `ledgeSnow${LedgeDirection}`

  // Snow Stairs
  | `snowStairs${StairsDirection}`

  // Ice with snow ledge border
  | `iceSnowLedgeBorder${TileBorder}`

  // Snow ledge with ice border
  | `snowLedgeIceBorder${TileBorder}`

  // Flowers
  | `flower${'Sm' | 'Md' | 'Lg'}${'Red' | 'Blue' | 'Yellow'}Bg${TileBiome}`;

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
  // Bushes
  | 'bush'

  // Rocks
  | `rock${1 | 2}Base${TileBiome}`

  // Spruce trees
  | `spruce${'Snow1' | 'Snow2' | 'Green'}${'Upper' | 'Middle' | 'Lower'}${'Left' | 'Right'}`

  // Palm Trees
  | `palmLg${1 | 2}${'Upper' | 'Middle' | 'Lower'}${'Left' | 'Right'}`
  | `palmSm${'Upper' | 'Lower'}`

  // Trees
  | `treeLg${'Snow' | 'Green'}${'Upper' | 'Middle' | 'Lower'}${'Left' | 'Right'}`
  | `treeSm${'Snow' | 'Green'}${'Upper' | 'Lower'}`

  // Flowers
  | `flower${'Sm' | 'Md' | 'Lg'}${'Red' | 'Blue' | 'Yellow'}Base${TileBiome}`;

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
