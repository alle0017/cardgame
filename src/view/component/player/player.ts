import * as model from "../../../model/player.js";
import { Component } from "../../lib/index.js";
import { Deck } from "../deck/deck.js";
import { Hand } from "../hand/hand.js";
import { Stack } from "../stack/stack.js";
import { Options } from '../context_menu/context_menu';
import { column, row } from "../theme.js";
const { div } = Component;

export function Player({ model, graveyard, hand, deck }: { model: model.Player, graveyard: Options, hand?: (card: Card) => void, deck: Options }) {
      return div({ style: `align-items: end; ${column('20px')}` },
            Stack({ model: model.graveyard, options: graveyard }),
            div({ style: row() },
                  Hand({ model: model.hand, onCardClicked: hand }),
                  Deck({ model: model.deck, options: deck }),
            )
      )
}