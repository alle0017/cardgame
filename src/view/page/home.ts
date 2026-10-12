import { DeckService } from "../../service/deck.js";
import { DeckModel } from "../../service/store.js";
import { DeckSelector } from "../component/deck_selector/deck_selector.js";
import { column, Theme } from "../component/theme.js";
import { Component, bind } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Router } from "../lib/router.js";
import type { GamePageParams } from "./game.js";

const { div, input, button, hr } = Component;

export type ImportedImage = {
    img: string;
    name: string;
};

export function importImages(): Promise<ImportedImage[]> {
      return new Promise((resolve) => {
            const input = document.createElement("input");

            input.type = "file";
            input.accept = "image/*";
            input.setAttribute("webkitdirectory", "");
            input.setAttribute("directory", "");
            input.multiple = true;

            input.onchange = () => {
                  const files = Array.from(input.files ?? []);

                  resolve(
                        files
                        .filter(file => file.type.startsWith("image/"))
                        .map(file => ({
                              img: URL.createObjectURL(file),
                              name: file.name.slice(0, file.name.indexOf('.'))
                        }))
                  );
            };

            input.addEventListener("cancel", () => resolve([]));

            input.click();
      });

}

async function importNewCards() {
      const service = Provider.of(DeckService);
      const cards = await importImages();

      for (const card of cards) {
            service.createCard({ id: 0, ...card });
      }
}
export function HomePage() {
      const theme = Provider.of(Theme);
      const nickname = bind();
      const opponent = bind();
      const game = bind();
      let deck: DeckModel | undefined;

      async function play() {
            if (!nickname.value.replaceAll(' ', '') || !opponent.value.replaceAll(' ', '') || !game.value.replaceAll(' ', '') || !deck) {
                  return;
            }
            const cards = await Provider.of(DeckService).getDeck(deck);
            Provider.of(Router).goto('/game', {
                  local: nickname.value.replaceAll(' ', ''),
                  remote: opponent.value.replaceAll(' ', ''),
                  game: game.value.replaceAll(' ', ''),
                  deck: cards
            } satisfies GamePageParams);
      }
      return div({ style: `background-color: ${theme.primary}; align-items: center; justify-content: center; border-radius: 7px; width: 500px; padding: 30px; ${column('20px')}` },
            input({ ...nickname.binding, placeholder: 'insert here your nickname' }), 
            input({ ...opponent.binding, placeholder: 'insert here the opponent nickname'  }), 
            input({ ...game.binding, placeholder: 'insert here the game password' }), 

            DeckSelector({ deckSelected: model => (deck = model) }),
            
            hr({ style: "width: 80%;" }),

            button({ click: play }, 
                  'Play'
            ),
            button({ click: () => Provider.of(Router).goto('/deck') }, 
                  'Build deck'
            ),
            button({ click: importNewCards }, 
                  'Import cards'
            ),            
      )
}