import { Reactive } from "../../../model/lib/reactive.js";
import { AST } from "../../../service/store.js";
import { Component, react } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { icon, Icons } from "../icons.js";
import { column, row, Theme } from "../theme.js";

const { div, button } = Component;


type Props = {
      up?(): void
      down?(): void
      updated(): void
      selected(ast: AST): void
      deleted?(): void
}
export function ComponentTree({ up, down, updated, selected, deleted }: Props, child: AST): HTMLElement {

      const signal = new Reactive(true);

      function createNew() {
            child.children.push(AST.box());
            signal.dispatch();
            updated();
      }
      function moveUp(node: AST, i: number){
            const tmp = child.children[i - 1]
            child.children[i - 1] = node;
            child.children[i] = tmp;
            signal.dispatch();
            updated();
      }
      function moveDown(node: AST, i: number){
            const tmp = child.children[i + 1]
            child.children[i + 1] = node;
            child.children[i] = tmp;
            signal.dispatch();
            updated();
      }
      function select() {
            signal.value = !signal.value;
            selected(child);
      }
      function deleteChild(i: number) {
            child.children.splice(i, 1)
            updated();
      }
      return div({ style: column() },
            div({}, 
                  div({ class: 'icon-btn-bar' },
                        div({ style: 'width: 100px;', click: select },
                              child.name,
                        ),
                        button({ click: createNew, class: 'icon-btn' }, '+'),
                        up ? button({ click: up, class: 'icon-btn' }, '↑'): '',
                        down ? button({ click: down, class: 'icon-btn' }, '↓'): '',
                        deleted ? button({ click: deleted, class: 'icon-btn' }, 
                              icon({}, 
                                    Icons.Trash
                              )
                        ): ''
                  )
            ),
            react([signal], () =>
                  div({ style: `padding-left: 5px; border-left: 2px solid ${Provider.of(Theme).primary}; ${column()}` },
                        ...child.children.filter(() => signal.value).map((node, i) => 
                              ComponentTree({ 
                                    deleted: () => deleteChild(i),
                                    selected,
                                    updated,
                                    up:  i == 0 ?  undefined: () => moveUp(node, i),
                                    down:  i == child.children.length - 1 ?  undefined: () => moveDown(node, i)
                              }, 
                                    node
                              )
                        )
                  )
            )
      )
}