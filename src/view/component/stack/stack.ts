import { Component, react } from "../../lib/index.js";
import * as model from "../../../model/components/stack.js";
import { Card } from "../card.js";
import { ContextMenuTrigger } from "../context_menu/context_menu_trigger.js";
import { Options } from "../context_menu/context_menu.js";
import { column } from "../theme.js";

const { div } = Component;

export function Stack({ model, options }: { model: model.Stack, options: Options }) {
      return react(() => ContextMenuTrigger(
            div({ style: `align-items: center; justify-content: center; ${column()}` },
                  Card({ src: model.cards.value.at(0)?.img }),
            ), 
            options),
      model.cards);
}