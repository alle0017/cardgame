import { Game } from "../component/game/game.js";
import * as model from "../../model/game.js"
import { Provider } from "../lib/provider.js";

export interface GamePageParams {
      local: string,
      remote: string,
      game: string
}
export function GamePage(params: GamePageParams) {
      const game = new model.Game(params.local, params.remote, params.game);
      Provider.set(model.Game, game);
      return Game({ model: game });
}