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
      { text: 'Slow', value: 40 },
      { text: 'Normal', value: 80 },
      { text: 'Fast', value: 120 },
      { text: 'Very fast', value: 160 },
    ],
  },
  { key: 'restoreDefaults', text: 'Restore defaults', selectedIndex: 0, options: [] },
  { key: 'goBack', text: 'Go back', selectedIndex: 0, options: [] },
] as const;
