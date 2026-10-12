import { CardModel, CardRepository, DeckModel, DeckRepository } from "./store.js";

export class DeckService {
      private readonly cards: CardRepository = new CardRepository();
      private readonly decks: DeckRepository = new DeckRepository();

      public getAllCards() {
            return this.cards.getAll()
      }

      public getAllDecks() {
            return this.decks.getAll();
      }

      public createDeck(name: string, cards: Card[]) {
            const model = new DeckModel
            model.name = name;
            for (const card of cards) {
                  model.cards.push(card.img);
            }
            return this.decks.insertOrUpdate(model);
      }

      public createCard(cards: Card) {
            const model = new CardModel();
            model.name = cards.name;
            model.img = cards.img;
      }

      public async getDeck(model: DeckModel) {
            const promises = model.cards.map(async (card, id) => {
                  const model = await this.cards.get(card);
                  return { ...model, id }
            })
            const cards = await Promise.all(promises)
            return cards ?? [];
      }
}