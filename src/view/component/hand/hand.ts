import { Component, react } from "../../lib/index.js";
import * as model from "../../../model/components/hand.js";
import { Card, CardState } from "../card.js";
import { Provider } from "../../lib/provider.js";
import { row } from "../theme.js";

const { div } = Component;

export function Hand({ model, onCardClicked }: { model: model.Hand, onCardClicked?: (card: Card) => void }) {
      return react(() =>
            div({ style: `align-items: center; justify-content: center; overflow-x: scroll; width: ${Provider.of(CardState).width * 5}px; ${row()}` },
                  ...model.cards.value.map(card => 
                        Card({ src: card.img, click: () => onCardClicked?.(card) })
                  )
            ),
      model.cards);
}