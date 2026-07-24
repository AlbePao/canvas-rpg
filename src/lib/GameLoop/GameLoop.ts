import type { RenderCallback, UpdateCallback } from './gameLoop.types';

export class GameLoop {
  private _lastFrameTime = 0;
  private _accumulatedTime = 0;
  private readonly _timeStep = 1000 / 60; // 60 frame per second
  private _rafId: number | null = null;
  private _isRunning = false;

  constructor(
    readonly update: UpdateCallback,
    readonly render: RenderCallback,
  ) {}

  mainLoop = (timestamp: number): void => {
    if (!this._isRunning) {
      return;
    }

    const deltaTime = timestamp - this._lastFrameTime;
    this._lastFrameTime = timestamp;

    /**
     * Accumulate time since the last frame; capped to prevent a spiral of death
     * when the tab was backgrounded and returns with a large accumulated delta.
     */
    this._accumulatedTime = Math.min(this._accumulatedTime + deltaTime, this._timeStep * 5);

    // Fixed time step updates if there's enough accumulated time to run one or more fixed updates
    while (this._accumulatedTime >= this._timeStep) {
      this.update(this._timeStep); // Here we pass the fixed time step
      this._accumulatedTime -= this._timeStep;
    }

    // Render
    this.render();

    this._rafId = requestAnimationFrame(this.mainLoop);
  };

  start(): void {
    if (this._isRunning) {
      return;
    }

    this._isRunning = true;
    this._lastFrameTime = performance.now();
    this._rafId = requestAnimationFrame(this.mainLoop);
  }

  stop(): void {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    this._isRunning = false;
  }
}
