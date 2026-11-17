import { ComponentTree } from "./component_tree.js";
import { Component, react, } from "../../lib/index.js";
import { row, Theme } from "../theme.js";
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
            div({ style: `overflow-y: scroll; height: 99vh; width: 300px; border-right: 2px solid ${Provider.of(Theme).primary}`},
                  div({ style: `align-items: center; ${row()}` },
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