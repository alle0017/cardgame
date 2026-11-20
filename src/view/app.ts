import { DeckService } from "../service/deck.js";
import { CardState } from "./component/card.js";
import { ComponentBuilder } from "./component/card_builder/component_builder.js";
import { icon, Icons } from "./component/icons.js";
import { ZoneSelector } from "./component/player/zone_selector.js";
import { Theme } from "./component/theme.js";
import { Component } from "./lib/index.js";
import { Provider } from "./lib/provider.js";
import { Router } from "./lib/router.js";
import { BoardBuilderPage } from "./page/board_builder_page.js";
import { DeckPage } from "./page/deck.js";
import { GamePage, GamePageParams } from "./page/game.js";
import { HomePage } from "./page/home.js";
import { SettingsPage } from "./page/settings.js";
import { Stylesheet } from "./style.js";

const { button, div } = Component

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
            '/board_builder': BoardBuilderPage,
            '/card_builder': ComponentBuilder,
      }, '/'))

      Stylesheet();
      const root = div({ class: 'content' });

      document.body.append(
            div({ class: 'top-bar icon-btn-bar' },
                  button({ class: 'icon-btn', style: 'align-self: start;', click: () => Provider.of(Router).goto('/') }, 
                        icon({}, 
                              Icons.Back
                        )
                  )
            ),
            root
      )

      Provider.of(Router).mount(root);
}