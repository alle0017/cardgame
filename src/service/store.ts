import { key, table, Entity, Repository, schema, Datasource } from "../model/lib/local/store/index.js";



@key('img')
@table('cards')
export class CardModel extends Entity {
      public id: number = 0;
      public name: string = ''
      public img: string = '';
}

@key('name')
@table('decks')
export class DeckModel extends Entity {
      public name: string = '';
      public cards: string[] = [];
}

@schema('game', 1, { CardModel, DeckModel })
class Database extends Datasource {}

export class CardRepository extends Repository<CardModel> {
      constructor() {
            super(new Database, CardModel)
      }
}

export class DeckRepository extends Repository<DeckModel> {
      constructor() {
            super(new Database, DeckModel)
      }
}
