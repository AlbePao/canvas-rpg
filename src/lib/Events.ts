import type { GameObject } from './GameObject';
import { Singleton } from './Singleton';

type EventCallback<T> = (value: T) => void;

interface Listener<T = unknown> {
  id: number;
  caller: GameObject;
  callback: EventCallback<T>;
}

interface ListenerIndex {
  eventName: string;
  caller: GameObject;
}

class EventsSingleton extends Singleton<EventsSingleton>() {
  private readonly _listenersByEvent = new Map<string, Map<number, Listener>>();
  private readonly _listenerIndex = new Map<number, ListenerIndex>();
  private readonly _listenersByCaller = new Map<GameObject, Set<number>>();
  private _nextId = 0;

  // Emit event
  emit<T>(eventName: string, value?: T): void {
    const listeners = this._listenersByEvent.get(eventName);
    if (!listeners) {
      return;
    }

    // Snapshot sicuro se un callback si disiscrive durante l'emit
    for (const listener of Array.from(listeners.values())) {
      listener.callback(value);
    }
  }

  // Subscribe to something happening
  on<T>(eventName: string, caller: GameObject, callback: EventCallback<T>): number {
    const id = ++this._nextId;
    const listener: Listener<T> = { id, caller, callback };

    let byEvent = this._listenersByEvent.get(eventName);

    if (!byEvent) {
      byEvent = new Map<number, Listener>();
      this._listenersByEvent.set(eventName, byEvent);
    }
    byEvent.set(id, listener as Listener);

    this._listenerIndex.set(id, { eventName, caller });

    let byCaller = this._listenersByCaller.get(caller);

    if (!byCaller) {
      byCaller = new Set<number>();
      this._listenersByCaller.set(caller, byCaller);
    }
    byCaller.add(id);

    return id;
  }

  // Remove the subscription
  off(id: number): void {
    const listener = this._listenerIndex.get(id);
    if (!listener) {
      return;
    }

    const byEvent = this._listenersByEvent.get(listener.eventName);
    byEvent?.delete(id);
    if (byEvent?.size === 0) {
      this._listenersByEvent.delete(listener.eventName);
    }

    const byCaller = this._listenersByCaller.get(listener.caller);
    byCaller?.delete(id);
    if (byCaller?.size === 0) {
      this._listenersByCaller.delete(listener.caller);
    }

    this._listenerIndex.delete(id);
  }

  // Unsubscribe all events for a specific caller
  unsubscribe(caller: GameObject): void {
    const ids = this._listenersByCaller.get(caller);
    if (!ids) {
      return;
    }

    for (const id of ids) {
      const listener = this._listenerIndex.get(id);
      if (!listener) {
        continue;
      }

      const byEvent = this._listenersByEvent.get(listener.eventName);
      byEvent?.delete(id);
      if (byEvent?.size === 0) {
        this._listenersByEvent.delete(listener.eventName);
      }

      this._listenerIndex.delete(id);
    }

    this._listenersByCaller.delete(caller);
  }

  clear(): void {
    this._listenersByEvent.clear();
    this._listenerIndex.clear();
    this._listenersByCaller.clear();
    this._nextId = 0;
  }
}

export const Events = EventsSingleton.getInstance();
