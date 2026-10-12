import { DeckService } from "../service/deck.js";
import { CardState } from "./component/card.js";
import { Theme } from "./component/theme.js";
import { style } from "./lib/index.js";
import { Provider } from "./lib/provider.js";
import { Router } from "./lib/router.js";
import { DeckPage } from "./page/deck.js";
import { GamePage } from "./page/game.js";
import { HomePage } from "./page/home.js";

export function App() {
      Provider.set(CardState, new CardState);
      Provider.set(Theme, new Theme);
      Provider.set(DeckService, new DeckService);
      Provider.set(Router, new Router({ 
            '/': HomePage,
            '/game': GamePage,
            '/deck': DeckPage 
      }, '/'))

      style(/*css*/`
            * {
                  background-color: ${Provider.of(Theme).background};
                  color: ${Provider.of(Theme).text};
            }
            body {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
            }
            button, input, select {
                  padding: 10px;
                  text-transform: uppercase;
                  border: none;
                  background-color: ${Provider.of(Theme).accentPrimary};
                  border-radius: 7px;
            }     
            button {
                  width: 150px;
            }
            input, select {
                  width: 300px;
            }
            button:hover {
                  background-color: ${Provider.of(Theme).accentSecondary};
            }     
            input:focus {
                  outline: none;
            }

      `)
      Provider.of(Router).mount();
}