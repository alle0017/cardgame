import { Stack } from "../../../model/components/stack.js";
import { ContextMenu } from "../context_menu/context_menu.js";

type PromiseHandler<T> = {
      promise: Promise<T>,
      resolve: (v: T) => void
}

export class ZoneSelector {
      private promise: PromiseHandler<Stack> | undefined;
      public select(stack: Stack) {
            if (!this.promise) {
                  return;
            }
            this.promise.resolve(stack);
            this.promise = undefined;
            ContextMenu.unlock();
      }

      public wait(): Promise<Stack> {
            if (this.promise) {
                  return this.promise.promise;
            }
            const promise = new Promise<Stack>(resolve => {
                  this.promise = {
                        promise,
                        resolve
                  }
            });
            ContextMenu.lock();
            return promise;
      }
}