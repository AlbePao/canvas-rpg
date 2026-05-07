import type { GameObject } from './GameObject';
import { Singleton } from './lib/Singleton';

interface EventCallback<T = unknown> {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: (value: T) => void;
}

class EventsSingleton extends Singleton<EventsSingleton>() {
  callbacks: EventCallback[] = [];
  nextId = 0;

  // emit event
  emit<T>(eventName: string, value?: T): void {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  // subscribe to something happening
  on<T>(eventName: string, caller: GameObject, callback: (value: T) => void): number {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback: callback as (value: unknown) => void,
    });

    return this.nextId;
  }

  // remove the subscription
  off(id: number): void {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  unsubscribe(caller: GameObject): void {
    this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller);
  }
}

export const Events = EventsSingleton.getInstance();
