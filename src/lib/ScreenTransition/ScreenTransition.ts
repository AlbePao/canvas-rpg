import { Events } from '../Events';
import { Game } from '../Game';
import {
  SCREEN_TRANSITIONS,
  SCREEN_TRANSITION_BASE_CLASS,
  SCREEN_TRANSITION_CLASSNAME,
  SCREEN_TRANSITION_END,
  SCREEN_TRANSITION_START,
  SCREEN_TRANSITION_STYLES_ID,
} from './screenTransition.constants';
import type { ScreenTransitionConfig } from './screenTransition.types';

export class ScreenTransition {
  private readonly _element: HTMLDivElement;

  constructor(callback: () => void, config: ScreenTransitionConfig = { transition: 'fadeWhite' }) {
    const { transition } = config;

    // Remove existing style if present (from previous incomplete transition)
    document.querySelector(`#${SCREEN_TRANSITION_STYLES_ID}`)?.remove();

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.id = SCREEN_TRANSITION_STYLES_ID;
    styleSheet.textContent = `${SCREEN_TRANSITION_BASE_CLASS}${SCREEN_TRANSITIONS[transition]}`;
    document.head.appendChild(styleSheet);

    this._element = document.createElement('div');
    this._element.classList.add(SCREEN_TRANSITION_CLASSNAME, 'fade-in');

    document.querySelector(Game.containerId)?.appendChild(this._element);
    Events.emit(SCREEN_TRANSITION_START);

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
        document.querySelector(`#${SCREEN_TRANSITION_STYLES_ID}`)?.remove();
        Events.emit(SCREEN_TRANSITION_END);
      },
      { once: true },
    );
  }
}
