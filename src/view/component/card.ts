import { Component } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Theme } from "./theme.js";

const { div, img } = Component
export class CardState {
      get width() {
            return 59 * this.scale;
      }
      get height() {
            return 86 * this.scale;
      }
      scale = 3;
}

export function Card({ src, click }: { src?: string, click?: () => void }) {
      const size = Provider.of(CardState);
      const style = `width: ${size.width}px; height: ${size.height}px; background-color: ${Provider.of(Theme).primary}; border-radius: 7px;`;
      if (src) {
            return img({ style, src, click })
      }
      return div({ style, click })
}