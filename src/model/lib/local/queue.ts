export class LocalQueue<T> implements Queue<T> {
      private readonly topics: Map<string, T[]> = new Map;
      private readonly listeners: Map<string, ((value: T) => void)[]> = new Map;
      public push(topic: string, value: T): void {
            if (!this.topics.has(topic)) {
                  this.topics.set(topic, []);
            }
            this.topics.get(topic)?.push(value);
            if (!this.listeners.has(topic)) {
                  return;
            }
            for (const sub of this.listeners.get(topic)!) {
                  sub(value);
            }
      }
      public watch(topic: string, callback: (value: T) => void): void {
            if (!this.listeners.has(topic)) {
                  this.listeners.set(topic, []);
            }
            this.listeners.get(topic)?.push(callback);
            if (!this.topics.has(topic)) {
                  return;
            }
            for (const msg of this.topics.get(topic)!) {
                  callback(msg);
            }
      }
}