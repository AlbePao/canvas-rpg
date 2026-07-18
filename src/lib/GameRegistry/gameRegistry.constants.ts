import type {
  AnimationRegistry,
  DecorationFramesMapRegistry,
  ItemsRegistry,
  NumberRegistry,
} from './gameRegistry.types';

/**
 * TODO: remove this file and put all of its data inside json files in json directory. The data will be loaded at startup time by zod and validated.
 */

export const ITEMS_REGISTRY: ItemsRegistry = {
  hammer1: {
    itemKey: 'hammer1',
    name: 'Hammer 1',
    type: 'equipable',
    frame: 0,
  },
  hammer2: {
    itemKey: 'hammer2',
    name: 'Hammer 2',
    type: 'equipable',
    frame: 1,
  },
  slingshot1: {
    itemKey: 'slingshot1',
    name: 'Slingshot 1',
    type: 'equipable',
    frame: 2,
  },
  slingshot2: {
    itemKey: 'slingshot2',
    name: 'Slingshot 2',
    type: 'equipable',
    frame: 3,
  },
  rod1: {
    itemKey: 'rod1',
    name: 'Rod 1',
    type: 'equipable',
    frame: 4,
  },
  rod2: {
    itemKey: 'rod2',
    name: 'Rod 2',
    type: 'equipable',
    frame: 5,
  },
  potion1: {
    itemKey: 'potion1',
    name: 'Potion 1',
    type: 'consumable',
    frame: 6,
  },
  potion2: {
    itemKey: 'potion2',
    name: 'Potion 2',
    type: 'consumable',
    frame: 7,
  },
  heart: {
    itemKey: 'heart',
    name: 'Heart',
    type: 'consumable',
    frame: 8,
  },
  sword: {
    itemKey: 'sword',
    name: 'Sword',
    type: 'equipable',
    frame: 9,
  },
};

export const DECORATIONS_FRAME_MAP: DecorationFramesMapRegistry = {
  tallGrass: { baseFrame: 6 },
  rock1BaseGrass: { baseFrame: 12 },
  rock1BaseSand: { baseFrame: 13 },
  rock1BaseSnow: { baseFrame: 14 },
  rock2BaseGrass: { baseFrame: 15 },
  rock2BaseSand: { baseFrame: 16 },
  rock2BaseSnow: { baseFrame: 17 },
  spruceGreen: { baseFrame: 988, size: { x: 2, y: 3 } },
  spruceSnow1: { baseFrame: 990, size: { x: 2, y: 3 } },
  spruceSnow2: { baseFrame: 992, size: { x: 2, y: 3 } },
  palmLg1: { baseFrame: 994, size: { x: 2, y: 3 } },
  palmLg2: { baseFrame: 1150, size: { x: 2, y: 3 } },
  palmSm: { baseFrame: 1048, size: { x: 1, y: 2 } },
  treeLgGreen: { baseFrame: 1145, size: { x: 2, y: 3 } },
  treeLgSnow: { baseFrame: 1148, size: { x: 2, y: 3 } },
  treeSmGreen: { baseFrame: 1144, size: { x: 1, y: 2 } },
  treeSmSnow: { baseFrame: 1147, size: { x: 1, y: 2 } },
  flowerSmRedBaseGrass: { baseFrame: 1205 },
  flowerSmRedBaseSand: { baseFrame: 1154 },
  flowerSmRedBaseSnow: { baseFrame: 1155 },
  flowerSmBlueBaseGrass: { baseFrame: 1156 },
  flowerSmBlueBaseSand: { baseFrame: 1157 },
  flowerSmBlueBaseSnow: { baseFrame: 1158 },
  flowerSmYellowBaseGrass: { baseFrame: 1159 },
  flowerSmYellowBaseSand: { baseFrame: 1160 },
  flowerSmYellowBaseSnow: { baseFrame: 1161 },
  flowerMdRedBaseGrass: { baseFrame: 1257 },
  flowerMdRedBaseSand: { baseFrame: 1258 },
  flowerMdRedBaseSnow: { baseFrame: 1259 },
  flowerMdBlueBaseGrass: { baseFrame: 1260 },
  flowerMdBlueBaseSand: { baseFrame: 1261 },
  flowerMdBlueBaseSnow: { baseFrame: 1262 },
  flowerMdYellowBaseGrass: { baseFrame: 1263 },
  flowerMdYellowBaseSand: { baseFrame: 1264 },
  flowerMdYellowBaseSnow: { baseFrame: 1265 },
  flowerLgRedBaseGrass: { baseFrame: 1153 },
  flowerLgRedBaseSand: { baseFrame: 1154 },
  flowerLgRedBaseSnow: { baseFrame: 1155 },
  flowerLgBlueBaseGrass: { baseFrame: 1156 },
  flowerLgBlueBaseSand: { baseFrame: 1157 },
  flowerLgBlueBaseSnow: { baseFrame: 1158 },
  flowerLgYellowBaseGrass: { baseFrame: 1159 },
  flowerLgYellowBaseSand: { baseFrame: 1160 },
  flowerLgYellowBaseSnow: { baseFrame: 1161 },
};

