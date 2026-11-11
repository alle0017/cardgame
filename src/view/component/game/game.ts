import * as model from "../../../model/game.js";
import { Component, } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { CardPicker } from "../card_picker/card_picker.js";
import { Options } from "../context_menu/context_menu.js";
import { LocalPlayer } from "../player/local_player.js";
import { RemotePlayer } from "../player/remote_player.js";
import { Stack } from "../stack/stack.js";
import { column } from "../theme.js";

const { div } = Component;

function StackOptions(id: string): Options {
      const opts: Options = {};

      for (const zone of Provider.of(model.Game).board.zones) {
            opts[`put into ${zone}`] = () => {
                  const game = Provider.of(model.Game);
                  if (game.shared.get(id)!.controller.cards.value.length <= 0) {
                        return;
                  }
                  const card = game.shared.get(id)!.controller.pop();
                  game.local.zones.get(zone)!.add(card!);
            }
      }
      return {
            async view() {
                  const game = Provider.of(model.Game);
                  await CardPicker(game.shared.get(id)!.controller.cards.value);
            },
            ...opts,
            exit: undefined
      }
} 
export function Game({ model }: { model: model.Game }) {
      return div({ style: `width: 90vw; align-items: center; ${column('10px')}` },
            RemotePlayer({ model: model.remote }),
            div({ style: column() },
                  ...model.shared.entries().map(([id, model]) => 
                        Stack({ model: model.controller, options: StackOptions(id) }),
                  )
            
            ),
            LocalPlayer({ model: model.local })
      )
}