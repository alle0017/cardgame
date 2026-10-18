import { Component, react } from "../../lib/index.js";
import * as model from "../../../model/components/hand.js";
import { Card, CardState } from "../card.js";
import { Provider } from "../../lib/provider.js";
import { row } from "../theme.js";
import { Options } from "../context_menu/context_menu.js";
import { ContextMenuTrigger } from "../context_menu/context_menu_trigger.js";

const { div } = Component;

export function Hand({ model, options }: { model: model.Hand, options: Options }) {
      return react([model.cards], () =>
            div({ style: `align-items: center; justify-content: center; overflow-x: scroll; width: ${Provider.of(CardState).width * 5}px; ${row()}` },
                  ...model.cards.value.map(card => 
                        ContextMenuTrigger({ options, ctx: { card } }, 
                              Card({ src: card.img }),
                        )
                  )
            ),
      );
}