import { Reactive } from '../../model/lib/reactive.js';

type Listener = (this: HTMLElement, ev: Event) => any;
type HTMLProp<T extends {}> = Partial<{
      [K in keyof T]: K extends keyof HTMLElementEventMap ? Listener : string | boolean
}>
export const element = (() => {
      const cache = new Map();
      return <T extends {}>(name: string, prop: HTMLProp<T>, children: HTMLElement[]) => {

            let el: HTMLElement;
            if (cache.has(name)) {
                  el = cache.get(name).cloneNode();
                  for (const key of el.attributes) {
                        el.setAttribute(key.name, "");
                  }
            } else {
                  el = document.createElement(name);
                  cache.set(name, el);
            }
            if (children) {
                  el.append(...children);
            }
            for (const [key, value] of Object.entries(prop)) {
                  if (typeof value === "function") {
                        el.addEventListener(key as keyof HTMLElementEventMap, value as EventListenerOrEventListenerObject);
                  } else if (key === 'class') {
                        el.classList.add(...(value as string).split(" "));
                  } else if (key === 'id') {
                        el.id = (value as string);
                  } else if (key === "controls") {
                        if (value) {
                              el.setAttribute("controls", "");
                        }
                  } else {
                        el.setAttribute(key, (value as string));
                  }
            }
            return el;
      };
})();

//@ts-ignore
export const Component: Record<keyof HTMLElementTagNameMap, <T extends {}>(prop: HTMLProp<T>, ...children: (HTMLElement | string)[]) => HTMLElement> = new Proxy(new Map(), {
      get(target, key, receiver) {
            const comp = key.toString();
            if (target.has(comp)) {
                  return target.get(comp);
            }
            const f = <T extends {}>(prop: HTMLProp<T>, ...children: HTMLElement[]) => element(comp, prop, children);
            target.set(comp, f);
            return f;
      }
});

export function react(component: () => HTMLElement, ...signals: Reactive<unknown>[]) {
      let el = component();
      function handler() {
            const replace = component();
            el.replaceWith(replace);
            el = replace;
      }

      for (const signal of signals) {
            signal.subscribe(handler);
      }
      return el;
}

export function style(css: string) {
      document.head.append(Component.style({}, css))
}
export function bind() {
      const obj =  {
            value: '',
            binding: {
                  change: (e: Event) => obj.value = (e.target as HTMLInputElement).value,
            }
      }
      return obj;
}