import { getBoard, setBoard } from "../../model/game.js";
import { FirebaseComponent } from "../../model/lib/firebase/firebase.js";
import { DeckService } from "../../service/deck.js";
import { CloudKeyInput } from "../component/cloud_key/cloud_key_input.js";
import { column, } from "../component/theme.js";
import { ThemePicker } from "../component/theme/theme_picker.js";
import { Component, } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Router } from "../lib/router.js";
const { div, hr, h4, button, details, summary } = Component;

type State = {
      cards: Card[],
      board: Board,
      cloudKey: {}
}
async function exportState(): Promise<State> {
      const models = await Provider.of(DeckService).getAllCards();

      return {
            cards: models,
            board: getBoard(),
            cloudKey: FirebaseComponent.getKey()
      }
}
async function downloadSettings() {
      const json = await exportState();
      const blob = new Blob([JSON.stringify(json)], {
            type: "application/json"
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = 'settings.json';

      a.click();

      URL.revokeObjectURL(url);
}
function pickJsonFile(): Promise<File | null> {
      return new Promise((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/json,.json";
            input.onchange = () => resolve(input.files?.[0] ?? null);
            input.oncancel = () => resolve(null);
            input.click();
      });
}

function parseState(text: string): State {
    const data = JSON.parse(text);

      if (typeof data !== "object" || data === null || !Array.isArray(data.cards) || typeof data.board !== "object" || data.board === null) {
            throw new Error("Invalid settings file");
      }

      return {
            cards: data.cards,
            board: data.board,
            cloudKey: data.cloudKey ?? {}
      };
}

async function importState(state: State) {
      const promises = state.cards.map(card => Provider.of(DeckService).createCard(card));
      await Promise.all(promises)
      setBoard(state.board);

      FirebaseComponent.setKey(JSON.stringify(state.cloudKey));
}

async function importSettings() {
      const file = await pickJsonFile();
      if (!file) {
            return;
      }

      try {
            const state = parseState(await file.text());
            await importState(state);
      } catch (e) {
            console.error(e);
            alert("Could not import settings: the file is not a valid export.");
      }
}
export function SettingsPage() {
      return div({ style: `width: 600px; ${column()}` },
            button({ style: 'align-self: start;', click: () => Provider.of(Router).goto('/') }, 
                  'Back' 
            ),
            h4({}, 'Share'),
            details({ style: ` padding: 10px; width: 100%;` },
                  summary({ style: `margin-bottom: 30px;` },
                        'Share your game settings with other players'
                  ),
                  div({ style: column() },
                        button({ click: downloadSettings }, 'Export'),
                        button({ click: importSettings }, 'Import'),
                  )
            ),
            h4({}, 'Theme'),
            ThemePicker(),
            hr({}),
            h4({ }, 'Cloud settings'),
            CloudKeyInput(),
      )
}