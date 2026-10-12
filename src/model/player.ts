import { Deck } from './deck.js';
import { Hand } from './hand.js';
import { remote, controller } from './lib/controller.js';
import { Stack } from './stack.js';

export abstract class Player {
      
      constructor(
            public readonly player: string,
            public readonly deck: Deck,
            public readonly hand: Hand,
            public readonly graveyard: Stack,
      ) {}
}
export class LocalPlayer extends Player {
      constructor(player: string) {
            super(player, controller(new Deck(player)), controller(new Hand(player)), controller(new Stack(player)));
      }
}

export class RemotePlayer extends Player {
      constructor(player: string) {
            super(player, new Deck(player), new Hand(player), new Stack(player));
            remote(this.deck);
            remote(this.hand);
            remote(this.graveyard);
      }
}