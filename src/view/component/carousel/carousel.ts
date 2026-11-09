import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react } from "../../lib/index.js";
import { column, row } from "../theme.js";

const { div, button } = Component;

export function Carousel({}, ...children: HTMLElement[]) {
      let state = new Reactive(0);
      return div({ style: column() },
            react([state], () => 
                  children[state.value]
            ),
            div({ style: `justify-contents: center; ${row()}` },
                  button({ 
                        click: () => {
                              state.value = state.value == 0 ? children.length - 1: state.value - 1
                        } 
                  }, 'Previous'),
                  button({ 
                        click: () => {
                              state.value = state.value == children.length - 1 ? 0: state.value + 1
                        } 
                  }, 'Next')
            )
      )
}