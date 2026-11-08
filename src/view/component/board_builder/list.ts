import { bind, Component, react, } from "../../lib/index.js"
import { column, row } from "../theme.js";
import { Reactive } from '../../../model/lib/reactive.js';

const { div, button, input, span } = Component
const BTN = 'width: 36px; height: 36px;'
export function Item({ deleted, value }: { deleted: () => void, value: string }) {
      return div({ style: row() },
            span({ style: `width: 350px; height: 36px; justify-contents: center; ${column()}`},
                  value,
            ),
            button({ click: deleted, style: BTN }, 
                  '-'
            ),
      )
}
export function List({ save, value }: { save: (items: Set<string>) => void, value: string[] }) {
      const items = new Reactive(new Set(value));
      const name = bind();
      function click() {
            if (!name.value.replaceAll(' ', '')) {
                  return;
            }
            items.value.add(name.value.replaceAll(' ', ''));
            items.dispatch();
            save(items.value)
      }
      return div({ style: column() },
            div({ style: row() },
                  input({ ...name.binding, placeholder: 'add name', style: 'width: 200px;' }),
                  button({ style: BTN, click }, 
                        '+'
                  )
            ),
            react([items], () => 
                  div({ style: `height: 300px; overflow-y: scroll; ${column()}` },
                        ...items.value.values().map(value => 
                              Item({ 
                                    value, 
                                    deleted() { 
                                          items.value.delete(value); 
                                          items.dispatch();
                                          save(items.value)
                                    } 
                              })
                        )
                  )
            )
      )
}