import { LocalQueue } from "./local/queue.js";
type Args = Record<`arg${number}`, unknown>
export type RemoteCall = {
      method: string,
      args: Args
}
export class Controller {
      private static readonly controlled: WeakSet<{}> = new WeakSet;
      private static queue: Queue<RemoteCall> = new LocalQueue;

      public static getQueue() {
            return this.queue;
      }
      public static setQueue(queue: Queue<RemoteCall>) {
            this.queue = queue;
      }

      public static isControlled(instance: {}) {
            return this.controlled.has(instance);
      }
      public static manage(instance: {}) {
            this.controlled.add(instance);
      }
}
export function remote(obj: Topic) {
      Controller.getQueue().watch(obj.topic, call => {
            //@ts-expect-error
            const fn = obj[call.method];
            if (!fn || typeof fn != 'function') {
                  throw new Error('invalid method call')
            }

            const argObj = call.args;
            const args: unknown[] = [];

            for (const [arg, value] of Object.entries(argObj)) {
                  const idx = Number.parseInt(arg.replace('arg', ''));
                  args[idx] = value;
            }
            fn.call(obj, ...args);
      });
}
export function controller<T extends Topic>(obj: T) {
      return new Proxy(obj, {
            get(_, p: string | symbol) {
                  const meta = obj as {} as Dispatcher;
                  const key = p.toString();
                  if (meta.__dispatchers__?.has(key)) {
                        return meta.__dispatchers__?.get(key);
                  }
                  return Reflect.get(_, p);
            }
      });
}

interface Dispatcher {
      __dispatchers__: Map<string, (...args: any[]) => void> | undefined
}
export function dispatch(method: (...args: any[]) => void, ctx: ClassMethodDecoratorContext<Topic>) {
      //@ts-expect-error
      ctx.addInitializer(function (this: Topic & Dispatcher) {
            this.__dispatchers__ ??= new Map;
            this.__dispatchers__.set(ctx.name.toString(), function (this: Topic, ...args: any[]) {
                  method.call(this, ...args);
                  const argObj: Args = {};

                  for (let i = 0; i < args.length; i++) {
                        argObj[`arg${i}`] = args[i];
                  }
                  Controller.getQueue().push(this.topic, { args: argObj, method: ctx.name.toString() });
            })
      })     
}