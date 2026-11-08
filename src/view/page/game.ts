import { Game } from "../component/game/game.js";
import * as model from "../../model/game.js"
import { Provider } from "../lib/provider.js";
import { Controller } from "../../model/lib/controller.js";
import { FirebaseQueue } from "../../model/lib/firebase/queue.js";
import { LocalQueue } from "../../model/lib/local/queue.js";

export interface GamePageParams {
      local: string,
      remote: string,
      game: string,
      decks: Map<string, Card[]>
      solo?: boolean,
      board: Board
}
export function GamePage(params: GamePageParams) {
      if (!params.solo) {
            Controller.setQueue(new FirebaseQueue);
      } else {
            Controller.setQueue(new LocalQueue)
      }
      const game = new model.Game(params.local, params.remote, params.game, params.board);
      Provider.set(model.Game, game);
      for (const [key, deck] of params.decks) {
            game.local.decks.get(key)!.useCards(deck);
      }
      return Game({ model: game });
}