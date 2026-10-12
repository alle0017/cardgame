import { DeckService } from "../../service/deck.js";
import { CardSearch } from "../component/card_search/card_search.js";
import { Table } from "../component/table/table.js";
import { column, row } from "../component/theme.js";
import { Component, react, bind } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Reactive } from '../../model/lib/reactive.js';
import { DeckModel } from "../../service/store.js";

const { div, input, button, hr, select, option } = Component;

export function DeckPage() {
      const cards: Reactive<Card[]> = new Reactive([]);
      const decks: Reactive<Map<string, DeckModel>> = new Reactive(new Map);
      const deck: Reactive<Card[]> = new Reactive([]);
      const name = bind();

      Provider.of(DeckService).getAllCards().then(stored => cards.value = stored).catch(console.error);
      Provider.of(DeckService).getAllDecks().then(stored => {
            const map: Map<string, DeckModel> = new Map;
            for (const deck of stored) {
                  map.set(deck.name, deck);
            }
            decks.value = map;
      }).catch(console.error);

      function add(card: Card) {
            deck.value.push(card); 
            deck.dispatch();
      }
      function remove(card: Card, index: number) {
            deck.value.splice(index, 1);
            deck.dispatch();
      }
      async function loadDeck(e: Event) { 
            const text = (e.target as HTMLInputElement).value;
            const model = decks.value.get(text)!;
            const cards = await Provider.of(DeckService).getDeck(model);
            deck.value = cards;
      }
      async function save() {
            if (!name.value.replaceAll(' ', '')) {
                  return;
            }
            await Provider.of(DeckService).createDeck(name.value, cards.value);
      }
      return div({ style: `${column('20px')}` },
            div({ style: `${row('10px')}` },
                  input({ ...name.binding, placeholder: 'insert here the deck name' }),
                  react(() => 
                        select({ change: loadDeck },
                             ...decks.value.keys().map(deck => 
                                    option({ value: deck }, 
                                          deck
                                    )
                              )
                        ),
                  decks),
                  button({ click: save },
                        'save'
                  )
            ),
            div({ style: `${row('10px')}` },
                  react(() => 
                        Table({ cards: deck.value, click: remove }),
                  deck),
                  react(() => 
                        CardSearch({ cards: cards.value, click: add }),
                  cards)
            )
      )
}