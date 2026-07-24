export class Registry<V> {
  private _map = new Map<string, V>();
  private _isLoaded = false;

  constructor(
    private readonly _name: string,
    private readonly _incrementalLoad = false,
  ) {}

  load(data: Record<string, V> | Map<string, V>): void {
    if (this._incrementalLoad) {
      this._map = new Map([...this._map, ...(data instanceof Map ? data : Object.entries(data))]);
      return;
    }

    if (this._isLoaded) {
      throw new Error(`Registry "${this._name}" has already been loaded.`);
    }

    if (data instanceof Map) {
      this._map = new Map(data);
    } else {
      this._map = new Map(Object.entries(data));
    }

    this._isLoaded = true;
  }

  get(key: string): V {
    const value = this._map.get(key);

    if (!value && value !== 0) {
      throw new Error(`Key "${key}" does not exist in registry "${this._name}".`);
    }

    return value;
  }

  getOptional(key: string): V | null {
    return this._map.get(key) ?? null;
  }

  has(key: string): boolean {
    return this._map.has(key);
  }

  clear(): void {
    this._map.clear();
    this._isLoaded = false;
  }
}
