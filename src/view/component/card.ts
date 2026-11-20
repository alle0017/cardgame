import { Component } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Theme } from "./theme.js";
import { Reactive } from '../../model/lib/reactive.js';

const { div, img } = Component
export class CardState {
      get width() {
            return 59 * this.scale;
      }
      get height() {
            return 86 * this.scale;
      }
      scale = 1;

      selected: Reactive<string | undefined> = new Reactive(undefined);
}

export function Card({ src, click, width, height }: { src?: string, width?: string, height?: string, click?: () => void }) {
      const size = Provider.of(CardState);
      width ??= `${size.width}px`;
      height ??= `${size.height}px`;
      const style = `width: ${width}; height: ${height}; border: 1px solid ${Provider.of(Theme).text}; border-radius: 7px;`;

      if (src) {
            function mouseenter() {
                  size.selected.value = src;
            }

            function mouseout() {
                  if (size.selected.value && size.selected.value == src) {
                        size.selected.value = undefined;
                  }
            }
            return img({ style, src, click, mouseenter, mouseout })
      }
      return div({ style, click })
}