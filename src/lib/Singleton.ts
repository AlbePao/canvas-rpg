// Singleton factory based on https://stackoverflow.com/a/74290285
export function Singleton<T>() {
  return class Singleton {
    private static instance: T;

    static getInstance(): T {
      if (!this.instance) {
        this.instance = new this() as T;
      }

      return this.instance;
    }
  };
}
