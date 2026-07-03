import type { AnimationConfig } from '../../lib/FrameIndexPattern';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import {
  type LevelWaterStillTileName,
  type LevelWaterTileName,
  type LevelWaterTileSet,
  TILESET_FRAME_MAP,
} from '../../lib/Tileset';

const makeWaterFrame = (rootFrame: number, base = 156): AnimationConfig => ({
  duration: 2000,
  frames: [
    {
      time: 0,
      frame: rootFrame,
    },
    {
      time: 500,
      frame: rootFrame + base,
    },
    {
      time: 1000,
      frame: rootFrame + base * 2,
    },
    {
      time: 1500,
      frame: rootFrame + base * 3,
    },
  ],
});

export const WATER_ANIMATIONS: Record<
  Exclude<LevelWaterTileName, LevelWaterStillTileName>,
  Partial<Record<LevelWaterTileSet, FrameIndexPattern>>
> = {
  // Water animations
  waterAnimated: {
    water1: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1, 1)),
    water2: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2, 1)),
    water3: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3, 1)),
    water4: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4, 1)),
  },

  // Water animations with grass ledge border
  waterAnimatedGrassLedgeBorderUpperLeft: {
    water1GrassLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderUpperLeft),
    ),
    water2GrassLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderUpperLeft),
    ),
    water3GrassLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderUpperLeft),
    ),
    water4GrassLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderUpperLeft),
    ),
  },
  waterAnimatedGrassLedgeBorderUpper: {
    water1GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderUpper)),
    water2GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderUpper)),
    water3GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderUpper)),
    water4GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderUpper)),
  },
  waterAnimatedGrassLedgeBorderUpperRight: {
    water1GrassLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderUpperRight),
    ),
    water2GrassLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderUpperRight),
    ),
    water3GrassLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderUpperRight),
    ),
    water4GrassLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderUpperRight),
    ),
  },
  waterAnimatedGrassLedgeBorderLeft: {
    water1GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderLeft)),
    water2GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderLeft)),
    water3GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderLeft)),
    water4GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderLeft)),
  },
  waterAnimatedGrassLedgeBorder: {
    water1GrassLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorder)),
    water2GrassLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorder)),
    water3GrassLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorder)),
    water4GrassLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorder)),
  },
  waterAnimatedGrassLedgeBorderRight: {
    water1GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderRight)),
    water2GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderRight)),
    water3GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderRight)),
    water4GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderRight)),
  },
  waterAnimatedGrassLedgeBorderLowerLeft: {
    water1GrassLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderLowerLeft),
    ),
    water2GrassLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderLowerLeft),
    ),
    water3GrassLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderLowerLeft),
    ),
    water4GrassLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderLowerLeft),
    ),
  },
  waterAnimatedGrassLedgeBorderLower: {
    water1GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderLower)),
    water2GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderLower)),
    water3GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderLower)),
    water4GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderLower)),
  },
  waterAnimatedGrassLedgeBorderLowerRight: {
    water1GrassLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1GrassLedgeBorderLowerRight),
    ),
    water2GrassLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2GrassLedgeBorderLowerRight),
    ),
    water3GrassLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3GrassLedgeBorderLowerRight),
    ),
    water4GrassLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4GrassLedgeBorderLowerRight),
    ),
  },

  // Grass ledge with water animations border
  grassLedgeWaterAnimatedBorderUpperLeft: {
    grassLedgeWater1BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderUpperLeft),
    ),
    grassLedgeWater2BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderUpperLeft),
    ),
    grassLedgeWater3BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderUpperLeft),
    ),
    grassLedgeWater4BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderUpperLeft),
    ),
  },
  grassLedgeWaterAnimatedBorderUpper: {
    grassLedgeWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderUpper)),
    grassLedgeWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderUpper)),
    grassLedgeWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderUpper)),
    grassLedgeWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderUpper)),
  },
  grassLedgeWaterAnimatedBorderUpperRight: {
    grassLedgeWater1BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderUpperRight),
    ),
    grassLedgeWater2BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderUpperRight),
    ),
    grassLedgeWater3BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderUpperRight),
    ),
    grassLedgeWater4BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderUpperRight),
    ),
  },
  grassLedgeWaterAnimatedBorderLeft: {
    grassLedgeWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderLeft)),
    grassLedgeWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderLeft)),
    grassLedgeWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderLeft)),
    grassLedgeWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderLeft)),
  },
  grassLedgeWaterAnimatedBorder: {
    grassLedgeWater1Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1Border)),
    grassLedgeWater2Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2Border)),
    grassLedgeWater3Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3Border)),
    grassLedgeWater4Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4Border)),
  },
  grassLedgeWaterAnimatedBorderRight: {
    grassLedgeWater1BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderRight)),
    grassLedgeWater2BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderRight)),
    grassLedgeWater3BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderRight)),
    grassLedgeWater4BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderRight)),
  },
  grassLedgeWaterAnimatedBorderLowerLeft: {
    grassLedgeWater1BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderLowerLeft),
    ),
    grassLedgeWater2BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderLowerLeft),
    ),
    grassLedgeWater3BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderLowerLeft),
    ),
    grassLedgeWater4BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderLowerLeft),
    ),
  },
  grassLedgeWaterAnimatedBorderLower: {
    grassLedgeWater1BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderLower)),
    grassLedgeWater2BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderLower)),
    grassLedgeWater3BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderLower)),
    grassLedgeWater4BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderLower)),
  },
  grassLedgeWaterAnimatedBorderLowerRight: {
    grassLedgeWater1BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater1BorderLowerRight),
    ),
    grassLedgeWater2BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater2BorderLowerRight),
    ),
    grassLedgeWater3BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater3BorderLowerRight),
    ),
    grassLedgeWater4BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.grassLedgeWater4BorderLowerRight),
    ),
  },

  // Water animations with sand ledge border
  waterAnimatedSandLedgeBorderUpperLeft: {
    water1SandLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderUpperLeft),
    ),
    water2SandLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderUpperLeft),
    ),
    water3SandLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderUpperLeft),
    ),
    water4SandLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderUpperLeft),
    ),
  },
  waterAnimatedSandLedgeBorderUpper: {
    water1SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderUpper)),
    water2SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderUpper)),
    water3SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderUpper)),
    water4SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderUpper)),
  },
  waterAnimatedSandLedgeBorderUpperRight: {
    water1SandLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderUpperRight),
    ),
    water2SandLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderUpperRight),
    ),
    water3SandLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderUpperRight),
    ),
    water4SandLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderUpperRight),
    ),
  },
  waterAnimatedSandLedgeBorderLeft: {
    water1SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderLeft)),
    water2SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderLeft)),
    water3SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderLeft)),
    water4SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderLeft)),
  },
  waterAnimatedSandLedgeBorder: {
    water1SandLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorder)),
    water2SandLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorder)),
    water3SandLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorder)),
    water4SandLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorder)),
  },
  waterAnimatedSandLedgeBorderRight: {
    water1SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderRight)),
    water2SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderRight)),
    water3SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderRight)),
    water4SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderRight)),
  },
  waterAnimatedSandLedgeBorderLowerLeft: {
    water1SandLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderLowerLeft),
    ),
    water2SandLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderLowerLeft),
    ),
    water3SandLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderLowerLeft),
    ),
    water4SandLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderLowerLeft),
    ),
  },
  waterAnimatedSandLedgeBorderLower: {
    water1SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderLower)),
    water2SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderLower)),
    water3SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderLower)),
    water4SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderLower)),
  },
  waterAnimatedSandLedgeBorderLowerRight: {
    water1SandLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandLedgeBorderLowerRight),
    ),
    water2SandLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandLedgeBorderLowerRight),
    ),
    water3SandLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandLedgeBorderLowerRight),
    ),
    water4SandLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandLedgeBorderLowerRight),
    ),
  },

  // Sand ledge with water animations border
  sandLedgeWaterAnimatedBorderUpperLeft: {
    sandLedgeWater1BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderUpperLeft),
    ),
    sandLedgeWater2BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderUpperLeft),
    ),
    sandLedgeWater3BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderUpperLeft),
    ),
    sandLedgeWater4BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderUpperLeft),
    ),
  },
  sandLedgeWaterAnimatedBorderUpper: {
    sandLedgeWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderUpper)),
    sandLedgeWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderUpper)),
    sandLedgeWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderUpper)),
    sandLedgeWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderUpper)),
  },
  sandLedgeWaterAnimatedBorderUpperRight: {
    sandLedgeWater1BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderUpperRight),
    ),
    sandLedgeWater2BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderUpperRight),
    ),
    sandLedgeWater3BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderUpperRight),
    ),
    sandLedgeWater4BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderUpperRight),
    ),
  },
  sandLedgeWaterAnimatedBorderLeft: {
    sandLedgeWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderLeft)),
    sandLedgeWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderLeft)),
    sandLedgeWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderLeft)),
    sandLedgeWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderLeft)),
  },
  sandLedgeWaterAnimatedBorder: {
    sandLedgeWater1Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1Border)),
    sandLedgeWater2Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2Border)),
    sandLedgeWater3Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3Border)),
    sandLedgeWater4Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4Border)),
  },
  sandLedgeWaterAnimatedBorderRight: {
    sandLedgeWater1BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderRight)),
    sandLedgeWater2BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderRight)),
    sandLedgeWater3BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderRight)),
    sandLedgeWater4BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderRight)),
  },
  sandLedgeWaterAnimatedBorderLowerLeft: {
    sandLedgeWater1BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderLowerLeft),
    ),
    sandLedgeWater2BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderLowerLeft),
    ),
    sandLedgeWater3BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderLowerLeft),
    ),
    sandLedgeWater4BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderLowerLeft),
    ),
  },
  sandLedgeWaterAnimatedBorderLower: {
    sandLedgeWater1BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderLower)),
    sandLedgeWater2BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderLower)),
    sandLedgeWater3BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderLower)),
    sandLedgeWater4BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderLower)),
  },
  sandLedgeWaterAnimatedBorderLowerRight: {
    sandLedgeWater1BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater1BorderLowerRight),
    ),
    sandLedgeWater2BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater2BorderLowerRight),
    ),
    sandLedgeWater3BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater3BorderLowerRight),
    ),
    sandLedgeWater4BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandLedgeWater4BorderLowerRight),
    ),
  },

  // Water animations with snow ledge border
  waterAnimatedSnowLedgeBorderUpperLeft: {
    water1SnowLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderUpperLeft),
    ),
    water2SnowLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderUpperLeft),
    ),
    water3SnowLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderUpperLeft),
    ),
    water4SnowLedgeBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderUpperLeft),
    ),
  },
  waterAnimatedSnowLedgeBorderUpper: {
    water1SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderUpper)),
    water2SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderUpper)),
    water3SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderUpper)),
    water4SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderUpper)),
  },
  waterAnimatedSnowLedgeBorderUpperRight: {
    water1SnowLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderUpperRight),
    ),
    water2SnowLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderUpperRight),
    ),
    water3SnowLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderUpperRight),
    ),
    water4SnowLedgeBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderUpperRight),
    ),
  },
  waterAnimatedSnowLedgeBorderLeft: {
    water1SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderLeft)),
    water2SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderLeft)),
    water3SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderLeft)),
    water4SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderLeft)),
  },
  waterAnimatedSnowLedgeBorder: {
    water1SnowLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorder)),
    water2SnowLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorder)),
    water3SnowLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorder)),
    water4SnowLedgeBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorder)),
  },
  waterAnimatedSnowLedgeBorderRight: {
    water1SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderRight)),
    water2SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderRight)),
    water3SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderRight)),
    water4SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderRight)),
  },
  waterAnimatedSnowLedgeBorderLowerLeft: {
    water1SnowLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderLowerLeft),
    ),
    water2SnowLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderLowerLeft),
    ),
    water3SnowLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderLowerLeft),
    ),
    water4SnowLedgeBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderLowerLeft),
    ),
  },
  waterAnimatedSnowLedgeBorderLower: {
    water1SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderLower)),
    water2SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderLower)),
    water3SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderLower)),
    water4SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderLower)),
  },
  waterAnimatedSnowLedgeBorderLowerRight: {
    water1SnowLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SnowLedgeBorderLowerRight),
    ),
    water2SnowLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SnowLedgeBorderLowerRight),
    ),
    water3SnowLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SnowLedgeBorderLowerRight),
    ),
    water4SnowLedgeBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SnowLedgeBorderLowerRight),
    ),
  },

  // Snow ledge with water animations border
  snowLedgeWaterAnimatedBorderUpperLeft: {
    snowLedgeWater1BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderUpperLeft),
    ),
    snowLedgeWater2BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderUpperLeft),
    ),
    snowLedgeWater3BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderUpperLeft),
    ),
    snowLedgeWater4BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderUpperLeft),
    ),
  },
  snowLedgeWaterAnimatedBorderUpper: {
    snowLedgeWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderUpper)),
    snowLedgeWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderUpper)),
    snowLedgeWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderUpper)),
    snowLedgeWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderUpper)),
  },
  snowLedgeWaterAnimatedBorderUpperRight: {
    snowLedgeWater1BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderUpperRight),
    ),
    snowLedgeWater2BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderUpperRight),
    ),
    snowLedgeWater3BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderUpperRight),
    ),
    snowLedgeWater4BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderUpperRight),
    ),
  },
  snowLedgeWaterAnimatedBorderLeft: {
    snowLedgeWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderLeft)),
    snowLedgeWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderLeft)),
    snowLedgeWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderLeft)),
    snowLedgeWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderLeft)),
  },
  snowLedgeWaterAnimatedBorder: {
    snowLedgeWater1Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1Border)),
    snowLedgeWater2Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2Border)),
    snowLedgeWater3Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3Border)),
    snowLedgeWater4Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4Border)),
  },
  snowLedgeWaterAnimatedBorderRight: {
    snowLedgeWater1BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderRight)),
    snowLedgeWater2BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderRight)),
    snowLedgeWater3BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderRight)),
    snowLedgeWater4BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderRight)),
  },
  snowLedgeWaterAnimatedBorderLowerLeft: {
    snowLedgeWater1BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderLowerLeft),
    ),
    snowLedgeWater2BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderLowerLeft),
    ),
    snowLedgeWater3BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderLowerLeft),
    ),
    snowLedgeWater4BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderLowerLeft),
    ),
  },
  snowLedgeWaterAnimatedBorderLower: {
    snowLedgeWater1BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderLower)),
    snowLedgeWater2BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderLower)),
    snowLedgeWater3BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderLower)),
    snowLedgeWater4BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderLower)),
  },
  snowLedgeWaterAnimatedBorderLowerRight: {
    snowLedgeWater1BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater1BorderLowerRight),
    ),
    snowLedgeWater2BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater2BorderLowerRight),
    ),
    snowLedgeWater3BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater3BorderLowerRight),
    ),
    snowLedgeWater4BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.snowLedgeWater4BorderLowerRight),
    ),
  },

  // Sand shore with water animations border
  sandShoreWaterAnimatedBorderUpperLeft: {
    sandShoreWater1BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderUpperLeft),
    ),
    sandShoreWater2BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderUpperLeft),
    ),
    sandShoreWater3BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderUpperLeft),
    ),
    sandShoreWater4BorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderUpperLeft),
    ),
  },
  sandShoreWaterAnimatedBorderUpper: {
    sandShoreWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderUpper)),
    sandShoreWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderUpper)),
    sandShoreWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderUpper)),
    sandShoreWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderUpper)),
  },
  sandShoreWaterAnimatedBorderUpperRight: {
    sandShoreWater1BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderUpperRight),
    ),
    sandShoreWater2BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderUpperRight),
    ),
    sandShoreWater3BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderUpperRight),
    ),
    sandShoreWater4BorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderUpperRight),
    ),
  },
  sandShoreWaterAnimatedBorderLeft: {
    sandShoreWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderLeft)),
    sandShoreWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderLeft)),
    sandShoreWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderLeft)),
    sandShoreWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderLeft)),
  },
  sandShoreWaterAnimatedBorder: {
    sandShoreWater1Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1Border)),
    sandShoreWater2Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2Border)),
    sandShoreWater3Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3Border)),
    sandShoreWater4Border: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4Border)),
  },
  sandShoreWaterAnimatedBorderRight: {
    sandShoreWater1BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderRight)),
    sandShoreWater2BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderRight)),
    sandShoreWater3BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderRight)),
    sandShoreWater4BorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderRight)),
  },
  sandShoreWaterAnimatedBorderLowerLeft: {
    sandShoreWater1BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderLowerLeft),
    ),
    sandShoreWater2BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderLowerLeft),
    ),
    sandShoreWater3BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderLowerLeft),
    ),
    sandShoreWater4BorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderLowerLeft),
    ),
  },
  sandShoreWaterAnimatedBorderLower: {
    sandShoreWater1BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderLower)),
    sandShoreWater2BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderLower)),
    sandShoreWater3BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderLower)),
    sandShoreWater4BorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderLower)),
  },
  sandShoreWaterAnimatedBorderLowerRight: {
    sandShoreWater1BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater1BorderLowerRight),
    ),
    sandShoreWater2BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater2BorderLowerRight),
    ),
    sandShoreWater3BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater3BorderLowerRight),
    ),
    sandShoreWater4BorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.sandShoreWater4BorderLowerRight),
    ),
  },

  // Water animations with sand shore border
  waterAnimatedSandShoreBorderUpperLeft: {
    water1SandShoreBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderUpperLeft),
    ),
    water2SandShoreBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderUpperLeft),
    ),
    water3SandShoreBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderUpperLeft),
    ),
    water4SandShoreBorderUpperLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderUpperLeft),
    ),
  },
  waterAnimatedSandShoreBorderUpper: {
    water1SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderUpper)),
    water2SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderUpper)),
    water3SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderUpper)),
    water4SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderUpper)),
  },
  waterAnimatedSandShoreBorderUpperRight: {
    water1SandShoreBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderUpperRight),
    ),
    water2SandShoreBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderUpperRight),
    ),
    water3SandShoreBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderUpperRight),
    ),
    water4SandShoreBorderUpperRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderUpperRight),
    ),
  },
  waterAnimatedSandShoreBorderLeft: {
    water1SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderLeft)),
    water2SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderLeft)),
    water3SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderLeft)),
    water4SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderLeft)),
  },
  waterAnimatedSandShoreBorder: {
    water1SandShoreBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorder)),
    water2SandShoreBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorder)),
    water3SandShoreBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorder)),
    water4SandShoreBorder: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorder)),
  },
  waterAnimatedSandShoreBorderRight: {
    water1SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderRight)),
    water2SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderRight)),
    water3SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderRight)),
    water4SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderRight)),
  },
  waterAnimatedSandShoreBorderLowerLeft: {
    water1SandShoreBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderLowerLeft),
    ),
    water2SandShoreBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderLowerLeft),
    ),
    water3SandShoreBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderLowerLeft),
    ),
    water4SandShoreBorderLowerLeft: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderLowerLeft),
    ),
  },
  waterAnimatedSandShoreBorderLower: {
    water1SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderLower)),
    water2SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderLower)),
    water3SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderLower)),
    water4SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderLower)),
  },
  waterAnimatedSandShoreBorderLowerRight: {
    water1SandShoreBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water1SandShoreBorderLowerRight),
    ),
    water2SandShoreBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water2SandShoreBorderLowerRight),
    ),
    water3SandShoreBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water3SandShoreBorderLowerRight),
    ),
    water4SandShoreBorderLowerRight: new FrameIndexPattern(
      makeWaterFrame(TILESET_FRAME_MAP.water4SandShoreBorderLowerRight),
    ),
  },
};
