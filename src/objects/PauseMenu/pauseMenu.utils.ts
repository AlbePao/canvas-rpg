import { Events } from '../../lib/Events';
import { ScreenTransition } from '../../lib/ScreenTransition';
import type { MenuScreen } from '../MenuScreen';

// Open menu screen with a fade transition, then emit an event to open the menu screen
export function openMenuScreen(event: string, menuScreen: MenuScreen): void {
  new ScreenTransition(
    () => {
      Events.emit<MenuScreen>(event, menuScreen);
    },
    { transition: 'fadeBlack' },
  );
}
