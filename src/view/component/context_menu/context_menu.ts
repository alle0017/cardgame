import { Component, } from "../../lib/index.js";
import { Exception, } from "../theme.js";

const { div } = Component;

export type Options<T extends {} = {}> = Record<string, ((args: T) => void) | ((args: T) => Promise<void>) | undefined>;

export class ContextMenu {
      private static locked = false;

      public static lock() {
            this.locked = true;
      }

      public static unlock() {
            this.locked = false;
      }

      public static append(root: HTMLElement, options: Options, ctx: {} = {}) {
            if (this.locked) {
                  return;
            }

            this.lock();

            const box = root.getBoundingClientRect();
            const menu = div({ class: 'context-menu', style: `position: fixed; left: ${box.left}px; top: ${box.bottom + 4}px;` },
                  ...Object.entries(options).map(([label, callback]) =>
                        div({ class: 'context-menu-option',
                              click: async () => {
                                    try {
                                          const promise = callback?.(ctx);
                                          menu.remove();
                                          this.unlock();
                                          if (promise) {
                                                await promise;
                                          }
                                    } catch(e) {
                                          Exception(e)
                                          menu.remove();
                                          this.unlock();
                                    }
                              },
                        }, label)
                  )
            );

            document.body.append(menu);

            const bounds = menu.getBoundingClientRect();

            if (bounds.right > window.innerWidth - 8) {
                  menu.style.left = `${Math.max(8, window.innerWidth - bounds.width - 8)}px`;
            }

            if (bounds.bottom > window.innerHeight - 8) {
                  menu.style.top = `${Math.max(8, box.top - bounds.height - 4)}px`;
            }

            const close = () => {
                  menu.remove();
                  this.unlock();
                  document.removeEventListener("mousedown", onOutsideClick);
            };

            const onOutsideClick = (event: MouseEvent) => {
                  if (!menu.contains(event.target as Node)) { 
                        close();
                  }
            };

            document.addEventListener("mousedown", onOutsideClick);
      }
}