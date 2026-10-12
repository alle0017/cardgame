import { Component, react } from "../../lib/index.js";
import * as model from "../../../model/components/deck.js";
import { Card } from "../card.js";
import { ContextMenuTrigger } from "../context_menu/context_menu_trigger.js";
import { Options } from "../context_menu/context_menu.js";
import { column } from "../theme.js";

const { div } = Component;

export function Deck({ model, options }: { model: model.Deck, options: Options }) {
      return react(() => ContextMenuTrigger(
            div({ style: `align-items: center; justify-content: center; ${column()}` },
                  Card({}),
                  `${model.cards.value.length}`
            ), 
            options),
      model.cards);
}