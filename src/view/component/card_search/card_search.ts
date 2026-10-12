import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import * as view from "../card.js";
import { column } from "../theme.js";

const { div, input } = Component;

export function CardSearch({ cards, click }: { cards: Card[], click?: (card: Card) => void }) {
      const signal = new Reactive(cards); 
      function search(e: Event) {
            const text = (e.target as HTMLInputElement).value;

            if (!text.replaceAll(' ', '')) {
                  if (signal.value.length != cards.length) {
                        signal.value = cards;
                  }
                  return
            }

            signal.value = cards.filter(card => card.name.includes(text));

      }
      return div({ style: `${column()}` },
            input({ placeholder: 'type a card name...', input: search  }),
            react(() => 
                  div({ style: `overflow-y: scroll; height: 300px; width: ${Provider.of(view.CardState).width + 20}px; align-items: center; ${column('4px')}` },
                        ...signal.value.map(card => 
                              view.Card({ src: card.img, click: () => click?.(card) })
                        )
                  )
            , signal)
      )
}