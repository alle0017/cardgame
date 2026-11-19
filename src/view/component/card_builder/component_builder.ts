import { ComponentTree } from "./component_tree.js";
import { Component, react, } from "../../lib/index.js";
import { Exception, row, Theme } from "../theme.js";
import { Provider } from "../../lib/provider.js";
import { Reactive } from "../../../model/lib/reactive.js";
import { ComponentAttributes } from "./component_attributes.js";
import { Preview } from "./preview.js";
import { AST, CardTemplateRepository } from "../../../service/store.js";
import { icon, Icons } from "../icons.js";
import { saveAsImage } from "./image.service.js";
import { DeckService } from "../../../service/deck.js";
import { Router } from "../../lib/router.js";
import { fileAsDataUrl } from "./clipboard.service.js";

const { div, select, option, button } = Component;

export function ComponentBuilder() {
      const root = new Reactive(AST.box())
      const focus = new Reactive(root.value)
      const options: Reactive<AST[]> = new Reactive([]);
      const repo = new CardTemplateRepository();
      repo
      .getAll()
      .then(res => options.value = res)
      .catch(Exception);

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
            focus.value = root.value;
      }
      function duplicate() {
            root.value = AST.clone(root.value);
      }

      async function save() {
            const url = await saveAsImage(root.value)
            const service = Provider.of(DeckService);
            await service.createCard({ id: 0, name: root.value.name, img: url })            
      }
      document.body.addEventListener('paste', async (e) => {
            if (!e.clipboardData) {
                  return;
            }
            for (const item of e.clipboardData.items) {
                  if (item.kind !== "file" || !item.type.startsWith("image/")) {
                        continue;
                  }
                  const file = item.getAsFile();
                  if (!file) {
                        continue;
                  }
                  const url = await fileAsDataUrl(file)
                  focus.value.image = url;
                  root.dispatch();
                  return;
            }
      })
      return div({ style: row() },
            div({ class: 'pane', style: 'position: fixed; top: 0; justify-content: start; align-items: start; padding: 10px; left: 0; background-color: var(--bg); z-index: 10000; width: 20%;' },
                  div({ style: row() },
                        button({ class: 'icon-btn', click: () => Provider.of(Router).goto('/') }, 
                              icon({ }, Icons.Back)
                        ),
                        react([options], () =>
                              select({ change: load, style: `width: 160px;` },
                                    option({ value: "" }, "New..."),
                                    ...options.value.map(a => 
                                          option({ value: a.name }, a.name)
                                    )
                              )
                        ),
                        button({ class: 'icon-btn', click: duplicate }, 
                              icon({ }, Icons.Copy)
                        ),
                        button({ class: 'icon-btn', click: save }, 
                              icon({ }, Icons.SaveCollection)
                        )
                  ),
                  react([root], () => 
                        ComponentTree({ updated: () => root.dispatch(), selected: ast => focus.value = ast  },
                              root.value
                        )
                  )
            ),
            div({ style: `overflow: scroll; width: calc(100vw - 600px); display: flex; justify-content: center; align-items: center;`}, 
                  react([root], () => 
                        Preview(root.value)
                  )
            ),
            div({  class: 'pane', style: 'position: fixed; top: 0; right: 0; background-color: var(--bg); justify-content: start;  align-items: start; padding: 10px; width: 20%;' },
                  react([focus], () => 
                        ComponentAttributes({ save: () => root.dispatch() },
                              focus.value
                        )
                  )
            ),
      )
}