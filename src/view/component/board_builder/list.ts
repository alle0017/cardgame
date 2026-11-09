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
export function List({ save, value }: { save: (items: string[]) => void, value: string[] }) {
      const items = new Reactive(value);
      const name = bind();
      function click() {
            const value = name.value.replaceAll(' ', '');
            if (!value) {
                  return;
            }
            if (items.value.includes(value)) {
                  return;
            }
            items.value.push(name.value.replaceAll(' ', ''));
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
                                          items.value = items.value.filter(v => v != value)
                                          save(items.value)
                                    } 
                              })
                        )
                  )
            )
      )
}