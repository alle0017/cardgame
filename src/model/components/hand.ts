import { dispatch } from '../lib/controller.js';
import { Reactive } from '../lib/reactive.js';

export class Hand implements Topic {
      public readonly topic: string;

      public readonly cards: Reactive<Card[]> = new Reactive([]);


      constructor(player: string) {
            this.topic = `hand/${player}/`
      }

      @dispatch
      public add(card: Card) {
            this.cards.value.push(card);
            this.cards.dispatch();
      }

      @dispatch
      public remove(card: Card) {
            this.cards.value = this.cards.value.filter(c => c.id != card.id);
      }
}