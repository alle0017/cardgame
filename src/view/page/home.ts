import { getBoard } from "../../model/game.js";
import { FirebaseComponent } from "../../model/lib/firebase/firebase.js";
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
            service.createCard({ id: 0, ...card }).catch(console.error);
      }
}
export function HomePage() {
      const board = getBoard();
      const theme = Provider.of(Theme);
      const nickname = bind();
      const opponent = bind();
      const game = bind();
      const decks: Map<string, DeckModel> = new Map;
      async function loadDecks() {
            if (decks.size != board.decks.length) {
                  throw new Error("can't continue as some decks are missing");
            }
            const promises = decks.entries().map(async ([k,v]) => [k, await Provider.of(DeckService).getDeck(v)] as const)
            const entries = await Promise.all(promises);
            return new Map(entries);
      }
      async function play() {
            try {
                  if (!nickname.value.replaceAll(' ', '') || !opponent.value.replaceAll(' ', '') || !game.value.replaceAll(' ', '')) {
                        return;
                  }

                  Provider.of(Router).goto('/game', {
                        local: nickname.value.replaceAll(' ', ''),
                        remote: opponent.value.replaceAll(' ', ''),
                        game: game.value.replaceAll(' ', ''),
                        decks: await loadDecks(),
                        board
                  } satisfies GamePageParams);
            } catch (e) {
                  console.error(e)
            }
            
      }
      async function playSolo() {
             try {
                  Provider.of(Router).goto('/game', {
                        local: 'local',
                        remote: 'remote',
                        game: 'local game only',
                        decks: await loadDecks(), 
                        solo: true,
                        board
                  } satisfies GamePageParams);
            } catch (e) {
                  console.error(e)
            }
      }
      return div({ style: `border: 1px solid ${theme.primary}; align-items: center; justify-content: center; border-radius: 7px; width: 500px; height: 100%; padding: 30px; ${column('20px')}` },
            ...(FirebaseComponent.hasKey() ? [
                  input({ ...nickname.binding, placeholder: 'insert here your nickname' }), 
                  input({ ...opponent.binding, placeholder: 'insert here the opponent nickname'  }), 
            ]: [
                  button({ click: () => Provider.of(Router).goto('/settings') },
                        'Cloud settings are missing, set it here'
                  )
            ]),
            input({ ...game.binding, placeholder: 'insert here the game password' }), 
            ...board.decks.map(k => 
                  DeckSelector({ placeholder: `select the ${k} deck`, deckSelected: model => decks.set(k, model) }),
            ),
            
            hr({ style: "width: 80%;" }),
            FirebaseComponent.hasKey() ? 
                  button({ click: play }, 
                        'Play'
                  ): '',
            button({ click: playSolo }, 
                  'Play solo'
            ),
            button({ click: () => Provider.of(Router).goto('/deck') }, 
                  'Build deck'
            ),
            button({ click: importNewCards }, 
                  'Import cards'
            ),     
            button({ click: () => Provider.of(Router).goto('/board_builder') }, 
                  'Build board'
            ),       
            button({ click: () => Provider.of(Router).goto('/settings') }, 
                  'Settings'
            ),
      )
}