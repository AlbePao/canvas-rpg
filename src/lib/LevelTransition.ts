import { END_LEVEL_TRANSITION, START_LEVEL_TRANSITION } from '../constants/events';
import { Events } from './Events';
import { Singleton } from './Singleton';

class LevelTransitionSingleton extends Singleton<LevelTransitionSingleton>() {
  element?: HTMLDivElement;

  init(callback: () => void): void {
    this.element = document.createElement('div');
    this.element.classList.add('LevelTransition');
    document.querySelector('#game-container')?.appendChild(this.element);
    Events.emit(START_LEVEL_TRANSITION);

    this.element.addEventListener(
      'animationend',
      () => {
        callback();
        this._stop();
      },
      { once: true },
    );
  }

  private _stop(): void {
    this.element?.classList.add('fade-out');
    this.element?.addEventListener(
      'animationend',
      () => {
        this.element?.remove();
        Events.emit(END_LEVEL_TRANSITION);
      },
      { once: true },
    );
  }
}

export const LevelTransition = LevelTransitionSingleton.getInstance();
