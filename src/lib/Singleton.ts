// Singleton factory based on https://stackoverflow.com/a/74290285
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Singleton<T>() {
  return class Singleton {
    private static _instance: T;

    static getInstance(): T {
      if (!this._instance) {
        this._instance = new this() as T;
      }

      return this._instance;
    }
  };
}
