import { Component, react } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { Card, CardState } from "../card.js";

const { div, img } = Component

export function CardPreview({}) {
      const state = Provider.of(CardState);
      const FACTOR = 3;
      return div({ style: `min-width: ${state.width * FACTOR}px; min-height: ${state.height * FACTOR}px;`},
            react([state.selected], () =>
                  Card({ src: state.selected.value, width: `${state.width * FACTOR}px`, height: `${state.height * FACTOR}px` })
            )
      )
}