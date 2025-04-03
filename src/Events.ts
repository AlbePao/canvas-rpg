import { GameObject } from './GameObject';

interface EventCallback {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: (value: unknown) => void;
}

// TODO: maybe treat as singleton?
class Events {
  callbacks: EventCallback[] = [];
  nextId = 0;

  // emit event
  emit<T>(eventName: string, value: T) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  // subscribe to something happening
  on(eventName: string, caller: any, callback: (value: unknown) => void) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });

    return this.nextId;
  }

  // remove the subscription
  off(id: number) {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  unsubscribe(caller: GameObject) {
    this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller);
  }
}

export const events = new Events();
