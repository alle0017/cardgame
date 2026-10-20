import { DeckService } from "../service/deck.js";
import { CardState } from "./component/card.js";
import { ZoneSelector } from "./component/player/zone_selector.js";
import { Theme } from "./component/theme.js";
import { style } from "./lib/index.js";
import { Provider } from "./lib/provider.js";
import { Router } from "./lib/router.js";
import { DeckPage } from "./page/deck.js";
import { GamePage, GamePageParams } from "./page/game.js";
import { HomePage } from "./page/home.js";
import { SettingsPage } from "./page/settings.js";

export function App() {
      Provider.set(CardState, new CardState);
      Provider.set(Theme, new Theme);
      Provider.set(DeckService, new DeckService);
      Provider.set(ZoneSelector, new ZoneSelector);
      Provider.set(Router, new Router({ 
            '/': HomePage,
            '/game': props => GamePage(props as GamePageParams),
            '/deck': DeckPage,
            '/settings': SettingsPage,
      }, '/'))

      style(/*css*/`
            * {
                  background-color: ${Provider.of(Theme).background};
                  color: ${Provider.of(Theme).text};
                  font-family: system-ui;
            }
            details > *, 
            details > * > *, 
            details > * > * > *, 
            details > * > * > * > *, 
            details > * > * > * > * > *, 
            details > * > * > * > * > * > *,
            details > * > * > * > * > * > * > * {
                  background-color: ${Provider.of(Theme).primary};
            }
            body {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
            }
            button, input, select {
                  padding: 10px;
                  border: none;
                  background-color: ${Provider.of(Theme).accentPrimary};
                  border-radius: 7px;
            }     
            button {
                  text-transform: uppercase;
                  width: 150px;
            }
            input, select {
                  width: 300px;
            }
            button:hover {
                  background-color: ${Provider.of(Theme).accentSecondary};
            }     
            input:focus, select:focus {
                  outline: none;
            }
            

      `)
      Provider.of(Router).mount();
}