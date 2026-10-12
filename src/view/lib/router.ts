import { Reactive } from "../../model/lib/reactive.js";
import { react } from "./index.js";

export class Router<T extends Record<string, (params: {}) => HTMLElement>> {
      private readonly signal: Reactive<keyof T>;
      private params: {} = {}
      constructor(private readonly routes: T, home: keyof T) {
            this.signal = new Reactive(home);
      }
      public goto(route: keyof T, params: {} = this.params) {
            this.params = params;
            this.signal.value = route;
      }

      public mount(root = document.body) {
            root.append(react(() => this.routes[this.signal.value](this.params), this.signal))
      }     
}