import * as model from "../../../model/player.js";
import { Provider } from "../../lib/provider.js";
import { Options } from "../context_menu/context_menu.js";
import { Player } from "./player.js";
import { Game } from "../../../model/game.js";
import { CardPicker } from "../card_picker/card_picker.js";

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
            game.local.hand.add(card);
      },
      exit: undefined
}
const DeckOptions: Options = {
      async view() {
            const game = Provider.of(Game);
            await CardPicker(game.local.deck.cards.value);
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
function onCardPlayed(card: Card) {
      const game = Provider.of(Game);
      game.local.hand.remove(card);
      game.stack.add(card);
}

export function LocalPlayer({ model }: { model: model.LocalPlayer }) {
      return Player({ model, graveyard: GraveyardOptions, hand: onCardPlayed, deck: DeckOptions })
}