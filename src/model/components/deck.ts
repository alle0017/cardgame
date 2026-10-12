import { dispatch } from '../lib/controller.js';
import { Stack } from './stack.js';

export class Deck extends Stack implements Topic {
      constructor(player: string) {
            super(`deck/${player}`);
      }

      @dispatch
      public useCards(cards: Card[]) {
            this.cards.value = cards;
      }

      public draw() {
            return this.pop();
      }

      public shuffle() {
            const cards = this.cards.value.toSorted(() => Math.random() - Math.random());
            this.useCards(cards);
      }
}