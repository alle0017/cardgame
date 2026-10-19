import * as model from "../../../model/player.js";
import * as stack from "../../../model/components/stack.js";
import { Component } from "../../lib/index.js";
import { Deck } from "../deck/deck.js";
import { Hand } from "../hand/hand.js";
import { Stack } from "../stack/stack.js";
import { Options } from '../context_menu/context_menu';
import { column, row } from "../theme.js";

const { div } = Component;

type Args = { 
      model: model.Player, 
      graveyard: Options, 
      deck: Options 
      mana: Options 
      hand: Options, 
      zones: Options
      reverse: boolean
      zoneClicked?: (model: stack.Stack) => void, 
}
export function Player({ model, graveyard, hand, deck, mana, zones, zoneClicked, reverse }: Args) {
      return div({ style: `${row()}` },
            div({ style: column('20px', reverse) },
                  div({ style: `align-items: center; justify-content: center; ${row()}` },
                        ...model.zones.map(zone => 
                              Stack({ model: zone, click: () => zoneClicked?.(zone), options: zones })
                        )
                  ),
                  Hand({ model: model.hand, options: hand }),
            ),
            div({ style: column('20px', reverse) },
                  Stack({ model: model.graveyard, options: graveyard }),
                  div({ style: row() },
                        Deck({ model: model.deck, options: deck }),
                        Deck({ model: model.mana, options: mana }),
                  )
            ),
      )
}