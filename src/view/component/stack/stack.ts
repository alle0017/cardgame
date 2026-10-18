import { Component, react } from "../../lib/index.js";
import * as model from "../../../model/components/stack.js";
import { Card } from "../card.js";
import { ContextMenuTrigger } from "../context_menu/context_menu_trigger.js";
import { Options } from "../context_menu/context_menu.js";
import { column } from "../theme.js";

const { div } = Component;

export function Stack({ model, options, click }: { model: model.Stack, options?: Options, click?: () => void }) {
      options ??= {};

      return react([model.cards], () => ContextMenuTrigger({ options, ctx: { model } },
                  div({ style: `align-items: center; justify-content: center; ${column()}` },
                        Card({ src: model.cards.value.at(0)?.img, click }),
                  ), 
            ),
      );
}