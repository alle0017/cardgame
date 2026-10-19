import { DeckService } from "../../service/deck.js";
import { DeckModel } from "../../service/store.js";
import { CloudKeyInput } from "../component/cloud_key/cloud_key_input.js";
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
function fileAsDataUrl(file: File | Blob): Promise<string> {
      return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error(reader.error?.message));
            reader.readAsDataURL(file);
      });
}

export function importImages(): Promise<ImportedImage[]> {
      return new Promise((resolve) => {
            const input = document.createElement("input");

            input.type = "file";
            input.accept = "image/*";
            input.setAttribute("webkitdirectory", "");
            input.setAttribute("directory", "");
            input.multiple = true;
            input.addEventListener('change', async () => {
                  const files = Array.from(input.files ?? []);
                  const images = files
                  .filter(file => file.type.startsWith("image/"))
                  .map(async file => ({
                        img: await fileAsDataUrl(file),
                        name: file.name.slice(0, file.name.indexOf('.'))
                  }))

                  resolve(await Promise.all(images));
            });

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
      let mana: DeckModel | undefined;

      async function play() {
            if (!nickname.value.replaceAll(' ', '') || !opponent.value.replaceAll(' ', '') || !game.value.replaceAll(' ', '') || !deck || !mana) {
                  return;
            }
            const cards = await Provider.of(DeckService).getDeck(deck);
            const manaCards = await Provider.of(DeckService).getDeck(mana);
            Provider.of(Router).goto('/game', {
                  local: nickname.value.replaceAll(' ', ''),
                  remote: opponent.value.replaceAll(' ', ''),
                  game: game.value.replaceAll(' ', ''),
                  deck: cards,
                  mana: manaCards
            } satisfies GamePageParams);
      }
      async function playSolo() {
            if (!deck || !mana) {
                  return;
            }
            const cards = await Provider.of(DeckService).getDeck(deck);
            const manaCards = await Provider.of(DeckService).getDeck(mana);
            Provider.of(Router).goto('/game', {
                  local: '',
                  remote: '',
                  game: 'any',
                  deck: cards,
                  mana: manaCards,
                  solo: true
            } satisfies GamePageParams);
      }
      return div({ style: `background-color: ${theme.primary}; align-items: center; justify-content: center; border-radius: 7px; width: 500px; padding: 30px; ${column('20px')}` },
            input({ ...nickname.binding, placeholder: 'insert here your nickname' }), 
            input({ ...opponent.binding, placeholder: 'insert here the opponent nickname'  }), 
            input({ ...game.binding, placeholder: 'insert here the game password' }), 

            DeckSelector({ placeholder: 'select the main deck', deckSelected: model => (deck = model) }),
            DeckSelector({ placeholder: 'select the mana deck', deckSelected: model => (mana = model) }),
            
            hr({ style: "width: 80%;" }),
            CloudKeyInput(),
            button({ click: play }, 
                  'Play'
            ),
            button({ click: playSolo }, 
                  'Play solo'
            ),
            button({ click: () => Provider.of(Router).goto('/deck') }, 
                  'Build deck'
            ),
            button({ click: importNewCards }, 
                  'Import cards'
            ),            
            button({ click: () => Provider.of(Router).goto('/theme') }, 
                  'Change theme'
            ),
      )
}