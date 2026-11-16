import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { column, row, Theme } from "../theme.js";

const { div, button } = Component;

export type AST = {
      name: string,
      css: string,
      children: AST[],
      text: string,
      component: string,
      image: string
}
type Props = {
      up?(): void
      down?(): void
      updated(): void
      selected(ast: AST): void
}

export const Box = (): AST => ({ name: 'div', css: '', children: [], text: '', component: 'div', image: '' })

export function ComponentTree({ up, down, updated, selected }: Props, child: AST): HTMLElement {

      const signal = new Reactive(true);

      function createNew() {
            child.children.push(Box());
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
            console.log(child)
      }
      const btnStyle = `justify-contents: center; border: none; align-items: center; width: 32px; height: 32px; ${column()}`;
      return div({ style: column() },
            div({}, 
                  div({ style: `height: 32px; align-items: center; ${row()}` },
                        div({ style: 'width: 100px;', click: select },
                              child.name,
                        ),
                        button({ click: createNew, style: btnStyle }, '+'),
                        up ? button({ click: up, style: btnStyle }, '↑'): '',
                        down ? button({ click: down, style: btnStyle }, '↓'): '',
                  )
            ),
            react([signal], () =>
                  div({ style: `padding-left: 5px; border-left: 2px solid ${Provider.of(Theme).primary}; ${column()}` },
                        ...child.children.filter(() => signal.value).map((node, i) => 
                              ComponentTree({ 
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