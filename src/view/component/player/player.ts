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
      deck?: (id: string) => Options 
      hand: Options, 
      zone?: (id: string) => Options,
      field?: (model: model.Player) => Options,
      reverse: boolean
      zoneClicked?: (model: stack.Stack) => void, 
}
export function Player({ model, hand, deck, field, zone, zoneClicked, reverse }: Args) {
      return div({ style: `${row()}` },
            div({ style: column('20px', reverse) },
                  div({ style: column() },
                        ...model.fields.map(line => 
                              div({ style:  `align-items: center; justify-content: center; ${row()}` },
                                    ...line.map(zone =>
                                          Stack({ model: zone, click: () => zoneClicked?.(zone), options: field?.(model) ?? {} })
                                    )
                              )
                        )
                  ),
                  Hand({ model: model.hand, options: hand, hide: reverse }),
            ),
            div({ style: column('20px', reverse) },
                  div({ style: row() },
                        ...model.zones.entries().map(([key, model]) => 
                              Stack({ model, options: zone?.(key) ?? {} })
                        )
                  ),
                  div({ style: row() },
                        ...model.decks.entries().map(([key, model]) => 
                              Deck({ model, options: deck?.(key) ?? {} }),
                        )
                  )
            ),
      )
}