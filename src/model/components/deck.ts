import { dispatch } from '../lib/controller.js';
import { Stack } from './stack.js';

export class Deck extends Stack implements Topic {
      constructor(player: string) {
            super(`deck/${player}`);
      }

      public useCards(cards: Card[]) {
            this.clear();
            for (const card of cards) {
                  this.add(card);
            }
      }
      
      @dispatch
      public bottom(card: Card) {
            this.cards.value.unshift(card);
            this.cards.dispatch();
      }

      public draw() {
            return this.pop();
      }


      public shuffle() {
            const cards = this.cards.value.toSorted(() => Math.random() - Math.random());
            this.useCards(cards);
      }
}