export const LEVEL_TILES_KEYS: NumberRegistry = {
  cliffGrassBorder: 114,
  cliffGrassBorderLeft: 113,
  cliffGrassBorderLower: 166,
  cliffGrassBorderLowerLeft: 165,
  cliffGrassBorderLowerRight: 167,
  cliffGrassBorderRight: 115,
  cliffGrassBorderUpper: 62,
  cliffGrassBorderUpperLeft: 61,
  cliffGrassBorderUpperRight: 63,
  cliffSandBorder: 120,
  cliffSandBorderLeft: 119,
  cliffSandBorderLower: 172,
  cliffSandBorderLowerLeft: 171,
  cliffSandBorderLowerRight: 173,
  cliffSandBorderRight: 121,
  cliffSandBorderUpper: 68,
  cliffSandBorderUpperLeft: 67,
  cliffSandBorderUpperRight: 69,
  cliffSnowBorder: 126,
  cliffSnowBorderLeft: 125,
  cliffSnowBorderLower: 178,
  cliffSnowBorderLowerLeft: 177,
  cliffSnowBorderLowerRight: 179,
  cliffSnowBorderRight: 127,
  cliffSnowBorderUpper: 74,
  cliffSnowBorderUpperLeft: 73,
  cliffSnowBorderUpperRight: 75,
  flowerLgBlueBgGrass: 998,
  flowerLgBlueBgSand: 1001,
  flowerLgBlueBgSnow: 1004,
  flowerLgRedBgGrass: 997,
  flowerLgRedBgSand: 1000,
  flowerLgRedBgSnow: 1003,
  flowerLgYellowBgGrass: 999,
  flowerLgYellowBgSand: 1002,
  flowerLgYellowBgSnow: 1005,
  flowerMdBlueBgGrass: 1102,
  flowerMdBlueBgSand: 1105,
  flowerMdBlueBgSnow: 1108,
  flowerMdRedBgGrass: 1101,
  flowerMdRedBgSand: 1104,
  flowerMdRedBgSnow: 1107,
  flowerMdYellowBgGrass: 1103,
  flowerMdYellowBgSand: 1106,
  flowerMdYellowBgSnow: 1109,
  flowerSmBlueBgGrass: 1050,
  flowerSmBlueBgSand: 1053,
  flowerSmBlueBgSnow: 1056,
  flowerSmRedBgGrass: 1049,
  flowerSmRedBgSand: 1052,
  flowerSmRedBgSnow: 1055,
  flowerSmYellowBgGrass: 1051,
  flowerSmYellowBgSand: 1054,
  flowerSmYellowBgSnow: 1057,
  grass: 0,
  grassCliffBorder: 111,
  grassCliffBorderLeft: 110,
  grassCliffBorderLower: 163,
  grassCliffBorderLowerLeft: 162,
  grassCliffBorderLowerRight: 164,
  grassCliffBorderRight: 112,
  grassCliffBorderUpper: 59,
  grassCliffBorderUpperLeft: 58,
  grassCliffBorderUpperRight: 60,
  grassLedgeBorder: 261,
  grassLedgeBorderLeft: 260,
  grassLedgeBorderLower: 313,
  grassLedgeBorderLowerLeft: 312,
  grassLedgeBorderLowerRight: 314,
  grassLedgeBorderRight: 262,
  grassLedgeBorderUpper: 209,
  grassLedgeBorderUpperLeft: 208,
  grassLedgeBorderUpperRight: 210,
  grassLedgeWaterAnimatedBorder: 420,
  grassLedgeWaterBorder: 420,
  grassLedgeWaterAnimatedBorderLeft: 419,
  grassLedgeWaterBorderLeft: 419,
  grassLedgeWaterAnimatedBorderLower: 472,
  grassLedgeWaterBorderLower: 472,
  grassLedgeWaterAnimatedBorderLowerLeft: 471,
  grassLedgeWaterBorderLowerLeft: 471,
  grassLedgeWaterAnimatedBorderLowerRight: 473,
  grassLedgeWaterBorderLowerRight: 473,
  grassLedgeWaterAnimatedBorderRight: 421,
  grassLedgeWaterBorderRight: 421,
  grassLedgeWaterAnimatedBorderUpper: 368,
  grassLedgeWaterBorderUpper: 368,
  grassLedgeWaterAnimatedBorderUpperLeft: 367,
  grassLedgeWaterBorderUpperLeft: 367,
  grassLedgeWaterAnimatedBorderUpperRight: 369,
  grassLedgeWaterBorderUpperRight: 369,
  grassSandBorder: 108,
  grassSandBorderLeft: 107,
  grassSandBorderLower: 160,
  grassSandBorderLowerLeft: 159,
  grassSandBorderLowerRight: 161,
  grassSandBorderRight: 109,
  grassSandBorderUpper: 56,
  grassSandBorderUpperLeft: 55,
  grassSandBorderUpperRight: 57,
  grassSnowBorder: 132,
  grassSnowBorderLeft: 131,
  grassSnowBorderLower: 184,
  grassSnowBorderLowerLeft: 183,
  grassSnowBorderLowerRight: 185,
  grassSnowBorderRight: 133,
  grassSnowBorderUpper: 80,
  grassSnowBorderUpperLeft: 79,
  grassSnowBorderUpperRight: 81,
  grassStairs2stepsLeft: 320,
  grassStairs2stepsLower: 318,
  grassStairs2stepsRight: 321,
  grassStairs3stepsLower: 319,
  ice: 11,
  iceSnowLedgeBorder: 1059,
  iceSnowLedgeBorderLeft: 1058,
  iceSnowLedgeBorderLower: 1111,
  iceSnowLedgeBorderLowerLeft: 1110,
  iceSnowLedgeBorderLowerRight: 1112,
  iceSnowLedgeBorderRight: 1060,
  iceSnowLedgeBorderUpper: 1007,
  iceSnowLedgeBorderUpperLeft: 1006,
  iceSnowLedgeBorderUpperRight: 1008,
  ledgeGrassBorder: 264,
  ledgeGrassBorderLeft: 263,
  ledgeGrassBorderLower: 316,
  ledgeGrassBorderLowerLeft: 315,
  ledgeGrassBorderLowerRight: 317,
  ledgeGrassBorderRight: 265,
  ledgeGrassBorderUpper: 212,
  ledgeGrassBorderUpperLeft: 211,
  ledgeGrassBorderUpperRight: 213,
  ledgeGrassLeft1: 217,
  ledgeGrassLeft2: 269,
  ledgeGrassLower1: 214,
  ledgeGrassLower2: 215,
  ledgeGrassRight1: 216,
  ledgeGrassRight2: 268,
  ledgeGrassUpper1: 266,
  ledgeGrassUpper2: 267,
  ledgeSandBorder: 274,
  ledgeSandBorderLeft: 273,
  ledgeSandBorderLower: 326,
  ledgeSandBorderLowerLeft: 325,
  ledgeSandBorderLowerRight: 327,
  ledgeSandBorderRight: 275,
  ledgeSandBorderUpper: 222,
  ledgeSandBorderUpperLeft: 221,
  ledgeSandBorderUpperRight: 223,
  ledgeSandLeft1: 227,
  ledgeSandLeft2: 279,
  ledgeSandLower1: 224,
  ledgeSandLower2: 225,
  ledgeSandRight1: 226,
  ledgeSandRight2: 278,
  ledgeSandUpper1: 276,
  ledgeSandUpper2: 277,
  ledgeSnowBorder: 284,
  ledgeSnowBorderLeft: 283,
  ledgeSnowBorderLower: 336,
  ledgeSnowBorderLowerLeft: 335,
  ledgeSnowBorderLowerRight: 337,
  ledgeSnowBorderRight: 285,
  ledgeSnowBorderUpper: 232,
  ledgeSnowBorderUpperLeft: 231,
  ledgeSnowBorderUpperRight: 233,
  ledgeSnowLeft1: 237,
  ledgeSnowLeft2: 289,
  ledgeSnowLower1: 234,
  ledgeSnowLower2: 235,
  ledgeSnowRight1: 236,
  ledgeSnowRight2: 288,
  ledgeSnowUpper1: 286,
  ledgeSnowUpper2: 287,
  sand: 1,
  sandCliffBorder: 117,
  sandCliffBorderLeft: 116,
  sandCliffBorderLower: 169,
  sandCliffBorderLowerLeft: 168,
  sandCliffBorderLowerRight: 170,
  sandCliffBorderRight: 118,
  sandCliffBorderUpper: 65,
  sandCliffBorderUpperLeft: 64,
  sandCliffBorderUpperRight: 66,
  sandGrassBorder: 105,
  sandGrassBorderLeft: 104,
  sandGrassBorderLower: 157,
  sandGrassBorderLowerLeft: 156,
  sandGrassBorderLowerRight: 158,
  sandGrassBorderRight: 106,
  sandGrassBorderUpper: 53,
  sandGrassBorderUpperLeft: 52,
  sandGrassBorderUpperRight: 54,
  sandLedgeBorder: 271,
  sandLedgeBorderLeft: 270,
  sandLedgeBorderLower: 323,
  sandLedgeBorderLowerLeft: 322,
  sandLedgeBorderLowerRight: 324,
  sandLedgeBorderRight: 272,
  sandLedgeBorderUpper: 219,
  sandLedgeBorderUpperLeft: 218,
  sandLedgeBorderUpperRight: 220,
  sandLedgeWaterAnimatedBorder: 432,
  sandLedgeWaterBorder: 432,
  sandLedgeWaterAnimatedBorderLeft: 431,
  sandLedgeWaterBorderLeft: 431,
  sandLedgeWaterAnimatedBorderLower: 484,
  sandLedgeWaterBorderLower: 484,
  sandLedgeWaterAnimatedBorderLowerLeft: 483,
  sandLedgeWaterBorderLowerLeft: 483,
  sandLedgeWaterAnimatedBorderLowerRight: 485,
  sandLedgeWaterBorderLowerRight: 485,
  sandLedgeWaterAnimatedBorderRight: 433,
  sandLedgeWaterBorderRight: 433,
  sandLedgeWaterAnimatedBorderUpper: 377,
  sandLedgeWaterBorderUpper: 377,
  sandLedgeWaterAnimatedBorderUpperLeft: 376,
  sandLedgeWaterBorderUpperLeft: 376,
  sandLedgeWaterAnimatedBorderUpperRight: 378,
  sandLedgeWaterBorderUpperRight: 378,
  sandShoreWaterAnimatedBorder: 423,
  sandShoreWaterBorder: 423,
  sandShoreWaterAnimatedBorderLeft: 422,
  sandShoreWaterBorderLeft: 422,
  sandShoreWaterAnimatedBorderLower: 475,
  sandShoreWaterBorderLower: 475,
  sandShoreWaterAnimatedBorderLowerLeft: 474,
  sandShoreWaterBorderLowerLeft: 474,
  sandShoreWaterAnimatedBorderLowerRight: 476,
  sandShoreWaterBorderLowerRight: 476,
  sandShoreWaterAnimatedBorderRight: 424,
  sandShoreWaterBorderRight: 424,
  sandShoreWaterAnimatedBorderUpper: 371,
  sandShoreWaterBorderUpper: 371,
  sandShoreWaterAnimatedBorderUpperLeft: 370,
  sandShoreWaterBorderUpperLeft: 370,
  sandShoreWaterAnimatedBorderUpperRight: 372,
  sandShoreWaterBorderUpperRight: 372,
  sandStairs2stepsLeft: 330,
  sandStairs2stepsLower: 328,
  sandStairs2stepsRight: 331,
  sandStairs3stepsLower: 329,
  snow: 2,
  snowCliffBorder: 123,
  snowCliffBorderLeft: 122,
  snowCliffBorderLower: 175,
  snowCliffBorderLowerLeft: 174,
  snowCliffBorderLowerRight: 176,
  snowCliffBorderRight: 124,
  snowCliffBorderUpper: 71,
  snowCliffBorderUpperLeft: 70,
  snowCliffBorderUpperRight: 72,
  snowGrassBorder: 129,
  snowGrassBorderLeft: 128,
  snowGrassBorderLower: 181,
  snowGrassBorderLowerLeft: 180,
  snowGrassBorderLowerRight: 182,
  snowGrassBorderRight: 130,
  snowGrassBorderUpper: 77,
  snowGrassBorderUpperLeft: 76,
  snowGrassBorderUpperRight: 78,
  snowLedgeBorder: 281,
  snowLedgeBorderLeft: 280,
  snowLedgeBorderLower: 333,
  snowLedgeBorderLowerLeft: 332,
  snowLedgeBorderLowerRight: 334,
  snowLedgeBorderRight: 282,
  snowLedgeBorderUpper: 229,
  snowLedgeBorderUpperLeft: 228,
  snowLedgeBorderUpperRight: 230,
  snowLedgeIceBorder: 1062,
  snowLedgeIceBorderLeft: 1061,
  snowLedgeIceBorderLower: 1114,
  snowLedgeIceBorderLowerLeft: 1113,
  snowLedgeIceBorderLowerRight: 1115,
  snowLedgeIceBorderRight: 1063,
  snowLedgeIceBorderUpper: 1010,
  snowLedgeIceBorderUpperLeft: 1009,
  snowLedgeIceBorderUpperRight: 1011,
  snowLedgeWaterAnimatedBorder: 438,
  snowLedgeWaterBorder: 438,
  snowLedgeWaterAnimatedBorderLeft: 437,
  snowLedgeWaterBorderLeft: 437,
  snowLedgeWaterAnimatedBorderLower: 490,
  snowLedgeWaterBorderLower: 490,
  snowLedgeWaterAnimatedBorderLowerLeft: 489,
  snowLedgeWaterBorderLowerLeft: 489,
  snowLedgeWaterAnimatedBorderLowerRight: 491,
  snowLedgeWaterBorderLowerRight: 491,
  snowLedgeWaterAnimatedBorderRight: 439,
  snowLedgeWaterBorderRight: 439,
  snowLedgeWaterAnimatedBorderUpper: 386,
  snowLedgeWaterBorderUpper: 386,
  snowLedgeWaterAnimatedBorderUpperLeft: 385,
  snowLedgeWaterBorderUpperLeft: 385,
  snowLedgeWaterAnimatedBorderUpperRight: 387,
  snowLedgeWaterBorderUpperRight: 387,
  snowStairs2stepsLeft: 340,
  snowStairs2stepsLower: 338,
  snowStairs2stepsRight: 341,
  snowStairs3stepsLower: 339,
  tallGrassBgGrass: 3,
  tallGrassBgSand: 4,
  tallGrassBgSnow: 5,
  waterAnimated: 7,
  water: 7,
  waterAnimatedGrassLedgeBorder: 417,
  waterGrassLedgeBorder: 417,
  waterAnimatedGrassLedgeBorderLeft: 416,
  waterGrassLedgeBorderLeft: 416,
  waterGrassLedgeBorderLower: 469,
  waterAnimatedGrassLedgeBorderLowerLeft: 468,
  waterAnimatedGrassLedgeBorderLower: 468,
  waterGrassLedgeBorderLowerLeft: 468,
  waterAnimatedGrassLedgeBorderRight: 470,
  waterAnimatedGrassLedgeBorderLowerRight: 470,
  waterGrassLedgeBorderLowerRight: 470,
  waterGrassLedgeBorderRight: 418,
  waterAnimatedGrassLedgeBorderUpper: 365,
  waterGrassLedgeBorderUpper: 365,
  waterAnimatedGrassLedgeBorderUpperLeft: 364,
  waterAnimatedGrassLedgeBorderUpperRight: 366,
  waterGrassLedgeBorderUpperLeft: 364,
  waterGrassLedgeBorderUpperRight: 366,
  waterAnimatedSandLedgeBorder: 429,
  waterSandLedgeBorder: 429,
  waterAnimatedSandLedgeBorderLeft: 428,
  waterSandLedgeBorderLeft: 428,
  waterAnimatedSandLedgeBorderLower: 481,
  waterSandLedgeBorderLower: 481,
  waterAnimatedSandLedgeBorderLowerLeft: 480,
  waterSandLedgeBorderLowerLeft: 480,
  waterAnimatedSandLedgeBorderLowerRight: 482,
  waterSandLedgeBorderLowerRight: 482,
  waterAnimatedSandLedgeBorderRight: 430,
  waterSandLedgeBorderRight: 430,
  waterAnimatedSandLedgeBorderUpper: 380,
  waterSandLedgeBorderUpper: 380,
  waterAnimatedSandLedgeBorderUpperLeft: 379,
  waterSandLedgeBorderUpperLeft: 379,
  waterAnimatedSandLedgeBorderUpperRight: 381,
  waterSandLedgeBorderUpperRight: 381,
  waterAnimatedSandShoreBorder: 426,
  waterSandShoreBorder: 426,
  waterAnimatedSandShoreBorderLeft: 425,
  waterSandShoreBorderLeft: 425,
  waterAnimatedSandShoreBorderLower: 478,
  waterSandShoreBorderLower: 478,
  waterAnimatedSandShoreBorderLowerLeft: 477,
  waterSandShoreBorderLowerLeft: 477,
  waterAnimatedSandShoreBorderLowerRight: 479,
  waterSandShoreBorderLowerRight: 479,
  waterAnimatedSandShoreBorderRight: 427,
  waterSandShoreBorderRight: 427,
  waterAnimatedSandShoreBorderUpper: 374,
  waterSandShoreBorderUpper: 374,
  waterAnimatedSandShoreBorderUpperLeft: 373,
  waterSandShoreBorderUpperLeft: 373,
  waterAnimatedSandShoreBorderUpperRight: 375,
  waterSandShoreBorderUpperRight: 375,
  waterAnimatedSnowLedgeBorder: 435,
  waterSnowLedgeBorder: 435,
  waterAnimatedSnowLedgeBorderLeft: 434,
  waterSnowLedgeBorderLeft: 434,
  waterAnimatedSnowLedgeBorderLower: 487,
  waterSnowLedgeBorderLower: 487,
  waterAnimatedSnowLedgeBorderLowerLeft: 486,
  waterSnowLedgeBorderLowerLeft: 486,
  waterAnimatedSnowLedgeBorderLowerRight: 488,
  waterSnowLedgeBorderLowerRight: 488,
  waterAnimatedSnowLedgeBorderRight: 436,
  waterSnowLedgeBorderRight: 436,
  waterAnimatedSnowLedgeBorderUpper: 383,
  waterSnowLedgeBorderUpper: 383,
  waterAnimatedSnowLedgeBorderUpperLeft: 382,
  waterSnowLedgeBorderUpperLeft: 382,
  waterAnimatedSnowLedgeBorderUpperRight: 384,
  waterSnowLedgeBorderUpperRight: 384,
};

