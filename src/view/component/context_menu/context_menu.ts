import { Component } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { column, Theme } from "../theme.js";

const { div } = Component;

export type Options = Record<string, (() => void) | undefined>;

export class ContextMenu {
      private static locked = false;

      public static lock() {
            this.locked = true;
      }

      public static unlock() {
            this.locked = false;
      }

      public static append(root: HTMLElement, options: Options) {
            if (this.locked) {
                  return;
            }

            this.lock();

            const theme = Provider.of(Theme);
            const box = root.getBoundingClientRect();

            const menu = div({
                  style: `
                        position: fixed;
                        left: ${box.left}px;
                        top: ${box.bottom + 4}px;
                        min-width: 190px;
                        max-width: 280px;
                        padding: 4px;
                        box-sizing: border-box;
                        background: ${theme.primary};
                        color: ${theme.text};
                        border: 1px solid ${theme.secondary};
                        border-radius: 8px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4),
                                    0 2px 6px rgba(0, 0, 0, 0.2);
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                        font-size: 13px;
                        font-weight: 400;
                        z-index: 10000;
                        overflow-y: auto;
                        max-height: 300px;
                        user-select: none;
                        ${column('2px')}
                  `
            },
                  ...Object.entries(options).map(([label, callback]) =>
                        div({
                              style: `
                                    display: flex;
                                    align-items: center;
                                    box-sizing: border-box;
                                    width: 100%;
                                    min-height: 30px;
                                    padding: 0 10px;
                                    border-radius: 5px;
                                    color: ${theme.text};
                                    background: transparent;
                                    text-align: left;
                                    white-space: nowrap;
                                    cursor: default;
                                    transition: background-color 100ms ease;
                              `,
                              mouseenter: event => {
                                    (event.currentTarget as HTMLElement).style.backgroundColor =
                                          theme.accentPrimary;
                              },
                              mouseleave: event => {
                                    (event.currentTarget as HTMLElement).style.backgroundColor =
                                          "transparent";
                              },
                              click: () => {
                                    try {
                                          callback?.();
                                    } finally {
                                          menu.remove();
                                          this.unlock();
                                    }
                              },
                        }, label)
                  )
            );

            document.body.append(menu);

            // Keep the menu inside the viewport.
            const bounds = menu.getBoundingClientRect();

            if (bounds.right > window.innerWidth - 8) {
                  menu.style.left = `${Math.max(8, window.innerWidth - bounds.width - 8)}px`;
            }

            if (bounds.bottom > window.innerHeight - 8) {
                  menu.style.top = `${Math.max(8, box.top - bounds.height - 4)}px`;
            }

            // Close the menu when clicking elsewhere or pressing Escape.
            const close = () => {
                  menu.remove();
                  this.unlock();
                  document.removeEventListener("mousedown", onOutsideClick);
                  document.removeEventListener("keydown", onKeyDown);
            };

            const onOutsideClick = (event: MouseEvent) => {
                  if (!menu.contains(event.target as Node)) { 
                        close();
                  }
            };

            const onKeyDown = (event: KeyboardEvent) => {
                  if (event.key === "Escape") {
                        close();
                  }
            };

            document.addEventListener("mousedown", onOutsideClick);
            document.addEventListener("keydown", onKeyDown);
      }
}