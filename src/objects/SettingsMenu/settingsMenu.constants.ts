import type { SettingItem } from './settingsMenu.types';

export const SETTINGS_MENU_ITEMS: SettingItem[] = [
  {
    key: 'battleAnimations',
    text: 'Battle animations',
    selectedIndex: 0,
    options: [
      { text: 'On', value: true },
      { text: 'Off', value: false },
    ],
  },
  {
    key: 'textSpeed',
    text: 'Text speed',
    selectedIndex: 0,
    options: [
      { text: 'Slow', value: 0.5 },
      { text: 'Normal', value: 1 },
      { text: 'Fast', value: 2 },
      { text: 'Very fast', value: 3 },
    ],
  },
  { key: 'restoreDefaults', text: 'Restore defaults', selectedIndex: 0, options: [] },
  { key: 'goBack', text: 'Go back', selectedIndex: 0, options: [] },
] as const;
