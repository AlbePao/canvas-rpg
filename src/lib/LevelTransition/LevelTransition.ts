import { LEVEL_TRANSITION_END, LEVEL_TRANSITION_START } from '../../constants/events';
import { Events } from '../Events';
import { Game } from '../Game';
import type { LevelTransitionConfig } from './levelTransition.types';
import { LEVEL_TRANSITION_BASE_CLASS, LEVEL_TRANSITION_CLASSNAME, LEVEL_TRANSITIONS } from './levelTransitions';

const TRANSITION_STYLES_ID = 'level-transition-styles';

export class LevelTransition {
  private readonly _element: HTMLDivElement;

  constructor(callback: () => void, config: LevelTransitionConfig = { transition: 'fade' }) {
    const { transition } = config;

    // Remove existing style if present (from previous incomplete transition)
    document.querySelector(`#${TRANSITION_STYLES_ID}`)?.remove();

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.id = TRANSITION_STYLES_ID;
    styleSheet.textContent = `${LEVEL_TRANSITION_BASE_CLASS}${LEVEL_TRANSITIONS[transition]}`;
    document.head.appendChild(styleSheet);

    this._element = document.createElement('div');
    this._element.classList.add(LEVEL_TRANSITION_CLASSNAME, 'fade-in');

    document.querySelector(Game.getContainerId())?.appendChild(this._element);
    Events.emit(LEVEL_TRANSITION_START);

    this._element.addEventListener(
      'animationend',
      () => {
        callback();
        this._stop();
      },
      { once: true },
    );
  }

  private _stop(): void {
    this._element?.classList.add('fade-out');
    this._element?.addEventListener(
      'animationend',
      () => {
        // Remove element and styles
        this._element?.remove();
        document.querySelector(`#${TRANSITION_STYLES_ID}`)?.remove();
        Events.emit(LEVEL_TRANSITION_END);
      },
      { once: true },
    );
  }
}
