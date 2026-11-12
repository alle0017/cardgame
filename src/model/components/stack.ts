import { dispatch } from '../lib/controller.js';
import { Reactive } from '../lib/reactive.js';

export class Stack implements Topic {
      public readonly topic: string;

      public readonly cards: Reactive<Card[]> = new Reactive([]);


      constructor(player: string) {
            this.topic = `stack/${player}/`
      }
      @dispatch
      public clear() {
            this.cards.value = [];
            this.cards.dispatch();
      }

      @dispatch
      public add(card: Card) {
            this.cards.value.unshift(card);
            this.cards.dispatch();
      }
      @dispatch
      public addToBottom(card: Card) {
            this.cards.value.push(card);
            this.cards.dispatch();
      }
      @dispatch
      public remove(card: Card) {
            for (let i = 0; i < this.cards.value.length; i++) {
                  const c = this.cards.value[i];
                  if (c.id != card.id) {
                        continue;
                  }
                  this.cards.value.splice(i, 1);
                  this.cards.dispatch();
                  break;
            }
      }

      public pop() {
            const card = this.cards.value[0];

            if (!card) {
                  return;
            }
            this.remove(card);
            return card;
      }
}