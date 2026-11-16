import { ComponentTree } from "./component_tree.js";
import { Component, react } from "../../lib/index.js";
import { row, Theme } from "../theme.js";
import { Provider } from "../../lib/provider.js";
import { Reactive } from "../../../model/lib/reactive.js";
import { ComponentAttributes } from "./component_attributes.js";
import { Preview } from "./preview.js";
import { AST } from "../../../service/store.js";

const { div } = Component;

export function ComponentBuilder() {
      const root = new Reactive(AST.box())
      const focus = new Reactive(root.value)
      return div({ style: row() },
            div({ style: `overflow-y: scroll; height: 99vh; width: 300px; border-right: 2px solid ${Provider.of(Theme).primary}`},
                  react([root], () => 
                        ComponentTree({ updated: () => console.log(root), selected: ast => focus.value = ast  },
                              root.value
                        )
                  )
            ),
            div({ style: `width: calc(90vw - 305px - 405px); overflow: scroll;`}, 
                  react([root], () => 
                        Preview(root.value)
                  )
            ),
            div({ style: `overflow-y: scroll; height: 99vh; width: 400px; padding: 20px; border-left: 2px solid ${Provider.of(Theme).primary}`},
                  react([focus], () => 
                        ComponentAttributes({ save: () => root.dispatch() },
                              focus.value
                        )
                  )
            ),
      )
}