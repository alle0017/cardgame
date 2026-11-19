import { bind, Component, react, } from "../../lib/index.js"
import { column, Exception, row } from "../theme.js";
import { Reactive } from '../../../model/lib/reactive.js';
import { icon, Icons } from "../icons.js";

const { div, button, input, span } = Component
export function Item({ deleted, value }: { deleted: () => void, value: string }) {
      return div({ style: row(),  class: 'icon-btn-bar' },
            span({ style: `width: 350px; height: 36px; justify-contents: center; ${column()}`},
                  value,
            ),
            button({ click: deleted, class: 'icon-btn' }, 
                  icon({},
                        Icons.Trash
                  )
            ),
      )
}
export function List({ save, value }: { save: (items: string[]) => void, value: string[] }) {
      const items = new Reactive(value);
      const name = bind();
      function click() {
            const value = name.value.replaceAll(' ', '');
            if (!value) {
                  Exception(`Invalid name "${value}"`)
                  return;
            }
            if (items.value.includes(value)) {
                  Exception(`Cannot insert duplicate value "${value}"`)
                  return;
            }
            items.value.push(name.value.replaceAll(' ', ''));
            items.dispatch();
            save(items.value)
      }
      return div({ style: column() },
            div({ style: row() },
                  input({ ...name.binding, placeholder: 'add name', style: 'width: 200px;' }),
                  button({ class: 'icon-btn', click }, 
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