import type { AnimationConfig } from '../../lib/FrameIndexPattern';
import { FrameIndexPattern } from '../../lib/FrameIndexPattern';
import type { LevelWaterTileName, LevelWaterTileSet } from '../../lib/LevelBuilder/tileset.types';

const makeWaterFrame = (rootFrame: number): AnimationConfig => ({
  duration: 2000,
  frames: [
    {
      time: 0,
      frame: rootFrame,
    },
    {
      time: 500,
      frame: rootFrame + 1,
    },
    {
      time: 1000,
      frame: rootFrame + 2,
    },
    {
      time: 1500,
      frame: rootFrame + 3,
    },
  ],
});

export const WATER_ANIMATIONS: Record<LevelWaterTileName, Partial<Record<LevelWaterTileSet, FrameIndexPattern>>> = {
  // Water animations
  water: {
    water1: new FrameIndexPattern(makeWaterFrame(7)),
    water2: new FrameIndexPattern(makeWaterFrame(8)),
    water3: new FrameIndexPattern(makeWaterFrame(9)),
    water4: new FrameIndexPattern(makeWaterFrame(10)),
  },

  // Water animations with grass ledge border
  waterGrassLedgeBorderUpperLeft: {
    water1GrassLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderUpper: {
    water1GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderUpperRight: {
    water1GrassLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderLeft: {
    water1GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderRight: {
    water1GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderLowerLeft: {
    water1GrassLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderLower: {
    water1GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterGrassLedgeBorderLowerRight: {
    water1GrassLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2GrassLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3GrassLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4GrassLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Grass ledge with water animations border
  grassLedgeWaterBorderUpperLeft: {
    grassLedgeWater1BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderUpper: {
    grassLedgeWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderUpperRight: {
    grassLedgeWater1BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderLeft: {
    grassLedgeWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderRight: {
    grassLedgeWater1BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderLowerLeft: {
    grassLedgeWater1BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderLower: {
    grassLedgeWater1BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  grassLedgeWaterBorderLowerRight: {
    grassLedgeWater1BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater2BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater3BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    grassLedgeWater4BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Water animations with sand ledge border
  waterSandLedgeBorderUpperLeft: {
    water1SandLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderUpper: {
    water1SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderUpperRight: {
    water1SandLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderLeft: {
    water1SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderRight: {
    water1SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderLowerLeft: {
    water1SandLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderLower: {
    water1SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandLedgeBorderLowerRight: {
    water1SandLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Sand ledge with water animations border
  sandLedgeWaterBorderUpperLeft: {
    sandLedgeWater1BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderUpper: {
    sandLedgeWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderUpperRight: {
    sandLedgeWater1BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderLeft: {
    sandLedgeWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderRight: {
    sandLedgeWater1BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderLowerLeft: {
    sandLedgeWater1BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderLower: {
    sandLedgeWater1BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandLedgeWaterBorderLowerRight: {
    sandLedgeWater1BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater2BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater3BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandLedgeWater4BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Water animations with snow ledge border
  waterSnowLedgeBorderUpperLeft: {
    water1SnowLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderUpper: {
    water1SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderUpperRight: {
    water1SnowLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderLeft: {
    water1SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderRight: {
    water1SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderLowerLeft: {
    water1SnowLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderLower: {
    water1SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSnowLedgeBorderLowerRight: {
    water1SnowLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SnowLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SnowLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SnowLedgeBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Snow ledge with water animations border
  snowLedgeWaterBorderUpperLeft: {
    snowLedgeWater1BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderUpper: {
    snowLedgeWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderUpperRight: {
    snowLedgeWater1BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderLeft: {
    snowLedgeWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderRight: {
    snowLedgeWater1BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderLowerLeft: {
    snowLedgeWater1BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderLower: {
    snowLedgeWater1BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  snowLedgeWaterBorderLowerRight: {
    snowLedgeWater1BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater2BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater3BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    snowLedgeWater4BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Sand shore with water animations border
  sandShoreWaterBorderUpperLeft: {
    sandShoreWater1BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderUpper: {
    sandShoreWater1BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderUpperRight: {
    sandShoreWater1BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderLeft: {
    sandShoreWater1BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderRight: {
    sandShoreWater1BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderLowerLeft: {
    sandShoreWater1BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderLower: {
    sandShoreWater1BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  sandShoreWaterBorderLowerRight: {
    sandShoreWater1BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater2BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater3BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    sandShoreWater4BorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },

  // Water animations with sand shore border
  waterSandShoreBorderUpperLeft: {
    water1SandShoreBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderUpperLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderUpper: {
    water1SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderUpper: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderUpperRight: {
    water1SandShoreBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderUpperRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderLeft: {
    water1SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderRight: {
    water1SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderLowerLeft: {
    water1SandShoreBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderLowerLeft: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderLower: {
    water1SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderLower: new FrameIndexPattern(makeWaterFrame(0)),
  },
  waterSandShoreBorderLowerRight: {
    water1SandShoreBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water2SandShoreBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water3SandShoreBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
    water4SandShoreBorderLowerRight: new FrameIndexPattern(makeWaterFrame(0)),
  },
};
