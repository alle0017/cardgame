import * as model from "../../../model/player.js";
import { Provider } from "../../lib/provider.js";
import { Options } from "../context_menu/context_menu.js";
import { Player } from "./player.js";
import { Game } from "../../../model/game.js";
import { CardPicker } from "../card_picker/card_picker.js";
import { ZoneSelector } from "./zone_selector.js";
import { Stack } from "../../../model/components/stack.js";

const GraveyardOptions: Options = {
      async view() {
            const game = Provider.of(Game);
            await CardPicker(game.local.graveyard.cards.value);
      },
      async 'add to hand'() {
            const game = Provider.of(Game);
            if (game.local.graveyard.cards.value.length <= 0) {
                  return;
            }
            const card = await CardPicker(game.local.graveyard.cards.value);
            game.local.graveyard.remove(card);
            game.local.hand.add(card);
      },
      exit: undefined
}
const DeckOptions: Options = {
      async view() {
            const game = Provider.of(Game);
            await CardPicker(game.local.deck.cards.value);
      },
      async 'add to hand'() {
            const game = Provider.of(Game);
            const card = await CardPicker(game.local.deck.cards.value);
            game.local.deck.remove(card);
            game.local.hand.add(card);
      },
      draw() {
            const game = Provider.of(Game);
            if (game.local.deck.cards.value.length <= 0) {
                  return;
            }
            const card = game.local.deck.draw()!;
            game.local.hand.add(card);
      },
      mill() {
            const game = Provider.of(Game);
            if (game.local.deck.cards.value.length <= 0) {
                  return;
            }
            const card = game.local.deck.draw()!;
            game.local.graveyard.add(card);
      },
      shuffle() {
            const game = Provider.of(Game);
            game.local.deck.shuffle();
      },
      exit: undefined
}
const ManaOptions: Options = {
      async view() {
            const game = Provider.of(Game);
            await CardPicker(game.local.mana.cards.value);
      },
      async play() {
            const game = Provider.of(Game);
            if (game.local.mana.cards.value.length <= 0) {
                  return;
            }
            const zone = await Provider.of(ZoneSelector).wait();
            const card = game.local.mana.draw()!;
            zone.add(card);
      },
      shuffle() {
            const game = Provider.of(Game);
            game.local.mana.shuffle();
      },
      exit: undefined
}

const HandOptions: Options = {
      'play into stack'(arg: Record<string, unknown>) {
            const card = arg['card'] as Card;
            const game = Provider.of(Game);
            game.local.hand.remove(card);
            game.stack.add(card);
      },
      async 'play into the field'(arg: Record<string, unknown>) {
            const card = arg['card'] as Card;
            const game = Provider.of(Game);
            const zone = await Provider.of(ZoneSelector).wait();
            game.local.hand.remove(card);
            zone.add(card);
      },
      exit: undefined
}
const FieldOptions: Options = {
      async view(arg: Record<string, unknown>) {
            const zone = arg['model'] as Stack;
            await CardPicker(zone.cards.value);
      },
      async 'add to mana deck'(arg: Record<string, unknown>) {
            const zone = arg['model'] as Stack;
            const game = Provider.of(Game);
            if (zone.cards.value.length <= 0) {
                  return;
            }
            const card = await CardPicker(zone.cards.value);
            zone.remove(card);
            game.local.mana.bottom(card);
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
      async 'send to graveyard'(arg: Record<string, unknown>) {
            const zone = arg['model'] as Stack;
            const game = Provider.of(Game);
            if (zone.cards.value.length <= 0) {
                  return;
            }
            const card = await CardPicker(zone.cards.value);
            zone.remove(card);
            game.local.graveyard.add(card);
      },
      exit: undefined
}

export function LocalPlayer({ model }: { model: model.LocalPlayer }) {
      return Player({ 
            model, 
            graveyard: GraveyardOptions, 
            hand: HandOptions, 
            deck: DeckOptions, 
            zones: FieldOptions, 
            zoneClicked: zone => Provider.of(ZoneSelector).select(zone),
            mana: ManaOptions,
            reverse: false
      })
}