import { ComponentTree } from "./component_tree.js";
import { Component, react, style, } from "../../lib/index.js";
import { column, row, Theme } from "../theme.js";
import { Provider } from "../../lib/provider.js";
import { Reactive } from "../../../model/lib/reactive.js";
import { ComponentAttributes } from "./component_attributes.js";
import { Preview } from "./preview.js";
import { AST, CardTemplateRepository } from "../../../service/store.js";

const { div, input, select, option } = Component;

export function ComponentBuilder() {
      const root = new Reactive(AST.box())
      const focus = new Reactive(root.value)
      const options: Reactive<AST[]> = new Reactive([]);
      const repo = new CardTemplateRepository();
      repo
      .getAll()
      .then(res => options.value = res)
      .catch(console.error);

      root.subscribe(async () => {
            await repo.insertOrUpdate(root.value);
      })
      function load(e: Event) {
            const target = e.target as HTMLSelectElement;
            const res = options.value.find(v => target.value == v.name);

            if (res) {
                  root.value = res;
            } else {
                  root.value = AST.box();
            }
      }
      return div({ style: row() },
            div({ style: `overflow-y: scroll; height: 99vh; width: 300px; border-right: 2px solid ${Provider.of(Theme).primary}`},
                  react([options], () =>
                        select({ change: load, style: `width: 200px;` },
                              option({ value: "" }, "New..."),
                              ...options.value.map(a => 
                                    option({ value: a.name }, a.name)
                              )
                        )
                  ),
                  react([root], () => 
                        ComponentTree({ updated: () => root.dispatch(), selected: ast => focus.value = ast  },
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