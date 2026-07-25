import { MenuScreen } from '../MenuScreen';

export class TeamScreen extends MenuScreen {
  constructor() {
    super({
      id: 'team',
      closeTransition: 'fadeBlack',
    });
  }
}
