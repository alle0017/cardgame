import { Deck } from './components/deck.js';
import { Hand } from './components/hand.js';
import { remote, controller } from './lib/controller.js';
import { Stack } from './components/stack.js';

export abstract class Player {
      public readonly decks: Map<string, Deck> = new Map;
      public readonly fields: Stack[][] = [];
      public readonly zones: Map<string, Stack> = new Map;
      constructor(
            public readonly player: string,
            public readonly hand: Hand
      ) {}
}
export class LocalPlayer extends Player {
      constructor(player: string, board: Board) {
            super(
                  player, 
                  controller(new Hand(player)), 
            );
            for (const deck of board.decks) {
                  this.decks.set(deck, controller(new Deck(`${player}/${deck}`)))
            }
            for (const row of board.fields) {
                  this.fields.push(row.map(zone => controller(new Stack(`${player}/${zone}`))))
            }
            for (const zone of board.zones) {
                  this.zones.set(zone, controller(new Stack(`${player}/${zone}`)))
            }
      }
}

export class RemotePlayer extends Player {
      constructor(player: string, board: Board) {
            super(
                  player, 
                  new Hand(player), 
            );
            remote(this.hand);
            for (const deck of board.decks) {
                  const controller = new Deck(`${player}/${deck}`);
                  this.decks.set(deck, controller)
                  remote(controller)
            }
            for (const row of board.fields) {
                  this.fields.push(row.map(zone => {
                        const stack = new Stack(`${player}/${zone}`);
                        remote(stack);
                        return stack;
                  }))
            }
            for (const zone of board.zones) {
                  const stack = new Stack(`${player}/${zone}`);
                  this.zones.set(zone, stack);
                  remote(stack);
            }
            remote(this.hand);
      }
}