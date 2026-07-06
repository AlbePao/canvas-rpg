import type { SettingItem } from './settingsMenu.types';

export const SETTINGS_MENU_ITEMS: SettingItem[] = [
  { key: 'text_speed', text: 'Text Speed', selectedIndex: 0, options: [] },
  { key: 'go_back', text: 'Go back', selectedIndex: 0, options: [] },
] as const;
