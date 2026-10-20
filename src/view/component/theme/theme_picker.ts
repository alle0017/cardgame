import { Component, } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { column, row, Theme } from "../theme.js";


const { div, input, button, span, h2 } = Component;

function ColorPicker({ color, label, onInput }: { color: string, label: string, onInput: (e: Event) => void }) {
      return div({ style: `align-items: center; justify-content: start; width: 200px; ${row()}` },
            input({ 
                  type: 'color', 
                  value: color, 
                  style: 'height: 32px; width: 32px; padding: 0px;',
                  input: onInput
            }),
            span({ }, label)
      )
}
export function ThemePicker() {
      const theme = Provider.of(Theme)
      const colors = theme.colors();
      const half = Math.ceil(colors.length/2);
      const upper = colors.slice(0, half);
      const lower = colors.slice(half);
      
      return div({ style: column() },
            div({ style: row() },
                  ...upper
                  .map(prop => ColorPicker({ 
                              color: theme[prop] as string, 
                              label: prop, 
                              //@ts-expect-error
                              onInput: e => (theme[prop] = (e.target as HTMLInputElement).value) 
                        })
                  )
            ),
            div({ style: row() },
                  ...lower
                  .map(prop => ColorPicker({ 
                              color: theme[prop] as string, 
                              label: prop, 
                              //@ts-expect-error
                              onInput: e => (theme[prop] = (e.target as HTMLInputElement).value) 
                        })
                  )
            ),
            button({ click: () => theme.update() }, 
                  'Save'
            )
      )
}