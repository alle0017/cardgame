import { Deck } from './components/deck.js';
import { Hand } from './components/hand.js';
import { remote, controller } from './lib/controller.js';
import { Stack } from './components/stack.js';

export abstract class Player {
      
      constructor(
            public readonly player: string,
            public readonly deck: Deck,
            public readonly hand: Hand,
            public readonly graveyard: Stack,
            public readonly zones: Stack[]
      ) {}
}
export class LocalPlayer extends Player {
      constructor(player: string) {
            super(
                  player, 
                  controller(new Deck(player)), 
                  controller(new Hand(player)), 
                  controller(new Stack(player)), 
                  Array.from({ length: 3 }, (_, i) => controller(new Stack(`${player}/zone${i}`)))
            );
      }
}

export class RemotePlayer extends Player {
      constructor(player: string) {
            super(
                  player, 
                  new Deck(player), 
                  new Hand(player), 
                  new Stack(player),
                  Array.from({ length: 3 }, (_, i) => new Stack(`${player}/zone${i}`))
            );
            remote(this.deck);
            remote(this.hand);
            remote(this.graveyard);
            this.zones.forEach(remote);
      }
}