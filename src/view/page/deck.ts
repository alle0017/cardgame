import { DeckService } from "../../service/deck.js";
import { CardSearch } from "../component/card_search/card_search.js";
import { Table } from "../component/table/table.js";
import { column, Exception, row } from "../component/theme.js";
import { Component, react, bind } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Reactive } from '../../model/lib/reactive.js';
import { DeckModel } from "../../service/store.js";
import { DeckSelector } from "../component/deck_selector/deck_selector.js";
import { CardState } from "../component/card.js";
import { icon, Icons } from "../component/icons.js";

const { div, input, button, } = Component;

export function DeckPage() {
      const cards: Reactive<Card[]> = new Reactive([]);
      const deck: Reactive<Card[]> = new Reactive([]);
      const name = bind();
      const Input = input({ ...name.binding, placeholder: 'insert here the deck name' }) as HTMLInputElement;

      Provider.of(DeckService).getAllCards().then(stored => cards.value = stored).catch(Exception);
      

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
            name.value = model.name;
      }
      async function save(e: Event) {
            if (!name.value.replaceAll(' ', '')) {
                  Exception(`invalid name "${name.value}"`)
                  return;
            }

            try {
                  await Provider.of(DeckService).createDeck(name.value, deck.value);
            } catch (e) {
                  Exception(e)
            }
      }
      function sort() {
            deck.value.sort((a,b) => a.img.localeCompare(b.img))
            deck.dispatch();
      }

      async function deleted(card: Card) {
            await Provider.of(DeckService).deleteCard({ ...card, _auto: crypto.randomUUID() });
            Provider.of(DeckService).getAllCards().then(stored => cards.value = stored).catch(Exception);
      }
      return div({ style: `width: 100%; height: 80vh; padding: 20px; justify-content: center; ${row('20px')}` },
            div({ style: `padding: 20px; ${column('20px')}` },
                  div({ style: `align-items: center; ${row('10px')}` },
                        Input,
                        DeckSelector({ placeholder: 'select the deck', deckSelected: loadDeck }),
                        button({ class: 'icon-btn', click: save },
                              icon({}, Icons.Save)
                        ),
                        button({ class: 'icon-btn', click: sort },
                              icon({}, Icons.Sort)
                        )
                  ),
                  div({ style: `${row('10px')}` },
                        div({ style: `width: ${Provider.of(CardState).width * 8}px; height: 70vh; overflow-y: scroll;`},
                              react([deck], () => 
                                    Table({ cards: deck.value, click: remove }),
                              ),
                        ),
                  )
            ),
            div({ style: 'width: 300px; height: 100%;' },
                  react([cards], () => 
                        CardSearch({ cards: cards.value, click: add, deleted }),
                  )
            )
      )
      
}