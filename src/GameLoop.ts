type UpdateCallback = (deltaTime: number) => void;
type RenderCallback = () => void;

export class GameLoop {
  update: UpdateCallback;
  render: RenderCallback;
  lastFrameTime = 0;
  accumulatedTime = 0;
  timeStep = 1000 / 60; // 60 frame per second
  rafId: number | null = null;
  isRunning = false;

  constructor(update: UpdateCallback, render: RenderCallback) {
    this.update = update;
    this.render = render;
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) {
      return;
    }

    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all the time since the last frame
    this.accumulatedTime += deltaTime;

    // Fixed time step updates
    // If there's enough accumulated time to run one or more fixed updates
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep); // Here we pass the fixed time step
      this.accumulatedTime -= this.timeStep;
    }

    // Render
    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.isRunning = false;
  }
}
