import { Component } from "../../lib/index.js";
import * as view from "../card.js";
import { column } from "../theme.js";

const { div } = Component;

export function Table({ cards, click }: { cards: Card[], click?: (card: Card, index: number) => void }) {
      const rows = [];

      for (let i = 0; i <cards.length; i += 10) {
            rows.push(
                  div({ style: `display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px;` },
                        ...Array.from({ length: 10 }, (_, j) => {
                              const index = i + j;
                              return div({ style: `padding: 8px; border-radius: 4px;` },
                                    index < cards.length ? view.Card({ src: cards[index].img, click: () => click?.(cards[index], index) }): view.Card({ })
                              );
                        })
                  )
            );
      }

      return div({ style: `width: 100%; ${column('4px')}` },
            ...rows
      );
}