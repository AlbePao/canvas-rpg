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

  // Tall grass
  | `tallGrassBg${TileBiome}`

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

type _LevelDecorationTileset =
  // Tall grass
  | 'tallGrass'

  // Rocks
  | `rock${1 | 2}Base${TileBiome}`

  // Columns
  | `column${1 | 2 | 3 | 4 | 5 | 6}Lower`
  | `column${'Middle' | 'Break'}${1 | 2}`
  | `columnCapital${'Base' | ''}${'Left' | 'Middle' | 'Right' | ''}`

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

export type LevelTileSet = LevelGroundTileset | LevelWaterTileSet | _LevelDecorationTileset;
type _LevelTileName = LevelGroundTileset | LevelWaterTileName;

export type TilesetFrames = Readonly<Record<LevelTileSet, number>>;

export const LEVEL_TILES_NAME: _LevelTileName[] = [
  'grass',
  'sand',
  'snow',
  'tallGrassBgGrass',
  'tallGrassBgSand',
  'tallGrassBgSnow',
  'ice',
  'sandGrassBorder',
  'sandGrassBorderUpper',
  'sandGrassBorderLower',
  'sandGrassBorderLeft',
  'sandGrassBorderRight',
  'sandGrassBorderUpperLeft',
  'sandGrassBorderUpperRight',
  'sandGrassBorderLowerLeft',
  'sandGrassBorderLowerRight',
  'grassSandBorder',
  'grassSandBorderUpper',
  'grassSandBorderLower',
  'grassSandBorderLeft',
  'grassSandBorderRight',
  'grassSandBorderUpperLeft',
  'grassSandBorderUpperRight',
  'grassSandBorderLowerLeft',
  'grassSandBorderLowerRight',
  'grassCliffBorder',
  'grassCliffBorderUpper',
  'grassCliffBorderLower',
  'grassCliffBorderLeft',
  'grassCliffBorderRight',
  'grassCliffBorderUpperLeft',
  'grassCliffBorderUpperRight',
  'grassCliffBorderLowerLeft',
  'grassCliffBorderLowerRight',
  'cliffGrassBorder',
  'cliffGrassBorderUpper',
  'cliffGrassBorderLower',
  'cliffGrassBorderLeft',
  'cliffGrassBorderRight',
  'cliffGrassBorderUpperLeft',
  'cliffGrassBorderUpperRight',
  'cliffGrassBorderLowerLeft',
  'cliffGrassBorderLowerRight',
  'sandCliffBorder',
  'sandCliffBorderUpper',
  'sandCliffBorderLower',
  'sandCliffBorderLeft',
  'sandCliffBorderRight',
  'sandCliffBorderUpperLeft',
  'sandCliffBorderUpperRight',
  'sandCliffBorderLowerLeft',
  'sandCliffBorderLowerRight',
  'cliffSandBorder',
  'cliffSandBorderUpper',
  'cliffSandBorderLower',
  'cliffSandBorderLeft',
  'cliffSandBorderRight',
  'cliffSandBorderUpperLeft',
  'cliffSandBorderUpperRight',
  'cliffSandBorderLowerLeft',
  'cliffSandBorderLowerRight',
  'snowCliffBorder',
  'snowCliffBorderUpper',
  'snowCliffBorderLower',
  'snowCliffBorderLeft',
  'snowCliffBorderRight',
  'snowCliffBorderUpperLeft',
  'snowCliffBorderUpperRight',
  'snowCliffBorderLowerLeft',
  'snowCliffBorderLowerRight',
  'cliffSnowBorder',
  'cliffSnowBorderUpper',
  'cliffSnowBorderLower',
  'cliffSnowBorderLeft',
  'cliffSnowBorderRight',
  'cliffSnowBorderUpperLeft',
  'cliffSnowBorderUpperRight',
  'cliffSnowBorderLowerLeft',
  'cliffSnowBorderLowerRight',
  'snowGrassBorder',
  'snowGrassBorderUpper',
  'snowGrassBorderLower',
  'snowGrassBorderLeft',
  'snowGrassBorderRight',
  'snowGrassBorderUpperLeft',
  'snowGrassBorderUpperRight',
  'snowGrassBorderLowerLeft',
  'snowGrassBorderLowerRight',
  'grassSnowBorder',
  'grassSnowBorderUpper',
  'grassSnowBorderLower',
  'grassSnowBorderLeft',
  'grassSnowBorderRight',
  'grassSnowBorderUpperLeft',
  'grassSnowBorderUpperRight',
  'grassSnowBorderLowerLeft',
  'grassSnowBorderLowerRight',
  'grassLedgeBorder',
  'grassLedgeBorderUpper',
  'grassLedgeBorderLower',
  'grassLedgeBorderLeft',
  'grassLedgeBorderRight',
  'grassLedgeBorderUpperLeft',
  'grassLedgeBorderUpperRight',
  'grassLedgeBorderLowerLeft',
  'grassLedgeBorderLowerRight',
  'ledgeGrassBorder',
  'ledgeGrassBorderUpper',
  'ledgeGrassBorderLower',
  'ledgeGrassBorderLeft',
  'ledgeGrassBorderRight',
  'ledgeGrassBorderUpperLeft',
  'ledgeGrassBorderUpperRight',
  'ledgeGrassBorderLowerLeft',
  'ledgeGrassBorderLowerRight',
  'ledgeGrassLower1',
  'ledgeGrassLower2',
  'ledgeGrassUpper1',
  'ledgeGrassUpper2',
  'ledgeGrassRight1',
  'ledgeGrassRight2',
  'ledgeGrassLeft1',
  'ledgeGrassLeft2',
  'grassStairs2stepsLower',
  'grassStairs3stepsLower',
  'grassStairs2stepsLeft',
  'grassStairs2stepsRight',
  'sandLedgeBorder',
  'sandLedgeBorderUpper',
  'sandLedgeBorderLower',
  'sandLedgeBorderLeft',
  'sandLedgeBorderRight',
  'sandLedgeBorderUpperLeft',
  'sandLedgeBorderUpperRight',
  'sandLedgeBorderLowerLeft',
  'sandLedgeBorderLowerRight',
  'ledgeSandBorder',
  'ledgeSandBorderUpper',
  'ledgeSandBorderLower',
  'ledgeSandBorderLeft',
  'ledgeSandBorderRight',
  'ledgeSandBorderUpperLeft',
  'ledgeSandBorderUpperRight',
  'ledgeSandBorderLowerLeft',
  'ledgeSandBorderLowerRight',
  'ledgeSandLower1',
  'ledgeSandLower2',
  'ledgeSandUpper1',
  'ledgeSandUpper2',
  'ledgeSandRight1',
  'ledgeSandRight2',
  'ledgeSandLeft1',
  'ledgeSandLeft2',
  'sandStairs2stepsLower',
  'sandStairs3stepsLower',
  'sandStairs2stepsLeft',
  'sandStairs2stepsRight',
  'snowLedgeBorder',
  'snowLedgeBorderUpper',
  'snowLedgeBorderLower',
  'snowLedgeBorderLeft',
  'snowLedgeBorderRight',
  'snowLedgeBorderUpperLeft',
  'snowLedgeBorderUpperRight',
  'snowLedgeBorderLowerLeft',
  'snowLedgeBorderLowerRight',
  'ledgeSnowBorder',
  'ledgeSnowBorderUpper',
  'ledgeSnowBorderLower',
  'ledgeSnowBorderLeft',
  'ledgeSnowBorderRight',
  'ledgeSnowBorderUpperLeft',
  'ledgeSnowBorderUpperRight',
  'ledgeSnowBorderLowerLeft',
  'ledgeSnowBorderLowerRight',
  'ledgeSnowLower1',
  'ledgeSnowLower2',
  'ledgeSnowUpper1',
  'ledgeSnowUpper2',
  'ledgeSnowRight1',
  'ledgeSnowRight2',
  'ledgeSnowLeft1',
  'ledgeSnowLeft2',
  'snowStairs2stepsLower',
  'snowStairs3stepsLower',
  'snowStairs2stepsLeft',
  'snowStairs2stepsRight',
  'iceSnowLedgeBorder',
  'iceSnowLedgeBorderUpper',
  'iceSnowLedgeBorderLower',
  'iceSnowLedgeBorderLeft',
  'iceSnowLedgeBorderRight',
  'iceSnowLedgeBorderUpperLeft',
  'iceSnowLedgeBorderUpperRight',
  'iceSnowLedgeBorderLowerLeft',
  'iceSnowLedgeBorderLowerRight',
  'snowLedgeIceBorder',
  'snowLedgeIceBorderUpper',
  'snowLedgeIceBorderLower',
  'snowLedgeIceBorderLeft',
  'snowLedgeIceBorderRight',
  'snowLedgeIceBorderUpperLeft',
  'snowLedgeIceBorderUpperRight',
  'snowLedgeIceBorderLowerLeft',
  'snowLedgeIceBorderLowerRight',
  'flowerSmRedBgGrass',
  'flowerSmRedBgSand',
  'flowerSmRedBgSnow',
  'flowerSmBlueBgGrass',
  'flowerSmBlueBgSand',
  'flowerSmBlueBgSnow',
  'flowerSmYellowBgGrass',
  'flowerSmYellowBgSand',
  'flowerSmYellowBgSnow',
  'flowerMdRedBgGrass',
  'flowerMdRedBgSand',
  'flowerMdRedBgSnow',
  'flowerMdBlueBgGrass',
  'flowerMdBlueBgSand',
  'flowerMdBlueBgSnow',
  'flowerMdYellowBgGrass',
  'flowerMdYellowBgSand',
  'flowerMdYellowBgSnow',
  'flowerLgRedBgGrass',
  'flowerLgRedBgSand',
  'flowerLgRedBgSnow',
  'flowerLgBlueBgGrass',
  'flowerLgBlueBgSand',
  'flowerLgBlueBgSnow',
  'flowerLgYellowBgGrass',
  'flowerLgYellowBgSand',
  'flowerLgYellowBgSnow',
  'waterAnimated',
  'waterAnimatedGrassLedgeBorder',
  'waterAnimatedGrassLedgeBorderUpper',
  'waterAnimatedGrassLedgeBorderLower',
  'waterAnimatedGrassLedgeBorderLeft',
  'waterAnimatedGrassLedgeBorderRight',
  'waterAnimatedGrassLedgeBorderUpperLeft',
  'waterAnimatedGrassLedgeBorderUpperRight',
  'waterAnimatedGrassLedgeBorderLowerLeft',
  'waterAnimatedGrassLedgeBorderLowerRight',
  'grassLedgeWaterAnimatedBorder',
  'grassLedgeWaterAnimatedBorderUpper',
  'grassLedgeWaterAnimatedBorderLower',
  'grassLedgeWaterAnimatedBorderLeft',
  'grassLedgeWaterAnimatedBorderRight',
  'grassLedgeWaterAnimatedBorderUpperLeft',
  'grassLedgeWaterAnimatedBorderUpperRight',
  'grassLedgeWaterAnimatedBorderLowerLeft',
  'grassLedgeWaterAnimatedBorderLowerRight',
  'waterAnimatedSandLedgeBorder',
  'waterAnimatedSandLedgeBorderUpper',
  'waterAnimatedSandLedgeBorderLower',
  'waterAnimatedSandLedgeBorderLeft',
  'waterAnimatedSandLedgeBorderRight',
  'waterAnimatedSandLedgeBorderUpperLeft',
  'waterAnimatedSandLedgeBorderUpperRight',
  'waterAnimatedSandLedgeBorderLowerLeft',
  'waterAnimatedSandLedgeBorderLowerRight',
  'sandLedgeWaterAnimatedBorder',
  'sandLedgeWaterAnimatedBorderUpper',
  'sandLedgeWaterAnimatedBorderLower',
  'sandLedgeWaterAnimatedBorderLeft',
  'sandLedgeWaterAnimatedBorderRight',
  'sandLedgeWaterAnimatedBorderUpperLeft',
  'sandLedgeWaterAnimatedBorderUpperRight',
  'sandLedgeWaterAnimatedBorderLowerLeft',
  'sandLedgeWaterAnimatedBorderLowerRight',
  'waterAnimatedSnowLedgeBorder',
  'waterAnimatedSnowLedgeBorderUpper',
  'waterAnimatedSnowLedgeBorderLower',
  'waterAnimatedSnowLedgeBorderLeft',
  'waterAnimatedSnowLedgeBorderRight',
  'waterAnimatedSnowLedgeBorderUpperLeft',
  'waterAnimatedSnowLedgeBorderUpperRight',
  'waterAnimatedSnowLedgeBorderLowerLeft',
  'waterAnimatedSnowLedgeBorderLowerRight',
  'snowLedgeWaterAnimatedBorder',
  'snowLedgeWaterAnimatedBorderUpper',
  'snowLedgeWaterAnimatedBorderLower',
  'snowLedgeWaterAnimatedBorderLeft',
  'snowLedgeWaterAnimatedBorderRight',
  'snowLedgeWaterAnimatedBorderUpperLeft',
  'snowLedgeWaterAnimatedBorderUpperRight',
  'snowLedgeWaterAnimatedBorderLowerLeft',
  'snowLedgeWaterAnimatedBorderLowerRight',
  'sandShoreWaterAnimatedBorder',
  'sandShoreWaterAnimatedBorderUpper',
  'sandShoreWaterAnimatedBorderLower',
  'sandShoreWaterAnimatedBorderLeft',
  'sandShoreWaterAnimatedBorderRight',
  'sandShoreWaterAnimatedBorderUpperLeft',
  'sandShoreWaterAnimatedBorderUpperRight',
  'sandShoreWaterAnimatedBorderLowerLeft',
  'sandShoreWaterAnimatedBorderLowerRight',
  'waterAnimatedSandShoreBorder',
  'waterAnimatedSandShoreBorderUpper',
  'waterAnimatedSandShoreBorderLower',
  'waterAnimatedSandShoreBorderLeft',
  'waterAnimatedSandShoreBorderRight',
  'waterAnimatedSandShoreBorderUpperLeft',
  'waterAnimatedSandShoreBorderUpperRight',
  'waterAnimatedSandShoreBorderLowerLeft',
  'waterAnimatedSandShoreBorderLowerRight',
  'water',
  'waterGrassLedgeBorder',
  'waterGrassLedgeBorderUpper',
  'waterGrassLedgeBorderLower',
  'waterGrassLedgeBorderLeft',
  'waterGrassLedgeBorderRight',
  'waterGrassLedgeBorderUpperLeft',
  'waterGrassLedgeBorderUpperRight',
  'waterGrassLedgeBorderLowerLeft',
  'waterGrassLedgeBorderLowerRight',
  'grassLedgeWaterBorder',
  'grassLedgeWaterBorderUpper',
  'grassLedgeWaterBorderLower',
  'grassLedgeWaterBorderLeft',
  'grassLedgeWaterBorderRight',
  'grassLedgeWaterBorderUpperLeft',
  'grassLedgeWaterBorderUpperRight',
  'grassLedgeWaterBorderLowerLeft',
  'grassLedgeWaterBorderLowerRight',
  'waterSandLedgeBorder',
  'waterSandLedgeBorderUpper',
  'waterSandLedgeBorderLower',
  'waterSandLedgeBorderLeft',
  'waterSandLedgeBorderRight',
  'waterSandLedgeBorderUpperLeft',
  'waterSandLedgeBorderUpperRight',
  'waterSandLedgeBorderLowerLeft',
  'waterSandLedgeBorderLowerRight',
  'sandLedgeWaterBorder',
  'sandLedgeWaterBorderUpper',
  'sandLedgeWaterBorderLower',
  'sandLedgeWaterBorderLeft',
  'sandLedgeWaterBorderRight',
  'sandLedgeWaterBorderUpperLeft',
  'sandLedgeWaterBorderUpperRight',
  'sandLedgeWaterBorderLowerLeft',
  'sandLedgeWaterBorderLowerRight',
  'waterSnowLedgeBorder',
  'waterSnowLedgeBorderUpper',
  'waterSnowLedgeBorderLower',
  'waterSnowLedgeBorderLeft',
  'waterSnowLedgeBorderRight',
  'waterSnowLedgeBorderUpperLeft',
  'waterSnowLedgeBorderUpperRight',
  'waterSnowLedgeBorderLowerLeft',
  'waterSnowLedgeBorderLowerRight',
  'snowLedgeWaterBorder',
  'snowLedgeWaterBorderUpper',
  'snowLedgeWaterBorderLower',
  'snowLedgeWaterBorderLeft',
  'snowLedgeWaterBorderRight',
  'snowLedgeWaterBorderUpperLeft',
  'snowLedgeWaterBorderUpperRight',
  'snowLedgeWaterBorderLowerLeft',
  'snowLedgeWaterBorderLowerRight',
  'sandShoreWaterBorder',
  'sandShoreWaterBorderUpper',
  'sandShoreWaterBorderLower',
  'sandShoreWaterBorderLeft',
  'sandShoreWaterBorderRight',
  'sandShoreWaterBorderUpperLeft',
  'sandShoreWaterBorderUpperRight',
  'sandShoreWaterBorderLowerLeft',
  'sandShoreWaterBorderLowerRight',
  'waterSandShoreBorder',
  'waterSandShoreBorderUpper',
  'waterSandShoreBorderLower',
  'waterSandShoreBorderLeft',
  'waterSandShoreBorderRight',
  'waterSandShoreBorderUpperLeft',
  'waterSandShoreBorderUpperRight',
  'waterSandShoreBorderLowerLeft',
  'waterSandShoreBorderLowerRight',
] as const;

