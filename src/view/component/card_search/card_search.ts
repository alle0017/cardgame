import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import * as view from "../card.js";
import { icon, Icons } from "../icons.js";
import { column } from "../theme.js";

const { div, input, button } = Component;

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
      return div({ style: `align-items: center; width: 100%; min-width: 100%;`, class: 'card' },
            input({ placeholder: 'type a card name...', input: search  }),
            react([signal], () => 
                  div({ class: 'scroll', style: ` height: 300px; padding-bottom: 300px; width: ${Provider.of(view.CardState).width + 20}px;` },
                        ...signal.value.map(card => 
                              div({ style: column() },
                                    div({ class: 'icon-btn-bar', },
                                          button({ class: 'icon-btn', click: () => deleted?.(card), title: `delete ${card.name}` },
                                                icon({},
                                                      Icons.Trash
                                                )
                                          ),
                                    ),
                                    view.Card({ src: card.img, click: () => click?.(card) })
                              )
                        )
                  )
            )
      )
}