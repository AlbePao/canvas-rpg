import { END_LEVEL_TRANSITION, START_LEVEL_TRANSITION } from '../../constants/events';
import { Events } from '../Events';
import { Singleton } from '../Singleton';
import type { LevelTransitionConfig } from './levelTransition.types';
import { LEVEL_TRANSITION_BASE_CLASS, LEVEL_TRANSITION_CLASSNAME, LEVEL_TRANSITIONS } from './levelTransitions';

const TRANSITION_STYLES_ID = 'level-transition-styles';

class LevelTransitionSingleton extends Singleton<LevelTransitionSingleton>() {
  element?: HTMLDivElement;

  init(callback: () => void, config: LevelTransitionConfig = { transition: 'fade' }): void {
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.id = TRANSITION_STYLES_ID;
    styleSheet.textContent = `${LEVEL_TRANSITION_BASE_CLASS}${LEVEL_TRANSITIONS[config.transition]}`;
    document.head.appendChild(styleSheet);

    this.element = document.createElement('div');
    this.element.classList.add(LEVEL_TRANSITION_CLASSNAME, 'fade-in');

    // TODO: get container id from global config
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
        // Remove element and styles
        this.element?.remove();
        document.querySelector(`#${TRANSITION_STYLES_ID}`)?.remove();
        Events.emit(END_LEVEL_TRANSITION);
      },
      { once: true },
    );
  }
}

export const LevelTransition = LevelTransitionSingleton.getInstance();
