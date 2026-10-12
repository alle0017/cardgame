import * as model from "../../../model/game.js";
import { Component } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { CardPicker } from "../card_picker/card_picker.js";
import { Options } from "../context_menu/context_menu.js";
import { LocalPlayer } from "../player/local_player.js";
import { RemotePlayer } from "../player/remote_player.js";
import { Stack } from "../stack/stack.js";
import { column } from "../theme.js";

const { div } = Component;

const StackOptions: Options = {
      async view() {
            const game = Provider.of(model.Game);
            await CardPicker(game.stack.cards.value);
      },
      'send to graveyard'() {
            const game = Provider.of(model.Game);
            if (game.stack.cards.value.length <= 0) {
                  return;
            }
            const card = game.stack.pop();
            game.local.graveyard.add(card!);
      },
      exit: undefined
}
export function Game({ model }: { model: model.Game }) {
      return div({ style: `align-items: center; ${column('0px')}` },
            RemotePlayer({ model: model.remote }),
            Stack({ model: model.stack, options: StackOptions }),
            LocalPlayer({ model: model.local })
      )
}