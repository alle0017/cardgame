import { getBoard, setBoard } from "../../../model/game.js";
import { Reactive } from "../../../model/lib/reactive.js";
import { Component, react, } from "../../lib/index.js"
import { Provider } from "../../lib/provider.js";
import { Router } from "../../lib/router.js";
import { icon, Icons } from "../icons.js";
import { column, Exception, row } from "../theme.js";
import { List } from "./list.js";

const { div, button, } = Component

export function BoardComponent({ title, items, save, deleted }: { title: string, items: string[], save: (items: string[]) => void, deleted?: () => void }) {
      return div({ class: 'card scroll', style: 'padding: 15px; align-items: start; width: 400px; min-width: 400px;' },
            div({ style: `align-items: center; justify-content: center; ${row()}`, class: 'icon-btn-bar' },
                  title,
                  deleted ?
                  button({ class: 'icon-btn', style: 'align-self: end;' , click: deleted },
                        icon({},
                              Icons.Trash
                        )
                  ): ''
            ),
            List({ value: items, save }),
      );
}
export function BoardBuilder() {
      const board = getBoard();
      const rows = new Reactive(board.fields);
      return div({ style: column() },
            div({ style: row() },
                  button({ class: 'icon-btn', click: () => Provider.of(Router).goto('/') }, 
                        icon({}, Icons.Back)
                  ),
            ),
            div({ style: `width: 100vw; ${row()}`, class: 'x-scroll' },
                  BoardComponent({ 
                        title: 'Decks',
                        items: board.decks,
                        save: (items) => {
                              board.decks = items;
                              setBoard(board);
                        }
                  }),
                  BoardComponent({
                        title: 'Shared stacks',
                        items: board.shared,
                        save: (items) => {
                              board.shared = items;
                              setBoard(board);
                        }
                  }),
                  BoardComponent({
                        title: 'Game zones',
                        items: board.zones,
                        save: (items) => {
                              board.zones = items;
                              setBoard(board);
                        }
                  }),
            ),
            div({ style: column() },
                  button({ 
                        class: 'icon-btn',
                        click() {
                              rows.value.push([]);
                              rows.dispatch();
                        }
                  }, 
                        icon({}, Icons.AddRow)
                  ),
                  react([rows], () =>
                        div({ style: `width: 100vw; ${row()}`, class: 'x-scroll' },
                              ...rows.value.map((r, i) => 
                                    BoardComponent({
                                          title: `Field's row ${i + 1}`,
                                          items: r,
                                          deleted: () => {
                                                if (r.length != 0) {
                                                      Exception('Cannot delete empty row')
                                                      return;
                                                }
                                                rows.value.splice(i, 1);
                                                setBoard(board);
                                                rows.dispatch();
                                          },
                                          save: (items) => {
                                                rows.value[i] = items;
                                                setBoard(board);
                                          }
                                    })
                              )
                        )
                  )
            ),

      )
}