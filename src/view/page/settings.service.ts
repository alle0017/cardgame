import { getBoard, setBoard } from "../../model/game.js";
import { FirebaseComponent } from "../../model/lib/firebase/firebase.js";
import { DeckService } from "../../service/deck.js";
import { Provider } from "../lib/provider.js";
import { CardTemplateRepository, AST } from "../../service/store.js";

type State = {
      cards: Card[],
      board: Board,
      cloudKey: {},
      templates: AST[]
}

async function exportState(): Promise<State> {
      const models = await Provider.of(DeckService).getAllCards();
      const templates = await new CardTemplateRepository().getAll();

      return {
            cards: models,
            board: getBoard(),
            cloudKey: FirebaseComponent.getKey(),
            templates
      }
}
function reviveAST(data: any): AST {
      const ast = new AST;
      ast.name = data?.name ?? '';
      ast.css = data?.css ?? '';
      ast.text = data?.text ?? '';
      ast.component = data?.component ?? '';
      ast.image = data?.image ?? '';
      if (Array.isArray(data?.children)) {
            ast.children.push(...data.children.map(reviveAST));
      }
      return ast;
}

export async function downloadSettings() {
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
            cloudKey: data.cloudKey ?? {},
            // optional, so files exported before this change still import
            templates: Array.isArray(data.templates) ? data.templates.map(reviveAST) : []
      };
}

async function importState(state: State) {
      const promises = state.cards.map(card => Provider.of(DeckService).createCard(card));
      await Promise.all(promises)

      const templateRepo = new CardTemplateRepository();
      await Promise.all(state.templates.map(t => templateRepo.insertOrUpdate(t)));

      setBoard(state.board);

      FirebaseComponent.setKey(JSON.stringify(state.cloudKey));
}

export async function importSettings() {
      const file = await pickJsonFile();
      if (!file) {
            return;
      }

      try {
            const state = parseState(await file.text());
            await importState(state);
      } catch (e) {
            console.error(e);
      }
}