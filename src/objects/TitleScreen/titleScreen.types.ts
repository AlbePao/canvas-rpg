import type { SelectionOption } from '../SelectionBox';

export type TitleScreenOption = Pick<SelectionOption, 'text' | 'value'>;

export interface TitleScreenConfig {
  saveFile: unknown;
}
