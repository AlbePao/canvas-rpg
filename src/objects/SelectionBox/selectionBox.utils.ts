import type { SelectionOption } from './selectionBox.types';

export function isSelectionBoxOption(option: unknown): option is SelectionOption {
  return typeof option === 'object' && option !== null && ('exclude' in option || 'include' in option);
}
