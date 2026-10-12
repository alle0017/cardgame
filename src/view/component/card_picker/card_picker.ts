import { Component } from "../../lib/index.js"
import { Provider } from "../../lib/provider.js";
import * as view from "../card.js";
import { column, Theme } from "../theme.js";

const { div } = Component

export function CardPicker(cards: Card[]): Promise<Card> {
      return new Promise((resolve, reject) => {
            const size = Provider.of(view.CardState);
            const theme = Provider.of(Theme);
            const select = (card: Card) => {
                  resolve(card);
                  menu.remove();
            }
            const menu = div({ style: `z-index: 10000; width: 80vw; height: ${size.height}px; position: fixed; top: calc(50% - ${size.height}px/2); left: 10vw; background-color: ${theme.secondary}` },
                  div({ style: `width: 100%; align-items: end; height: 32px; ${column()}` },
                        div({ style: `width: 32px; height: 32px; border-radius: 7px; font-size: 28px; text-align: center; background-color: ${theme.primary}`, click: reject },
                              'x'
                        )
                  ),
                  ...cards.map(card =>
                        div({ click: () => select(card) }, 
                              view.Card({ src: card.img })
                        )
                  )
            )
            document.body.append(menu);
      })
}