import * as model from "../../../model/player.js";
import { Player } from "./player.js";

export function RemotePlayer({ model }: { model: model.RemotePlayer }) {
      return Player({ model, graveyard: {}, deck: {}, hand: {}, zones: {}, mana: {} })
}