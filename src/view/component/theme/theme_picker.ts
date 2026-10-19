import { Component, } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { column, Theme } from "../theme.js";


const { div, input, button } = Component;

export function ThemePicker() {
      const theme = Provider.of(Theme)
      return div({ style: column() },
            ...theme
            .colors()
            .map(prop => 
                  input({ 
                        type: 'color', 
                        value: theme[prop] as string, 
                        style: 'height: 100px; width: 100px;',
                        //@ts-ignore
                        input: e => (theme[prop] = (e.target as HTMLInputElement).value) 
                  })
            ),
            button({ click: () => theme.update() }, 
                  'Save'
            )
      )
}