import { key, table, Entity, Repository, schema, Datasource } from "../model/lib/local/store/index.js";

@key('_auto')
@table('card_template')
export class AST extends Entity {
      public static box() {
            const b = new AST;
            b.component = 'div';
            b.name = 'div';
            return b;
      }
      public name: string = ''
      public css: string = ''
      public readonly children: AST[] = []
      public text: string = ''
      public component: string = ''
      public image: string = ''

      public clone() {
            const root = new AST;

            root.component = this.component;
            root.name = this.name;
            root.css = this.css;
            root.text = this.text;
            root.image = this.image;
            root.children.push(...this.children.map(c => c.clone()));
            return root; 
      }
}

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

@schema('game', 2, { CardModel, DeckModel, AST })
class Database extends Datasource {}

export class CardRepository extends Repository<CardModel> {
      constructor() {
            super(new Database, CardModel)
      }
}

export class CardTemplateRepository extends Repository<AST> {
      constructor() {
            super(new Database, AST)
      }
}

export class DeckRepository extends Repository<DeckModel> {
      constructor() {
            super(new Database, DeckModel)
      }
}
