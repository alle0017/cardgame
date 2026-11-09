import { getBoard, setBoard } from "../../../model/game.js";
import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react, } from "../../lib/index.js"
import { Provider } from "../../lib/provider.js";
import { Router } from "../../lib/router.js";
import { column, row, Theme } from "../theme.js";
import { List } from "./list.js";

const { div, button, input } = Component

export function BoardBuilder() {
      const board = getBoard();
      const rows = new Reactive(board.fields);
      const container = `padding: 10px; border-radius: 7px; width: 450px; height: 400px; border: 1px solid ${Provider.of(Theme).primary}; ${column()}`;
      return div({ style: column() },
            div({ style: row() },
                  button({ click: () => Provider.of(Router).goto('/') }, 'Back'),
                  button({ click: () => Provider.of(Router).goto('/') }, 'Export'),
                  button({ click: () => Provider.of(Router).goto('/') }, 'Import'),
            ),
            div({ style: row() },
                  div({ style: container},
                        'Decks',
                        List({ 
                              value: board.decks,
                              save: (items) => {
                                    board.decks = items;
                                    setBoard(board);
                              }
                        }),
                  ),
                  div({ style: container},
                        'Shared stacks',
                  
                        List({ 
                              value: board.shared,
                              save: (items) => {
                                    board.shared = items;
                                    setBoard(board);
                              }
                        }),
                  ),
                  div({ style: container},
                        'Game zones',
                        List({ 
                              value: board.zones,
                              save: (items) => {
                                    board.zones = items;
                                    setBoard(board);
                              }
                        }),
                  ),
            ),
            div({ style: column() },
                  button({ 
                        click() {
                              rows.value.push([]);
                              rows.dispatch();
                        }
                  }, 
                  'Add row'),
                  react([rows], () =>
                        div({ style: row() },
                              ...rows.value.map((r, i) => 
                                    div({ style: container },
                                          div({ style: row() },
                                                `Field's row ${i}`,
                                                button({ 
                                                      click() {
                                                            if (r.length != 0) {
                                                                  return;
                                                            }
                                                            rows.value.splice(i, 1);
                                                            rows.dispatch();
                                                      }
                                                }, 'Delete'),
                                          ),
                                          List({ 
                                                value: r,
                                                save: (items) => {
                                                      rows.value[i] = items;
                                                      setBoard(board);
                                                }
                                          }),
                                    ),
                              )
                        )
                  )
            ),

      )
}