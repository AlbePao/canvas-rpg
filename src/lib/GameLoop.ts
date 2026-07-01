type UpdateCallback = (deltaTime: number) => void;
type RenderCallback = () => void;

export class GameLoop {
  readonly update: UpdateCallback;
  readonly render: RenderCallback;
  private _lastFrameTime = 0;
  private _accumulatedTime = 0;
  private readonly _timeStep = 1000 / 60; // 60 frame per second
  private _rafId: number | null = null;
  private _isRunning = false;

  constructor(update: UpdateCallback, render: RenderCallback) {
    this.update = update;
    this.render = render;
  }

  mainLoop = (timestamp: number): void => {
    if (!this._isRunning) {
      return;
    }

    const deltaTime = timestamp - this._lastFrameTime;
    this._lastFrameTime = timestamp;

    // Accumulate all the time since the last frame
    this._accumulatedTime += deltaTime;

    // Fixed time step updates
    // If there's enough accumulated time to run one or more fixed updates
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
