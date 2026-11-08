import * as model from "../../../model/player.js";
import { Provider } from "../../lib/provider.js";
import { Options } from "../context_menu/context_menu.js";
import { Player } from "./player.js";
import { Game } from "../../../model/game.js";
import { CardPicker } from "../card_picker/card_picker.js";
import { ZoneSelector } from "./zone_selector.js";
import { Stack } from "../../../model/components/stack.js";

export function DeckOptions(id: string): Options {
      return {
            async view() {
                  const game = Provider.of(Game);
                  await CardPicker(game.local.decks.get(id)!.cards.value);
            },
            async 'add to hand'() {
                  const game = Provider.of(Game);
                  const card = await CardPicker(game.local.decks.get(id)!.cards.value);
                  game.local.decks.get(id)!.remove(card);
                  game.local.hand.add(card);
            },
            draw() {
                  const game = Provider.of(Game);
                  if (game.local.decks.get(id)!.cards.value.length <= 0) {
                        return;
                  }
                  const card = game.local.decks.get(id)!.draw()!;
                  game.local.hand.add(card);
            },
            shuffle() {
                  const game = Provider.of(Game);
                  game.local.decks.get(id)!.shuffle();
            },
            exit: undefined
      }
}
export function ZoneOptions(id: string): Options {
      return {
            async view() {
                  const game = Provider.of(Game);
                  await CardPicker(game.local.zones.get(id)!.cards.value);
            },
            async 'add to hand'() {
                  const game = Provider.of(Game);
                  if (game.local.zones.get(id)!.cards.value.length <= 0) {
                        return;
                  }
                  const card = await CardPicker(game.local.zones.get(id)!.cards.value);
                  game.local.zones.get(id)!.remove(card);
                  game.local.hand.add(card);
            },
            exit: undefined
      }
}

function HandOptions(): Options {
      const opts: Options = {}
      for (const shared of Provider.of(Game).shared.keys()) {
            opts[`add to ${shared}`] = (arg: Record<string, unknown>) => {
                  const card = arg['card'] as Card;
                  const game = Provider.of(Game);
                  game.local.hand.remove(card);
                  game.shared.get(shared)?.controller.add(card);
            }
      }
      return {
            ...opts,
            async 'play into the field'(arg: Record<string, unknown>) {
                  const card = arg['card'] as Card;
                  const game = Provider.of(Game);
                  const zone = await Provider.of(ZoneSelector).wait();
                  game.local.hand.remove(card);
                  zone.add(card);
            },
            exit: undefined
      }
}
function FieldOptions(model: model.Player): Options {
      const opts: Options = {}

      for (const deck of model.decks.keys()) {
            opts[`add to ${deck} deck`] = async (arg: Record<string, unknown>) => {
                  const zone = arg['model'] as Stack;
                  const game = Provider.of(Game);
                  if (zone.cards.value.length <= 0) {
                        return;
                  }
                  const card = await CardPicker(zone.cards.value);
                  zone.remove(card);
                  game.local.decks.get(deck)?.bottom(card);
            } 
      }
      for (const zoneName of model.zones.keys()) {
            opts[`put into ${zoneName}`] = async (arg: Record<string, unknown>) => {
                  const zone = arg['model'] as Stack;
                  const game = Provider.of(Game);
                  if (zone.cards.value.length <= 0) {
                        return;
                  }
                  const card = await CardPicker(zone.cards.value);
                  zone.remove(card);
                  game.local.zones.get(zoneName)?.add(card);
            };
      }
      return {
            async view(arg: Record<string, unknown>) {
                  const zone = arg['model'] as Stack;
                  await CardPicker(zone.cards.value);
            },
            async 'add to hand'(arg: Record<string, unknown>) {
                  const zone = arg['model'] as Stack;
                  const game = Provider.of(Game);
                  if (zone.cards.value.length <= 0) {
                        return;
                  }
                  const card = await CardPicker(zone.cards.value);
                  zone.remove(card);
                  game.local.hand.add(card);
            },
            ...opts,
            exit: undefined
      }
}


export function LocalPlayer({ model }: { model: model.LocalPlayer }) {
      return Player({ 
            model, 
            hand: HandOptions(), 
            deck: DeckOptions, 
            field: FieldOptions, 
            zone: ZoneOptions,
            zoneClicked: zone => Provider.of(ZoneSelector).select(zone),
            reverse: false
      })
}