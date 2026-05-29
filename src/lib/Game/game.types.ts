export interface GameCanvasSize {
  canvasWidth: number;
  canvasHeight: number;
}

export type GameConfig = {
  containerId?: string;
} & Partial<GameCanvasSize>;

export type GameConfigKey = keyof GameConfig;