export const ANIMATIONS: AnimationRegistry = {
  npc: {
    base: {
      standDown: { duration: 400, frames: [{ time: 0, frame: 0 }] },
      standLeft: { duration: 400, frames: [{ time: 0, frame: 4 }] },
      standRight: { duration: 400, frames: [{ time: 0, frame: 8 }] },
      standUp: { duration: 400, frames: [{ time: 0, frame: 12 }] },
      walkDown: {
        duration: 400,
        frames: [
          { time: 0, frame: 0 },
          { time: 100, frame: 1 },
          { time: 200, frame: 2 },
          { time: 300, frame: 3 },
        ],
      },
      walkLeft: {
        duration: 400,
        frames: [
          { time: 0, frame: 4 },
          { time: 100, frame: 5 },
          { time: 200, frame: 6 },
          { time: 300, frame: 7 },
        ],
      },
      walkRight: {
        duration: 400,
        frames: [
          { time: 0, frame: 8 },
          { time: 100, frame: 9 },
          { time: 200, frame: 10 },
          { time: 300, frame: 11 },
        ],
      },
      walkUp: {
        duration: 400,
        frames: [
          { time: 0, frame: 12 },
          { time: 100, frame: 13 },
          { time: 200, frame: 14 },
          { time: 300, frame: 15 },
        ],
      },
    },
  },
  hero: {
    base: {
      standDown: { duration: 400, frames: [{ time: 0, frame: 1 }] },
      standUp: { duration: 400, frames: [{ time: 0, frame: 7 }] },
      standLeft: { duration: 400, frames: [{ time: 0, frame: 10 }] },
      standRight: { duration: 400, frames: [{ time: 0, frame: 4 }] },
      collectDown: { duration: 400, frames: [{ time: 0, frame: 12 }] },
      walkDown: {
        duration: 400,
        frames: [
          { time: 0, frame: 1 },
          { time: 100, frame: 0 },
          { time: 200, frame: 1 },
          { time: 300, frame: 2 },
        ],
      },
      walkUp: {
        duration: 400,
        frames: [
          { time: 0, frame: 7 },
          { time: 100, frame: 6 },
          { time: 200, frame: 7 },
          { time: 300, frame: 8 },
        ],
      },
      walkLeft: {
        duration: 400,
        frames: [
          { time: 0, frame: 10 },
          { time: 100, frame: 9 },
          { time: 200, frame: 10 },
          { time: 300, frame: 11 },
        ],
      },
      walkRight: {
        duration: 400,
        frames: [
          { time: 0, frame: 4 },
          { time: 100, frame: 3 },
          { time: 200, frame: 4 },
          { time: 300, frame: 5 },
        ],
      },
    },
  },
  tiles: {
    waterAnimated: {
      water1: {
        duration: 2000,
        frames: [
          { time: 0, frame: 7 },
          { time: 500, frame: 8 },
          { time: 1000, frame: 9 },
          { time: 1500, frame: 10 },
        ],
      },
      water2: {
        duration: 2000,
        frames: [
          { time: 0, frame: 8 },
          { time: 500, frame: 9 },
          { time: 1000, frame: 10 },
          { time: 1500, frame: 11 },
        ],
      },
      water3: {
        duration: 2000,
        frames: [
          { time: 0, frame: 9 },
          { time: 500, frame: 10 },
          { time: 1000, frame: 11 },
          { time: 1500, frame: 12 },
        ],
      },
      water4: {
        duration: 2000,
        frames: [
          { time: 0, frame: 10 },
          { time: 500, frame: 11 },
          { time: 1000, frame: 12 },
          { time: 1500, frame: 13 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderUpperLeft: {
      water1GrassLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 364 },
          { time: 500, frame: 520 },
          { time: 1000, frame: 676 },
          { time: 1500, frame: 832 },
        ],
      },
      water2GrassLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 520 },
          { time: 500, frame: 676 },
          { time: 1000, frame: 832 },
          { time: 1500, frame: 988 },
        ],
      },
      water3GrassLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 676 },
          { time: 500, frame: 832 },
          { time: 1000, frame: 988 },
          { time: 1500, frame: 1144 },
        ],
      },
      water4GrassLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 832 },
          { time: 500, frame: 988 },
          { time: 1000, frame: 1144 },
          { time: 1500, frame: 1300 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderUpper: {
      water1GrassLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 365 },
          { time: 500, frame: 521 },
          { time: 1000, frame: 677 },
          { time: 1500, frame: 833 },
        ],
      },
      water2GrassLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 521 },
          { time: 500, frame: 677 },
          { time: 1000, frame: 833 },
          { time: 1500, frame: 989 },
        ],
      },
      water3GrassLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 677 },
          { time: 500, frame: 833 },
          { time: 1000, frame: 989 },
          { time: 1500, frame: 1145 },
        ],
      },
      water4GrassLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 833 },
          { time: 500, frame: 989 },
          { time: 1000, frame: 1145 },
          { time: 1500, frame: 1301 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderUpperRight: {
      water1GrassLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 366 },
          { time: 500, frame: 522 },
          { time: 1000, frame: 678 },
          { time: 1500, frame: 834 },
        ],
      },
      water2GrassLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 522 },
          { time: 500, frame: 678 },
          { time: 1000, frame: 834 },
          { time: 1500, frame: 990 },
        ],
      },
      water3GrassLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 678 },
          { time: 500, frame: 834 },
          { time: 1000, frame: 990 },
          { time: 1500, frame: 1146 },
        ],
      },
      water4GrassLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 834 },
          { time: 500, frame: 990 },
          { time: 1000, frame: 1146 },
          { time: 1500, frame: 1302 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderLeft: {
      water1GrassLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 416 },
          { time: 500, frame: 572 },
          { time: 1000, frame: 728 },
          { time: 1500, frame: 884 },
        ],
      },
      water2GrassLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 572 },
          { time: 500, frame: 728 },
          { time: 1000, frame: 884 },
          { time: 1500, frame: 1040 },
        ],
      },
      water3GrassLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 728 },
          { time: 500, frame: 884 },
          { time: 1000, frame: 1040 },
          { time: 1500, frame: 1196 },
        ],
      },
      water4GrassLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 884 },
          { time: 500, frame: 1040 },
          { time: 1000, frame: 1196 },
          { time: 1500, frame: 1352 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorder: {
      water1GrassLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 417 },
          { time: 500, frame: 573 },
          { time: 1000, frame: 729 },
          { time: 1500, frame: 885 },
        ],
      },
      water2GrassLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 573 },
          { time: 500, frame: 729 },
          { time: 1000, frame: 885 },
          { time: 1500, frame: 1041 },
        ],
      },
      water3GrassLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 729 },
          { time: 500, frame: 885 },
          { time: 1000, frame: 1041 },
          { time: 1500, frame: 1197 },
        ],
      },
      water4GrassLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 885 },
          { time: 500, frame: 1041 },
          { time: 1000, frame: 1197 },
          { time: 1500, frame: 1353 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderRight: {
      water1GrassLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 418 },
          { time: 500, frame: 574 },
          { time: 1000, frame: 730 },
          { time: 1500, frame: 886 },
        ],
      },
      water2GrassLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 574 },
          { time: 500, frame: 730 },
          { time: 1000, frame: 886 },
          { time: 1500, frame: 1042 },
        ],
      },
      water3GrassLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 730 },
          { time: 500, frame: 886 },
          { time: 1000, frame: 1042 },
          { time: 1500, frame: 1198 },
        ],
      },
      water4GrassLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 886 },
          { time: 500, frame: 1042 },
          { time: 1000, frame: 1198 },
          { time: 1500, frame: 1354 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderLowerLeft: {
      water1GrassLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 468 },
          { time: 500, frame: 624 },
          { time: 1000, frame: 780 },
          { time: 1500, frame: 936 },
        ],
      },
      water2GrassLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 624 },
          { time: 500, frame: 780 },
          { time: 1000, frame: 936 },
          { time: 1500, frame: 1092 },
        ],
      },
      water3GrassLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 780 },
          { time: 500, frame: 936 },
          { time: 1000, frame: 1092 },
          { time: 1500, frame: 1248 },
        ],
      },
      water4GrassLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 936 },
          { time: 500, frame: 1092 },
          { time: 1000, frame: 1248 },
          { time: 1500, frame: 1404 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderLower: {
      water1GrassLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 469 },
          { time: 500, frame: 625 },
          { time: 1000, frame: 781 },
          { time: 1500, frame: 937 },
        ],
      },
      water2GrassLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 625 },
          { time: 500, frame: 781 },
          { time: 1000, frame: 937 },
          { time: 1500, frame: 1093 },
        ],
      },
      water3GrassLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 781 },
          { time: 500, frame: 937 },
          { time: 1000, frame: 1093 },
          { time: 1500, frame: 1249 },
        ],
      },
      water4GrassLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 937 },
          { time: 500, frame: 1093 },
          { time: 1000, frame: 1249 },
          { time: 1500, frame: 1405 },
        ],
      },
    },
    waterAnimatedGrassLedgeBorderLowerRight: {
      water1GrassLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 470 },
          { time: 500, frame: 626 },
          { time: 1000, frame: 782 },
          { time: 1500, frame: 938 },
        ],
      },
      water2GrassLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 626 },
          { time: 500, frame: 782 },
          { time: 1000, frame: 938 },
          { time: 1500, frame: 1094 },
        ],
      },
      water3GrassLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 782 },
          { time: 500, frame: 938 },
          { time: 1000, frame: 1094 },
          { time: 1500, frame: 1250 },
        ],
      },
      water4GrassLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 938 },
          { time: 500, frame: 1094 },
          { time: 1000, frame: 1250 },
          { time: 1500, frame: 1406 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderUpperLeft: {
      grassLedgeWater1BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 367 },
          { time: 500, frame: 523 },
          { time: 1000, frame: 679 },
          { time: 1500, frame: 835 },
        ],
      },
      grassLedgeWater2BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 523 },
          { time: 500, frame: 679 },
          { time: 1000, frame: 835 },
          { time: 1500, frame: 991 },
        ],
      },
      grassLedgeWater3BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 679 },
          { time: 500, frame: 835 },
          { time: 1000, frame: 991 },
          { time: 1500, frame: 1147 },
        ],
      },
      grassLedgeWater4BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 835 },
          { time: 500, frame: 991 },
          { time: 1000, frame: 1147 },
          { time: 1500, frame: 1303 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderUpper: {
      grassLedgeWater1BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 368 },
          { time: 500, frame: 524 },
          { time: 1000, frame: 680 },
          { time: 1500, frame: 836 },
        ],
      },
      grassLedgeWater2BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 524 },
          { time: 500, frame: 680 },
          { time: 1000, frame: 836 },
          { time: 1500, frame: 992 },
        ],
      },
      grassLedgeWater3BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 680 },
          { time: 500, frame: 836 },
          { time: 1000, frame: 992 },
          { time: 1500, frame: 1148 },
        ],
      },
      grassLedgeWater4BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 836 },
          { time: 500, frame: 992 },
          { time: 1000, frame: 1148 },
          { time: 1500, frame: 1304 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderUpperRight: {
      grassLedgeWater1BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 369 },
          { time: 500, frame: 525 },
          { time: 1000, frame: 681 },
          { time: 1500, frame: 837 },
        ],
      },
      grassLedgeWater2BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 525 },
          { time: 500, frame: 681 },
          { time: 1000, frame: 837 },
          { time: 1500, frame: 993 },
        ],
      },
      grassLedgeWater3BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 681 },
          { time: 500, frame: 837 },
          { time: 1000, frame: 993 },
          { time: 1500, frame: 1149 },
        ],
      },
      grassLedgeWater4BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 837 },
          { time: 500, frame: 993 },
          { time: 1000, frame: 1149 },
          { time: 1500, frame: 1305 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderLeft: {
      grassLedgeWater1BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 419 },
          { time: 500, frame: 575 },
          { time: 1000, frame: 731 },
          { time: 1500, frame: 887 },
        ],
      },
      grassLedgeWater2BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 575 },
          { time: 500, frame: 731 },
          { time: 1000, frame: 887 },
          { time: 1500, frame: 1043 },
        ],
      },
      grassLedgeWater3BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 731 },
          { time: 500, frame: 887 },
          { time: 1000, frame: 1043 },
          { time: 1500, frame: 1199 },
        ],
      },
      grassLedgeWater4BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 887 },
          { time: 500, frame: 1043 },
          { time: 1000, frame: 1199 },
          { time: 1500, frame: 1355 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorder: {
      grassLedgeWater1Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 420 },
          { time: 500, frame: 576 },
          { time: 1000, frame: 732 },
          { time: 1500, frame: 888 },
        ],
      },
      grassLedgeWater2Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 576 },
          { time: 500, frame: 732 },
          { time: 1000, frame: 888 },
          { time: 1500, frame: 1044 },
        ],
      },
      grassLedgeWater3Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 732 },
          { time: 500, frame: 888 },
          { time: 1000, frame: 1044 },
          { time: 1500, frame: 1200 },
        ],
      },
      grassLedgeWater4Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 888 },
          { time: 500, frame: 1044 },
          { time: 1000, frame: 1200 },
          { time: 1500, frame: 1356 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderRight: {
      grassLedgeWater1BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 421 },
          { time: 500, frame: 577 },
          { time: 1000, frame: 733 },
          { time: 1500, frame: 889 },
        ],
      },
      grassLedgeWater2BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 577 },
          { time: 500, frame: 733 },
          { time: 1000, frame: 889 },
          { time: 1500, frame: 1045 },
        ],
      },
      grassLedgeWater3BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 733 },
          { time: 500, frame: 889 },
          { time: 1000, frame: 1045 },
          { time: 1500, frame: 1201 },
        ],
      },
      grassLedgeWater4BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 889 },
          { time: 500, frame: 1045 },
          { time: 1000, frame: 1201 },
          { time: 1500, frame: 1357 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderLowerLeft: {
      grassLedgeWater1BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 471 },
          { time: 500, frame: 627 },
          { time: 1000, frame: 783 },
          { time: 1500, frame: 939 },
        ],
      },
      grassLedgeWater2BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 627 },
          { time: 500, frame: 783 },
          { time: 1000, frame: 939 },
          { time: 1500, frame: 1095 },
        ],
      },
      grassLedgeWater3BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 783 },
          { time: 500, frame: 939 },
          { time: 1000, frame: 1095 },
          { time: 1500, frame: 1251 },
        ],
      },
      grassLedgeWater4BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 939 },
          { time: 500, frame: 1095 },
          { time: 1000, frame: 1251 },
          { time: 1500, frame: 1407 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderLower: {
      grassLedgeWater1BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 472 },
          { time: 500, frame: 628 },
          { time: 1000, frame: 784 },
          { time: 1500, frame: 940 },
        ],
      },
      grassLedgeWater2BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 628 },
          { time: 500, frame: 784 },
          { time: 1000, frame: 940 },
          { time: 1500, frame: 1096 },
        ],
      },
      grassLedgeWater3BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 784 },
          { time: 500, frame: 940 },
          { time: 1000, frame: 1096 },
          { time: 1500, frame: 1252 },
        ],
      },
      grassLedgeWater4BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 940 },
          { time: 500, frame: 1096 },
          { time: 1000, frame: 1252 },
          { time: 1500, frame: 1408 },
        ],
      },
    },
    grassLedgeWaterAnimatedBorderLowerRight: {
      grassLedgeWater1BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 473 },
          { time: 500, frame: 629 },
          { time: 1000, frame: 785 },
          { time: 1500, frame: 941 },
        ],
      },
      grassLedgeWater2BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 629 },
          { time: 500, frame: 785 },
          { time: 1000, frame: 941 },
          { time: 1500, frame: 1097 },
        ],
      },
      grassLedgeWater3BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 785 },
          { time: 500, frame: 941 },
          { time: 1000, frame: 1097 },
          { time: 1500, frame: 1253 },
        ],
      },
      grassLedgeWater4BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 941 },
          { time: 500, frame: 1097 },
          { time: 1000, frame: 1253 },
          { time: 1500, frame: 1409 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderUpperLeft: {
      water1SandLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 379 },
          { time: 500, frame: 535 },
          { time: 1000, frame: 691 },
          { time: 1500, frame: 847 },
        ],
      },
      water2SandLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 532 },
          { time: 500, frame: 688 },
          { time: 1000, frame: 844 },
          { time: 1500, frame: 1000 },
        ],
      },
      water3SandLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 688 },
          { time: 500, frame: 844 },
          { time: 1000, frame: 1000 },
          { time: 1500, frame: 1156 },
        ],
      },
      water4SandLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 844 },
          { time: 500, frame: 1000 },
          { time: 1000, frame: 1156 },
          { time: 1500, frame: 1312 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderUpper: {
      water1SandLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 380 },
          { time: 500, frame: 536 },
          { time: 1000, frame: 692 },
          { time: 1500, frame: 848 },
        ],
      },
      water2SandLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 533 },
          { time: 500, frame: 689 },
          { time: 1000, frame: 845 },
          { time: 1500, frame: 1001 },
        ],
      },
      water3SandLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 689 },
          { time: 500, frame: 845 },
          { time: 1000, frame: 1001 },
          { time: 1500, frame: 1157 },
        ],
      },
      water4SandLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 845 },
          { time: 500, frame: 1001 },
          { time: 1000, frame: 1157 },
          { time: 1500, frame: 1313 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderUpperRight: {
      water1SandLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 381 },
          { time: 500, frame: 537 },
          { time: 1000, frame: 693 },
          { time: 1500, frame: 849 },
        ],
      },
      water2SandLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 534 },
          { time: 500, frame: 690 },
          { time: 1000, frame: 846 },
          { time: 1500, frame: 1002 },
        ],
      },
      water3SandLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 690 },
          { time: 500, frame: 846 },
          { time: 1000, frame: 1002 },
          { time: 1500, frame: 1158 },
        ],
      },
      water4SandLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 846 },
          { time: 500, frame: 1002 },
          { time: 1000, frame: 1158 },
          { time: 1500, frame: 1314 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderLeft: {
      water1SandLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 428 },
          { time: 500, frame: 584 },
          { time: 1000, frame: 740 },
          { time: 1500, frame: 896 },
        ],
      },
      water2SandLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 584 },
          { time: 500, frame: 740 },
          { time: 1000, frame: 896 },
          { time: 1500, frame: 1052 },
        ],
      },
      water3SandLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 740 },
          { time: 500, frame: 896 },
          { time: 1000, frame: 1052 },
          { time: 1500, frame: 1208 },
        ],
      },
      water4SandLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 896 },
          { time: 500, frame: 1052 },
          { time: 1000, frame: 1208 },
          { time: 1500, frame: 1364 },
        ],
      },
    },
    waterAnimatedSandLedgeBorder: {
      water1SandLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 429 },
          { time: 500, frame: 585 },
          { time: 1000, frame: 741 },
          { time: 1500, frame: 897 },
        ],
      },
      water2SandLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 585 },
          { time: 500, frame: 741 },
          { time: 1000, frame: 897 },
          { time: 1500, frame: 1053 },
        ],
      },
      water3SandLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 741 },
          { time: 500, frame: 897 },
          { time: 1000, frame: 1053 },
          { time: 1500, frame: 1209 },
        ],
      },
      water4SandLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 897 },
          { time: 500, frame: 1053 },
          { time: 1000, frame: 1209 },
          { time: 1500, frame: 1365 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderRight: {
      water1SandLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 430 },
          { time: 500, frame: 586 },
          { time: 1000, frame: 742 },
          { time: 1500, frame: 898 },
        ],
      },
      water2SandLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 586 },
          { time: 500, frame: 742 },
          { time: 1000, frame: 898 },
          { time: 1500, frame: 1054 },
        ],
      },
      water3SandLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 742 },
          { time: 500, frame: 898 },
          { time: 1000, frame: 1054 },
          { time: 1500, frame: 1210 },
        ],
      },
      water4SandLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 898 },
          { time: 500, frame: 1054 },
          { time: 1000, frame: 1210 },
          { time: 1500, frame: 1366 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderLowerLeft: {
      water1SandLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 480 },
          { time: 500, frame: 636 },
          { time: 1000, frame: 792 },
          { time: 1500, frame: 948 },
        ],
      },
      water2SandLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 636 },
          { time: 500, frame: 792 },
          { time: 1000, frame: 948 },
          { time: 1500, frame: 1104 },
        ],
      },
      water3SandLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 792 },
          { time: 500, frame: 948 },
          { time: 1000, frame: 1104 },
          { time: 1500, frame: 1260 },
        ],
      },
      water4SandLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 948 },
          { time: 500, frame: 1104 },
          { time: 1000, frame: 1260 },
          { time: 1500, frame: 1416 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderLower: {
      water1SandLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 481 },
          { time: 500, frame: 637 },
          { time: 1000, frame: 793 },
          { time: 1500, frame: 949 },
        ],
      },
      water2SandLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 637 },
          { time: 500, frame: 793 },
          { time: 1000, frame: 949 },
          { time: 1500, frame: 1105 },
        ],
      },
      water3SandLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 793 },
          { time: 500, frame: 949 },
          { time: 1000, frame: 1105 },
          { time: 1500, frame: 1261 },
        ],
      },
      water4SandLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 949 },
          { time: 500, frame: 1105 },
          { time: 1000, frame: 1261 },
          { time: 1500, frame: 1417 },
        ],
      },
    },
    waterAnimatedSandLedgeBorderLowerRight: {
      water1SandLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 482 },
          { time: 500, frame: 638 },
          { time: 1000, frame: 794 },
          { time: 1500, frame: 950 },
        ],
      },
      water2SandLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 638 },
          { time: 500, frame: 794 },
          { time: 1000, frame: 950 },
          { time: 1500, frame: 1106 },
        ],
      },
      water3SandLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 794 },
          { time: 500, frame: 950 },
          { time: 1000, frame: 1106 },
          { time: 1500, frame: 1262 },
        ],
      },
      water4SandLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 950 },
          { time: 500, frame: 1106 },
          { time: 1000, frame: 1262 },
          { time: 1500, frame: 1418 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderUpperLeft: {
      sandLedgeWater1BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 376 },
          { time: 500, frame: 532 },
          { time: 1000, frame: 688 },
          { time: 1500, frame: 844 },
        ],
      },
      sandLedgeWater2BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 535 },
          { time: 500, frame: 691 },
          { time: 1000, frame: 847 },
          { time: 1500, frame: 1003 },
        ],
      },
      sandLedgeWater3BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 691 },
          { time: 500, frame: 847 },
          { time: 1000, frame: 1003 },
          { time: 1500, frame: 1159 },
        ],
      },
      sandLedgeWater4BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 847 },
          { time: 500, frame: 1003 },
          { time: 1000, frame: 1159 },
          { time: 1500, frame: 1315 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderUpper: {
      sandLedgeWater1BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 377 },
          { time: 500, frame: 533 },
          { time: 1000, frame: 689 },
          { time: 1500, frame: 845 },
        ],
      },
      sandLedgeWater2BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 536 },
          { time: 500, frame: 692 },
          { time: 1000, frame: 848 },
          { time: 1500, frame: 1004 },
        ],
      },
      sandLedgeWater3BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 692 },
          { time: 500, frame: 848 },
          { time: 1000, frame: 1004 },
          { time: 1500, frame: 1160 },
        ],
      },
      sandLedgeWater4BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 848 },
          { time: 500, frame: 1004 },
          { time: 1000, frame: 1160 },
          { time: 1500, frame: 1316 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderUpperRight: {
      sandLedgeWater1BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 378 },
          { time: 500, frame: 534 },
          { time: 1000, frame: 690 },
          { time: 1500, frame: 846 },
        ],
      },
      sandLedgeWater2BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 537 },
          { time: 500, frame: 693 },
          { time: 1000, frame: 849 },
          { time: 1500, frame: 1005 },
        ],
      },
      sandLedgeWater3BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 693 },
          { time: 500, frame: 849 },
          { time: 1000, frame: 1005 },
          { time: 1500, frame: 1161 },
        ],
      },
      sandLedgeWater4BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 849 },
          { time: 500, frame: 1005 },
          { time: 1000, frame: 1161 },
          { time: 1500, frame: 1317 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderLeft: {
      sandLedgeWater1BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 431 },
          { time: 500, frame: 587 },
          { time: 1000, frame: 743 },
          { time: 1500, frame: 899 },
        ],
      },
      sandLedgeWater2BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 587 },
          { time: 500, frame: 743 },
          { time: 1000, frame: 899 },
          { time: 1500, frame: 1055 },
        ],
      },
      sandLedgeWater3BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 743 },
          { time: 500, frame: 899 },
          { time: 1000, frame: 1055 },
          { time: 1500, frame: 1211 },
        ],
      },
      sandLedgeWater4BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 899 },
          { time: 500, frame: 1055 },
          { time: 1000, frame: 1211 },
          { time: 1500, frame: 1367 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorder: {
      sandLedgeWater1Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 432 },
          { time: 500, frame: 588 },
          { time: 1000, frame: 744 },
          { time: 1500, frame: 900 },
        ],
      },
      sandLedgeWater2Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 588 },
          { time: 500, frame: 744 },
          { time: 1000, frame: 900 },
          { time: 1500, frame: 1056 },
        ],
      },
      sandLedgeWater3Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 744 },
          { time: 500, frame: 900 },
          { time: 1000, frame: 1056 },
          { time: 1500, frame: 1212 },
        ],
      },
      sandLedgeWater4Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 900 },
          { time: 500, frame: 1056 },
          { time: 1000, frame: 1212 },
          { time: 1500, frame: 1368 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderRight: {
      sandLedgeWater1BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 433 },
          { time: 500, frame: 589 },
          { time: 1000, frame: 745 },
          { time: 1500, frame: 901 },
        ],
      },
      sandLedgeWater2BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 589 },
          { time: 500, frame: 745 },
          { time: 1000, frame: 901 },
          { time: 1500, frame: 1057 },
        ],
      },
      sandLedgeWater3BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 745 },
          { time: 500, frame: 901 },
          { time: 1000, frame: 1057 },
          { time: 1500, frame: 1213 },
        ],
      },
      sandLedgeWater4BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 901 },
          { time: 500, frame: 1057 },
          { time: 1000, frame: 1213 },
          { time: 1500, frame: 1369 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderLowerLeft: {
      sandLedgeWater1BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 483 },
          { time: 500, frame: 639 },
          { time: 1000, frame: 795 },
          { time: 1500, frame: 951 },
        ],
      },
      sandLedgeWater2BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 639 },
          { time: 500, frame: 795 },
          { time: 1000, frame: 951 },
          { time: 1500, frame: 1107 },
        ],
      },
      sandLedgeWater3BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 795 },
          { time: 500, frame: 951 },
          { time: 1000, frame: 1107 },
          { time: 1500, frame: 1263 },
        ],
      },
      sandLedgeWater4BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 951 },
          { time: 500, frame: 1107 },
          { time: 1000, frame: 1263 },
          { time: 1500, frame: 1419 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderLower: {
      sandLedgeWater1BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 484 },
          { time: 500, frame: 640 },
          { time: 1000, frame: 796 },
          { time: 1500, frame: 952 },
        ],
      },
      sandLedgeWater2BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 640 },
          { time: 500, frame: 796 },
          { time: 1000, frame: 952 },
          { time: 1500, frame: 1108 },
        ],
      },
      sandLedgeWater3BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 796 },
          { time: 500, frame: 952 },
          { time: 1000, frame: 1108 },
          { time: 1500, frame: 1264 },
        ],
      },
      sandLedgeWater4BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 952 },
          { time: 500, frame: 1108 },
          { time: 1000, frame: 1264 },
          { time: 1500, frame: 1420 },
        ],
      },
    },
    sandLedgeWaterAnimatedBorderLowerRight: {
      sandLedgeWater1BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 485 },
          { time: 500, frame: 641 },
          { time: 1000, frame: 797 },
          { time: 1500, frame: 953 },
        ],
      },
      sandLedgeWater2BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 641 },
          { time: 500, frame: 797 },
          { time: 1000, frame: 953 },
          { time: 1500, frame: 1109 },
        ],
      },
      sandLedgeWater3BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 797 },
          { time: 500, frame: 953 },
          { time: 1000, frame: 1109 },
          { time: 1500, frame: 1265 },
        ],
      },
      sandLedgeWater4BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 953 },
          { time: 500, frame: 1109 },
          { time: 1000, frame: 1265 },
          { time: 1500, frame: 1421 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderUpperLeft: {
      water1SnowLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 382 },
          { time: 500, frame: 538 },
          { time: 1000, frame: 694 },
          { time: 1500, frame: 850 },
        ],
      },
      water2SnowLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 538 },
          { time: 500, frame: 694 },
          { time: 1000, frame: 850 },
          { time: 1500, frame: 1006 },
        ],
      },
      water3SnowLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 694 },
          { time: 500, frame: 850 },
          { time: 1000, frame: 1006 },
          { time: 1500, frame: 1162 },
        ],
      },
      water4SnowLedgeBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 850 },
          { time: 500, frame: 1006 },
          { time: 1000, frame: 1162 },
          { time: 1500, frame: 1318 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderUpper: {
      water1SnowLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 383 },
          { time: 500, frame: 539 },
          { time: 1000, frame: 695 },
          { time: 1500, frame: 851 },
        ],
      },
      water2SnowLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 539 },
          { time: 500, frame: 695 },
          { time: 1000, frame: 851 },
          { time: 1500, frame: 1007 },
        ],
      },
      water3SnowLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 695 },
          { time: 500, frame: 851 },
          { time: 1000, frame: 1007 },
          { time: 1500, frame: 1163 },
        ],
      },
      water4SnowLedgeBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 851 },
          { time: 500, frame: 1007 },
          { time: 1000, frame: 1163 },
          { time: 1500, frame: 1319 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderUpperRight: {
      water1SnowLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 384 },
          { time: 500, frame: 540 },
          { time: 1000, frame: 696 },
          { time: 1500, frame: 852 },
        ],
      },
      water2SnowLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 540 },
          { time: 500, frame: 696 },
          { time: 1000, frame: 852 },
          { time: 1500, frame: 1008 },
        ],
      },
      water3SnowLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 696 },
          { time: 500, frame: 852 },
          { time: 1000, frame: 1008 },
          { time: 1500, frame: 1164 },
        ],
      },
      water4SnowLedgeBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 852 },
          { time: 500, frame: 1008 },
          { time: 1000, frame: 1164 },
          { time: 1500, frame: 1320 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderLeft: {
      water1SnowLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 434 },
          { time: 500, frame: 590 },
          { time: 1000, frame: 746 },
          { time: 1500, frame: 902 },
        ],
      },
      water2SnowLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 590 },
          { time: 500, frame: 746 },
          { time: 1000, frame: 902 },
          { time: 1500, frame: 1058 },
        ],
      },
      water3SnowLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 746 },
          { time: 500, frame: 902 },
          { time: 1000, frame: 1058 },
          { time: 1500, frame: 1214 },
        ],
      },
      water4SnowLedgeBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 902 },
          { time: 500, frame: 1058 },
          { time: 1000, frame: 1214 },
          { time: 1500, frame: 1370 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorder: {
      water1SnowLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 435 },
          { time: 500, frame: 591 },
          { time: 1000, frame: 747 },
          { time: 1500, frame: 903 },
        ],
      },
      water2SnowLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 591 },
          { time: 500, frame: 747 },
          { time: 1000, frame: 903 },
          { time: 1500, frame: 1059 },
        ],
      },
      water3SnowLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 747 },
          { time: 500, frame: 903 },
          { time: 1000, frame: 1059 },
          { time: 1500, frame: 1215 },
        ],
      },
      water4SnowLedgeBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 903 },
          { time: 500, frame: 1059 },
          { time: 1000, frame: 1215 },
          { time: 1500, frame: 1371 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderRight: {
      water1SnowLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 436 },
          { time: 500, frame: 592 },
          { time: 1000, frame: 748 },
          { time: 1500, frame: 904 },
        ],
      },
      water2SnowLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 592 },
          { time: 500, frame: 748 },
          { time: 1000, frame: 904 },
          { time: 1500, frame: 1060 },
        ],
      },
      water3SnowLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 748 },
          { time: 500, frame: 904 },
          { time: 1000, frame: 1060 },
          { time: 1500, frame: 1216 },
        ],
      },
      water4SnowLedgeBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 904 },
          { time: 500, frame: 1060 },
          { time: 1000, frame: 1216 },
          { time: 1500, frame: 1372 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderLowerLeft: {
      water1SnowLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 486 },
          { time: 500, frame: 642 },
          { time: 1000, frame: 798 },
          { time: 1500, frame: 954 },
        ],
      },
      water2SnowLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 642 },
          { time: 500, frame: 798 },
          { time: 1000, frame: 954 },
          { time: 1500, frame: 1110 },
        ],
      },
      water3SnowLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 798 },
          { time: 500, frame: 954 },
          { time: 1000, frame: 1110 },
          { time: 1500, frame: 1266 },
        ],
      },
      water4SnowLedgeBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 954 },
          { time: 500, frame: 1110 },
          { time: 1000, frame: 1266 },
          { time: 1500, frame: 1422 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderLower: {
      water1SnowLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 487 },
          { time: 500, frame: 643 },
          { time: 1000, frame: 799 },
          { time: 1500, frame: 955 },
        ],
      },
      water2SnowLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 643 },
          { time: 500, frame: 799 },
          { time: 1000, frame: 955 },
          { time: 1500, frame: 1111 },
        ],
      },
      water3SnowLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 799 },
          { time: 500, frame: 955 },
          { time: 1000, frame: 1111 },
          { time: 1500, frame: 1267 },
        ],
      },
      water4SnowLedgeBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 955 },
          { time: 500, frame: 1111 },
          { time: 1000, frame: 1267 },
          { time: 1500, frame: 1423 },
        ],
      },
    },
    waterAnimatedSnowLedgeBorderLowerRight: {
      water1SnowLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 488 },
          { time: 500, frame: 644 },
          { time: 1000, frame: 800 },
          { time: 1500, frame: 956 },
        ],
      },
      water2SnowLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 644 },
          { time: 500, frame: 800 },
          { time: 1000, frame: 956 },
          { time: 1500, frame: 1112 },
        ],
      },
      water3SnowLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 800 },
          { time: 500, frame: 956 },
          { time: 1000, frame: 1112 },
          { time: 1500, frame: 1268 },
        ],
      },
      water4SnowLedgeBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 956 },
          { time: 500, frame: 1112 },
          { time: 1000, frame: 1268 },
          { time: 1500, frame: 1424 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderUpperLeft: {
      snowLedgeWater1BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 385 },
          { time: 500, frame: 541 },
          { time: 1000, frame: 697 },
          { time: 1500, frame: 853 },
        ],
      },
      snowLedgeWater2BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 541 },
          { time: 500, frame: 697 },
          { time: 1000, frame: 853 },
          { time: 1500, frame: 1009 },
        ],
      },
      snowLedgeWater3BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 697 },
          { time: 500, frame: 853 },
          { time: 1000, frame: 1009 },
          { time: 1500, frame: 1165 },
        ],
      },
      snowLedgeWater4BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 853 },
          { time: 500, frame: 1009 },
          { time: 1000, frame: 1165 },
          { time: 1500, frame: 1321 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderUpper: {
      snowLedgeWater1BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 386 },
          { time: 500, frame: 542 },
          { time: 1000, frame: 698 },
          { time: 1500, frame: 854 },
        ],
      },
      snowLedgeWater2BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 542 },
          { time: 500, frame: 698 },
          { time: 1000, frame: 854 },
          { time: 1500, frame: 1010 },
        ],
      },
      snowLedgeWater3BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 698 },
          { time: 500, frame: 854 },
          { time: 1000, frame: 1010 },
          { time: 1500, frame: 1166 },
        ],
      },
      snowLedgeWater4BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 854 },
          { time: 500, frame: 1010 },
          { time: 1000, frame: 1166 },
          { time: 1500, frame: 1322 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderUpperRight: {
      snowLedgeWater1BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 387 },
          { time: 500, frame: 543 },
          { time: 1000, frame: 699 },
          { time: 1500, frame: 855 },
        ],
      },
      snowLedgeWater2BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 543 },
          { time: 500, frame: 699 },
          { time: 1000, frame: 855 },
          { time: 1500, frame: 1011 },
        ],
      },
      snowLedgeWater3BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 699 },
          { time: 500, frame: 855 },
          { time: 1000, frame: 1011 },
          { time: 1500, frame: 1167 },
        ],
      },
      snowLedgeWater4BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 855 },
          { time: 500, frame: 1011 },
          { time: 1000, frame: 1167 },
          { time: 1500, frame: 1323 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderLeft: {
      snowLedgeWater1BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 437 },
          { time: 500, frame: 593 },
          { time: 1000, frame: 749 },
          { time: 1500, frame: 905 },
        ],
      },
      snowLedgeWater2BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 593 },
          { time: 500, frame: 749 },
          { time: 1000, frame: 905 },
          { time: 1500, frame: 1061 },
        ],
      },
      snowLedgeWater3BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 749 },
          { time: 500, frame: 905 },
          { time: 1000, frame: 1061 },
          { time: 1500, frame: 1217 },
        ],
      },
      snowLedgeWater4BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 905 },
          { time: 500, frame: 1061 },
          { time: 1000, frame: 1217 },
          { time: 1500, frame: 1373 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorder: {
      snowLedgeWater1Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 438 },
          { time: 500, frame: 594 },
          { time: 1000, frame: 750 },
          { time: 1500, frame: 906 },
        ],
      },
      snowLedgeWater2Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 594 },
          { time: 500, frame: 750 },
          { time: 1000, frame: 906 },
          { time: 1500, frame: 1062 },
        ],
      },
      snowLedgeWater3Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 750 },
          { time: 500, frame: 906 },
          { time: 1000, frame: 1062 },
          { time: 1500, frame: 1218 },
        ],
      },
      snowLedgeWater4Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 906 },
          { time: 500, frame: 1062 },
          { time: 1000, frame: 1218 },
          { time: 1500, frame: 1374 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderRight: {
      snowLedgeWater1BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 439 },
          { time: 500, frame: 595 },
          { time: 1000, frame: 751 },
          { time: 1500, frame: 907 },
        ],
      },
      snowLedgeWater2BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 595 },
          { time: 500, frame: 751 },
          { time: 1000, frame: 907 },
          { time: 1500, frame: 1063 },
        ],
      },
      snowLedgeWater3BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 751 },
          { time: 500, frame: 907 },
          { time: 1000, frame: 1063 },
          { time: 1500, frame: 1219 },
        ],
      },
      snowLedgeWater4BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 907 },
          { time: 500, frame: 1063 },
          { time: 1000, frame: 1219 },
          { time: 1500, frame: 1375 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderLowerLeft: {
      snowLedgeWater1BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 489 },
          { time: 500, frame: 645 },
          { time: 1000, frame: 801 },
          { time: 1500, frame: 957 },
        ],
      },
      snowLedgeWater2BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 645 },
          { time: 500, frame: 801 },
          { time: 1000, frame: 957 },
          { time: 1500, frame: 1113 },
        ],
      },
      snowLedgeWater3BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 801 },
          { time: 500, frame: 957 },
          { time: 1000, frame: 1113 },
          { time: 1500, frame: 1269 },
        ],
      },
      snowLedgeWater4BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 957 },
          { time: 500, frame: 1113 },
          { time: 1000, frame: 1269 },
          { time: 1500, frame: 1425 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderLower: {
      snowLedgeWater1BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 490 },
          { time: 500, frame: 646 },
          { time: 1000, frame: 802 },
          { time: 1500, frame: 958 },
        ],
      },
      snowLedgeWater2BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 646 },
          { time: 500, frame: 802 },
          { time: 1000, frame: 958 },
          { time: 1500, frame: 1114 },
        ],
      },
      snowLedgeWater3BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 802 },
          { time: 500, frame: 958 },
          { time: 1000, frame: 1114 },
          { time: 1500, frame: 1270 },
        ],
      },
      snowLedgeWater4BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 958 },
          { time: 500, frame: 1114 },
          { time: 1000, frame: 1270 },
          { time: 1500, frame: 1426 },
        ],
      },
    },
    snowLedgeWaterAnimatedBorderLowerRight: {
      snowLedgeWater1BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 491 },
          { time: 500, frame: 647 },
          { time: 1000, frame: 803 },
          { time: 1500, frame: 959 },
        ],
      },
      snowLedgeWater2BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 647 },
          { time: 500, frame: 803 },
          { time: 1000, frame: 959 },
          { time: 1500, frame: 1115 },
        ],
      },
      snowLedgeWater3BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 803 },
          { time: 500, frame: 959 },
          { time: 1000, frame: 1115 },
          { time: 1500, frame: 1271 },
        ],
      },
      snowLedgeWater4BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 959 },
          { time: 500, frame: 1115 },
          { time: 1000, frame: 1271 },
          { time: 1500, frame: 1427 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderUpperLeft: {
      sandShoreWater1BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 370 },
          { time: 500, frame: 526 },
          { time: 1000, frame: 682 },
          { time: 1500, frame: 838 },
        ],
      },
      sandShoreWater2BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 526 },
          { time: 500, frame: 682 },
          { time: 1000, frame: 838 },
          { time: 1500, frame: 994 },
        ],
      },
      sandShoreWater3BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 682 },
          { time: 500, frame: 838 },
          { time: 1000, frame: 994 },
          { time: 1500, frame: 1150 },
        ],
      },
      sandShoreWater4BorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 838 },
          { time: 500, frame: 994 },
          { time: 1000, frame: 1150 },
          { time: 1500, frame: 1306 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderUpper: {
      sandShoreWater1BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 371 },
          { time: 500, frame: 527 },
          { time: 1000, frame: 683 },
          { time: 1500, frame: 839 },
        ],
      },
      sandShoreWater2BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 527 },
          { time: 500, frame: 683 },
          { time: 1000, frame: 839 },
          { time: 1500, frame: 995 },
        ],
      },
      sandShoreWater3BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 683 },
          { time: 500, frame: 839 },
          { time: 1000, frame: 995 },
          { time: 1500, frame: 1151 },
        ],
      },
      sandShoreWater4BorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 839 },
          { time: 500, frame: 995 },
          { time: 1000, frame: 1151 },
          { time: 1500, frame: 1307 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderUpperRight: {
      sandShoreWater1BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 372 },
          { time: 500, frame: 528 },
          { time: 1000, frame: 684 },
          { time: 1500, frame: 840 },
        ],
      },
      sandShoreWater2BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 528 },
          { time: 500, frame: 684 },
          { time: 1000, frame: 840 },
          { time: 1500, frame: 996 },
        ],
      },
      sandShoreWater3BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 684 },
          { time: 500, frame: 840 },
          { time: 1000, frame: 996 },
          { time: 1500, frame: 1152 },
        ],
      },
      sandShoreWater4BorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 840 },
          { time: 500, frame: 996 },
          { time: 1000, frame: 1152 },
          { time: 1500, frame: 1308 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderLeft: {
      sandShoreWater1BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 422 },
          { time: 500, frame: 578 },
          { time: 1000, frame: 734 },
          { time: 1500, frame: 890 },
        ],
      },
      sandShoreWater2BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 578 },
          { time: 500, frame: 734 },
          { time: 1000, frame: 890 },
          { time: 1500, frame: 1046 },
        ],
      },
      sandShoreWater3BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 734 },
          { time: 500, frame: 890 },
          { time: 1000, frame: 1046 },
          { time: 1500, frame: 1202 },
        ],
      },
      sandShoreWater4BorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 890 },
          { time: 500, frame: 1046 },
          { time: 1000, frame: 1202 },
          { time: 1500, frame: 1358 },
        ],
      },
    },
    sandShoreWaterAnimatedBorder: {
      sandShoreWater1Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 423 },
          { time: 500, frame: 579 },
          { time: 1000, frame: 735 },
          { time: 1500, frame: 891 },
        ],
      },
      sandShoreWater2Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 579 },
          { time: 500, frame: 735 },
          { time: 1000, frame: 891 },
          { time: 1500, frame: 1047 },
        ],
      },
      sandShoreWater3Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 735 },
          { time: 500, frame: 891 },
          { time: 1000, frame: 1047 },
          { time: 1500, frame: 1203 },
        ],
      },
      sandShoreWater4Border: {
        duration: 2000,
        frames: [
          { time: 0, frame: 891 },
          { time: 500, frame: 1047 },
          { time: 1000, frame: 1203 },
          { time: 1500, frame: 1359 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderRight: {
      sandShoreWater1BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 424 },
          { time: 500, frame: 580 },
          { time: 1000, frame: 736 },
          { time: 1500, frame: 892 },
        ],
      },
      sandShoreWater2BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 580 },
          { time: 500, frame: 736 },
          { time: 1000, frame: 892 },
          { time: 1500, frame: 1048 },
        ],
      },
      sandShoreWater3BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 736 },
          { time: 500, frame: 892 },
          { time: 1000, frame: 1048 },
          { time: 1500, frame: 1204 },
        ],
      },
      sandShoreWater4BorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 892 },
          { time: 500, frame: 1048 },
          { time: 1000, frame: 1204 },
          { time: 1500, frame: 1360 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderLowerLeft: {
      sandShoreWater1BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 474 },
          { time: 500, frame: 630 },
          { time: 1000, frame: 786 },
          { time: 1500, frame: 942 },
        ],
      },
      sandShoreWater2BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 630 },
          { time: 500, frame: 786 },
          { time: 1000, frame: 942 },
          { time: 1500, frame: 1098 },
        ],
      },
      sandShoreWater3BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 786 },
          { time: 500, frame: 942 },
          { time: 1000, frame: 1098 },
          { time: 1500, frame: 1254 },
        ],
      },
      sandShoreWater4BorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 942 },
          { time: 500, frame: 1098 },
          { time: 1000, frame: 1254 },
          { time: 1500, frame: 1410 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderLower: {
      sandShoreWater1BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 475 },
          { time: 500, frame: 631 },
          { time: 1000, frame: 787 },
          { time: 1500, frame: 943 },
        ],
      },
      sandShoreWater2BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 631 },
          { time: 500, frame: 787 },
          { time: 1000, frame: 943 },
          { time: 1500, frame: 1099 },
        ],
      },
      sandShoreWater3BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 787 },
          { time: 500, frame: 943 },
          { time: 1000, frame: 1099 },
          { time: 1500, frame: 1255 },
        ],
      },
      sandShoreWater4BorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 943 },
          { time: 500, frame: 1099 },
          { time: 1000, frame: 1255 },
          { time: 1500, frame: 1411 },
        ],
      },
    },
    sandShoreWaterAnimatedBorderLowerRight: {
      sandShoreWater1BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 476 },
          { time: 500, frame: 632 },
          { time: 1000, frame: 788 },
          { time: 1500, frame: 944 },
        ],
      },
      sandShoreWater2BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 632 },
          { time: 500, frame: 788 },
          { time: 1000, frame: 944 },
          { time: 1500, frame: 1100 },
        ],
      },
      sandShoreWater3BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 788 },
          { time: 500, frame: 944 },
          { time: 1000, frame: 1100 },
          { time: 1500, frame: 1256 },
        ],
      },
      sandShoreWater4BorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 944 },
          { time: 500, frame: 1100 },
          { time: 1000, frame: 1256 },
          { time: 1500, frame: 1412 },
        ],
      },
    },
    waterAnimatedSandShoreBorderUpperLeft: {
      water1SandShoreBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 373 },
          { time: 500, frame: 529 },
          { time: 1000, frame: 685 },
          { time: 1500, frame: 841 },
        ],
      },
      water2SandShoreBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 529 },
          { time: 500, frame: 685 },
          { time: 1000, frame: 841 },
          { time: 1500, frame: 997 },
        ],
      },
      water3SandShoreBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 685 },
          { time: 500, frame: 841 },
          { time: 1000, frame: 997 },
          { time: 1500, frame: 1153 },
        ],
      },
      water4SandShoreBorderUpperLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 841 },
          { time: 500, frame: 997 },
          { time: 1000, frame: 1153 },
          { time: 1500, frame: 1309 },
        ],
      },
    },
    waterAnimatedSandShoreBorderUpper: {
      water1SandShoreBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 374 },
          { time: 500, frame: 530 },
          { time: 1000, frame: 686 },
          { time: 1500, frame: 842 },
        ],
      },
      water2SandShoreBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 530 },
          { time: 500, frame: 686 },
          { time: 1000, frame: 842 },
          { time: 1500, frame: 998 },
        ],
      },
      water3SandShoreBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 686 },
          { time: 500, frame: 842 },
          { time: 1000, frame: 998 },
          { time: 1500, frame: 1154 },
        ],
      },
      water4SandShoreBorderUpper: {
        duration: 2000,
        frames: [
          { time: 0, frame: 842 },
          { time: 500, frame: 998 },
          { time: 1000, frame: 1154 },
          { time: 1500, frame: 1310 },
        ],
      },
    },
    waterAnimatedSandShoreBorderUpperRight: {
      water1SandShoreBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 375 },
          { time: 500, frame: 531 },
          { time: 1000, frame: 687 },
          { time: 1500, frame: 843 },
        ],
      },
      water2SandShoreBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 531 },
          { time: 500, frame: 687 },
          { time: 1000, frame: 843 },
          { time: 1500, frame: 999 },
        ],
      },
      water3SandShoreBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 687 },
          { time: 500, frame: 843 },
          { time: 1000, frame: 999 },
          { time: 1500, frame: 1155 },
        ],
      },
      water4SandShoreBorderUpperRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 843 },
          { time: 500, frame: 999 },
          { time: 1000, frame: 1155 },
          { time: 1500, frame: 1311 },
        ],
      },
    },
    waterAnimatedSandShoreBorderLeft: {
      water1SandShoreBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 425 },
          { time: 500, frame: 581 },
          { time: 1000, frame: 737 },
          { time: 1500, frame: 893 },
        ],
      },
      water2SandShoreBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 581 },
          { time: 500, frame: 737 },
          { time: 1000, frame: 893 },
          { time: 1500, frame: 1049 },
        ],
      },
      water3SandShoreBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 737 },
          { time: 500, frame: 893 },
          { time: 1000, frame: 1049 },
          { time: 1500, frame: 1205 },
        ],
      },
      water4SandShoreBorderLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 893 },
          { time: 500, frame: 1049 },
          { time: 1000, frame: 1205 },
          { time: 1500, frame: 1361 },
        ],
      },
    },
    waterAnimatedSandShoreBorder: {
      water1SandShoreBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 426 },
          { time: 500, frame: 582 },
          { time: 1000, frame: 738 },
          { time: 1500, frame: 894 },
        ],
      },
      water2SandShoreBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 582 },
          { time: 500, frame: 738 },
          { time: 1000, frame: 894 },
          { time: 1500, frame: 1050 },
        ],
      },
      water3SandShoreBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 738 },
          { time: 500, frame: 894 },
          { time: 1000, frame: 1050 },
          { time: 1500, frame: 1206 },
        ],
      },
      water4SandShoreBorder: {
        duration: 2000,
        frames: [
          { time: 0, frame: 894 },
          { time: 500, frame: 1050 },
          { time: 1000, frame: 1206 },
          { time: 1500, frame: 1362 },
        ],
      },
    },
    waterAnimatedSandShoreBorderRight: {
      water1SandShoreBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 427 },
          { time: 500, frame: 583 },
          { time: 1000, frame: 739 },
          { time: 1500, frame: 895 },
        ],
      },
      water2SandShoreBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 583 },
          { time: 500, frame: 739 },
          { time: 1000, frame: 895 },
          { time: 1500, frame: 1051 },
        ],
      },
      water3SandShoreBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 739 },
          { time: 500, frame: 895 },
          { time: 1000, frame: 1051 },
          { time: 1500, frame: 1207 },
        ],
      },
      water4SandShoreBorderRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 895 },
          { time: 500, frame: 1051 },
          { time: 1000, frame: 1207 },
          { time: 1500, frame: 1363 },
        ],
      },
    },
    waterAnimatedSandShoreBorderLowerLeft: {
      water1SandShoreBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 477 },
          { time: 500, frame: 633 },
          { time: 1000, frame: 789 },
          { time: 1500, frame: 945 },
        ],
      },
      water2SandShoreBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 633 },
          { time: 500, frame: 789 },
          { time: 1000, frame: 945 },
          { time: 1500, frame: 1101 },
        ],
      },
      water3SandShoreBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 789 },
          { time: 500, frame: 945 },
          { time: 1000, frame: 1101 },
          { time: 1500, frame: 1257 },
        ],
      },
      water4SandShoreBorderLowerLeft: {
        duration: 2000,
        frames: [
          { time: 0, frame: 945 },
          { time: 500, frame: 1101 },
          { time: 1000, frame: 1257 },
          { time: 1500, frame: 1413 },
        ],
      },
    },
    waterAnimatedSandShoreBorderLower: {
      water1SandShoreBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 478 },
          { time: 500, frame: 634 },
          { time: 1000, frame: 790 },
          { time: 1500, frame: 946 },
        ],
      },
      water2SandShoreBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 634 },
          { time: 500, frame: 790 },
          { time: 1000, frame: 946 },
          { time: 1500, frame: 1102 },
        ],
      },
      water3SandShoreBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 790 },
          { time: 500, frame: 946 },
          { time: 1000, frame: 1102 },
          { time: 1500, frame: 1258 },
        ],
      },
      water4SandShoreBorderLower: {
        duration: 2000,
        frames: [
          { time: 0, frame: 946 },
          { time: 500, frame: 1102 },
          { time: 1000, frame: 1258 },
          { time: 1500, frame: 1414 },
        ],
      },
    },
    waterAnimatedSandShoreBorderLowerRight: {
      water1SandShoreBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 479 },
          { time: 500, frame: 635 },
          { time: 1000, frame: 791 },
          { time: 1500, frame: 947 },
        ],
      },
      water2SandShoreBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 635 },
          { time: 500, frame: 791 },
          { time: 1000, frame: 947 },
          { time: 1500, frame: 1103 },
        ],
      },
      water3SandShoreBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 791 },
          { time: 500, frame: 947 },
          { time: 1000, frame: 1103 },
          { time: 1500, frame: 1259 },
        ],
      },
      water4SandShoreBorderLowerRight: {
        duration: 2000,
        frames: [
          { time: 0, frame: 947 },
          { time: 500, frame: 1103 },
          { time: 1000, frame: 1259 },
          { time: 1500, frame: 1415 },
        ],
      },
    },
  },
};
