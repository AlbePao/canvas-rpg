import type { GameObject } from '../GameObject';

export type EventCallback<T> = (value: T) => void;

export interface Listener<T = unknown> {
  id: number;
  caller: GameObject;
  callback: EventCallback<T>;
}

export interface ListenerIndex {
  eventName: string;
  caller: GameObject;
}
