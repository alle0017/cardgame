import { DeckService } from "../../service/deck.js";
import { CardSearch } from "../component/card_search/card_search.js";
import { Table } from "../component/table/table.js";
import { column, row, Theme } from "../component/theme.js";
import { Component, react, bind } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Reactive } from '../../model/lib/reactive.js';
import { DeckModel } from "../../service/store.js";
import { DeckSelector } from "../component/deck_selector/deck_selector.js";
import { CardState } from "../component/card.js";
import { Router } from "../lib/router.js";

const { div, input, button, } = Component;

export function DeckPage() {
      const cards: Reactive<Card[]> = new Reactive([]);
      const deck: Reactive<Card[]> = new Reactive([]);
      const name = bind();
      const Input = input({ ...name.binding, placeholder: 'insert here the deck name' }) as HTMLInputElement;

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
            Input.value = model.name;
      }
      async function save(e: Event) {
            const btn = e.target as HTMLElement;
            if (!name.value.replaceAll(' ', '')) {
                  btn.style.borderColor = Provider.of(Theme).error;
                  return;
            }

            try {

                  await Provider.of(DeckService).createDeck(name.value, deck.value);
            } catch (e) {
                  console.error(e)
                  btn.style.border = Provider.of(Theme).error;
            }
            btn.style.borderColor = Provider.of(Theme).primary;
      }
      function sort() {
            deck.value.sort((a,b) => a.img.localeCompare(b.img))
            deck.dispatch();
      }

      async function deleted(card: Card) {
            await Provider.of(DeckService).deleteCard({ ...card, _auto: crypto.randomUUID() });
            Provider.of(DeckService).getAllCards().then(stored => cards.value = stored).catch(console.error);
      }
      return div({ style: `width: 90vw; ${column('20px')}` },
            div({ style: `${row('10px')}` },
                  button({ click: () => Provider.of(Router).goto('/') },
                        'back'
                  ),
                  Input,
                  DeckSelector({ placeholder: 'select the deck', deckSelected: loadDeck }),
                  button({ click: save },
                        'save'
                  ),
                  button({ click: sort },
                        'sort'
                  )
            ),
            div({ style: `${row('10px')}` },
                  div({ style: `width: ${Provider.of(CardState).width * 8}px; height: 70vh; overflow-y: scroll;`},
                        react([deck], () => 
                              Table({ cards: deck.value, click: remove }),
                        ),
                  ),
                  react([cards], () => 
                        CardSearch({ cards: cards.value, click: add, deleted }),
                  )
            )
      )
}