export const LEVEL_DECORATION_TILESET: _LevelDecorationTileset[] = [
  'tallGrass',
  'rock1BaseGrass',
  'rock1BaseSand',
  'rock1BaseSnow',
  'rock2BaseGrass',
  'rock2BaseSand',
  'rock2BaseSnow',
  'spruceSnow1UpperLeft',
  'spruceSnow1UpperRight',
  'spruceSnow1LowerLeft',
  'spruceSnow1LowerRight',
  'spruceSnow1MiddleLeft',
  'spruceSnow1MiddleRight',
  'spruceSnow2UpperLeft',
  'spruceSnow2UpperRight',
  'spruceSnow2LowerLeft',
  'spruceSnow2LowerRight',
  'spruceSnow2MiddleLeft',
  'spruceSnow2MiddleRight',
  'spruceGreenUpperLeft',
  'spruceGreenUpperRight',
  'spruceGreenLowerLeft',
  'spruceGreenLowerRight',
  'spruceGreenMiddleLeft',
  'spruceGreenMiddleRight',
  'palmLg1UpperLeft',
  'palmLg1UpperRight',
  'palmLg1LowerLeft',
  'palmLg1LowerRight',
  'palmLg1MiddleLeft',
  'palmLg1MiddleRight',
  'palmLg2UpperLeft',
  'palmLg2UpperRight',
  'palmLg2LowerLeft',
  'palmLg2LowerRight',
  'palmLg2MiddleLeft',
  'palmLg2MiddleRight',
  'palmSmUpper',
  'palmSmLower',
  'treeLgSnowUpperLeft',
  'treeLgSnowUpperRight',
  'treeLgSnowLowerLeft',
  'treeLgSnowLowerRight',
  'treeLgSnowMiddleLeft',
  'treeLgSnowMiddleRight',
  'treeLgGreenUpperLeft',
  'treeLgGreenUpperRight',
  'treeLgGreenLowerLeft',
  'treeLgGreenLowerRight',
  'treeLgGreenMiddleLeft',
  'treeLgGreenMiddleRight',
  'treeSmSnowUpper',
  'treeSmSnowLower',
  'treeSmGreenUpper',
  'treeSmGreenLower',
  'flowerSmRedBaseGrass',
  'flowerSmRedBaseSand',
  'flowerSmRedBaseSnow',
  'flowerSmBlueBaseGrass',
  'flowerSmBlueBaseSand',
  'flowerSmBlueBaseSnow',
  'flowerSmYellowBaseGrass',
  'flowerSmYellowBaseSand',
  'flowerSmYellowBaseSnow',
  'flowerMdRedBaseGrass',
  'flowerMdRedBaseSand',
  'flowerMdRedBaseSnow',
  'flowerMdBlueBaseGrass',
  'flowerMdBlueBaseSand',
  'flowerMdBlueBaseSnow',
  'flowerMdYellowBaseGrass',
  'flowerMdYellowBaseSand',
  'flowerMdYellowBaseSnow',
  'flowerLgRedBaseGrass',
  'flowerLgRedBaseSand',
  'flowerLgRedBaseSnow',
  'flowerLgBlueBaseGrass',
  'flowerLgBlueBaseSand',
  'flowerLgBlueBaseSnow',
  'flowerLgYellowBaseGrass',
  'flowerLgYellowBaseSand',
  'flowerLgYellowBaseSnow',
] as const;

export type LevelTileName = (typeof LEVEL_TILES_NAME)[number];
export type LevelDecorationTileset = (typeof LEVEL_DECORATION_TILESET)[number];
