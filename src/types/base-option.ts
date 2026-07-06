export interface BaseOption<T = string> {
  key: T; // unique key to be emitted when this option is selected
  text: string; // text of the option to be displayed
}
