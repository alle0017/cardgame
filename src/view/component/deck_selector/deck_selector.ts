import { DeckService } from "../../../service/deck.js";
import { Component, react, } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { Reactive } from '../../../model/lib/reactive.js';
import { DeckModel } from "../../../service/store.js";

const { select, option } = Component;

export function DeckSelector({ deckSelected }: { deckSelected?: (model: DeckModel) => void}) {
      const decks: Reactive<Map<string, DeckModel>> = new Reactive(new Map);

      Provider.of(DeckService).getAllDecks().then(stored => {
            const map: Map<string, DeckModel> = new Map;
            for (const deck of stored) {
                  map.set(deck.name, deck);
            }
            decks.value = map;
      }).catch(console.error);

      function change(e: Event) {
            const text = (e.target as HTMLSelectElement).value;
            if (!text) {
                  return;
            }
            deckSelected?.(decks.value.get(text)!);
      }
      return react(() => 
            select({ change },
                  option({ value: '' },
                        'select a deck'
                  ),
                  ...decks.value.keys().map(deck => 
                        option({ value: deck }, 
                              deck
                        )
                  )
            ),
      decks);
}