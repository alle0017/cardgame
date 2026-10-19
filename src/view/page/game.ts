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
      deck: Card[],
      mana: Card[],
      solo?: boolean
}
export function GamePage(params: GamePageParams) {
      if (!params.solo) {
            Controller.setQueue(new FirebaseQueue);
      } else {
            Controller.setQueue(new LocalQueue)
      }
      const game = new model.Game(params.local, params.remote, params.game);
      Provider.set(model.Game, game);
      game.local.deck.useCards(params.deck);
      game.local.mana.useCards(params.mana);
      return Game({ model: game });
}