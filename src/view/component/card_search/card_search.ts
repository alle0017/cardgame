import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import * as view from "../card.js";
import { column, Theme } from "../theme.js";

const { div, input } = Component;

export function CardSearch({ cards, click, deleted }: { cards: Card[], click?: (card: Card) => void, deleted?:  (card: Card) => void}) {
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
      return div({ style: `align-items: center; ${column()}` },
            input({ placeholder: 'type a card name...', input: search  }),
            react([signal], () => 
                  div({ style: `overflow-y: scroll; height: 300px; padding-bottom: 300px; width: ${Provider.of(view.CardState).width + 20}px;` },
                        ...signal.value.map(card => 
                              div({ style: column() },
                                    div({ 
                                          style: `width: 32px; height: 32px; border-radius: 7px; align-self: end; font-size: 28px; display: flex; align-items: end; justify-content: center; border: 1px solid ${Provider.of(Theme).primary}`, 
                                          click: () => deleted?.(card)
                                    },
                                          '⨯'
                                    ),
                                    view.Card({ src: card.img, click: () => click?.(card) })
                              )
                        )
                  )
            )
      )
}