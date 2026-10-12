import { DeckService } from "../../service/deck.js";
import { CardSearch } from "../component/card_search/card_search.js";
import { Table } from "../component/table/table.js";
import { column, row } from "../component/theme.js";
import { Component, react, bind } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Reactive } from '../../model/lib/reactive.js';
import { DeckModel } from "../../service/store.js";
import { DeckSelector } from "../component/deck_selector/deck_selector.js";

const { div, input, button, } = Component;

export function DeckPage() {
      const cards: Reactive<Card[]> = new Reactive([]);
      const deck: Reactive<Card[]> = new Reactive([]);
      const name = bind();

      Provider.of(DeckService).getAllCards().then(stored => cards.value = stored).catch(console.error);
      

      function add(card: Card) {
            deck.value.push(card); 
            deck.dispatch();
      }
      function remove(card: Card, index: number) {
            deck.value.splice(index, 1);
            deck.dispatch();
      }
      async function loadDeck(model: DeckModel) { 
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
                  DeckSelector({ deckSelected: loadDeck }),
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