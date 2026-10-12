export class Reactive<T> {
      private readonly subscribers: Set<() => void> = new Set;
      constructor(private _value: T) {}

      public get value(): T {
            return this._value;
      }
      public set value(v: T) {
            this._value = v;
            this.dispatch();
      }

      public dispatch() {
            for (const sub of this.subscribers) {
                  sub();
            }
      }

      public subscribe(fn: () => void) {
            this.subscribers.add(fn);
      }
}