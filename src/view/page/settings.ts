import { CloudKeyInput } from "../component/cloud_key/cloud_key_input.js";
import { icon, Icons } from "../component/icons.js";
import { column, row, } from "../component/theme.js";
import { ThemePicker } from "../component/theme/theme_picker.js";
import { Component, } from "../lib/index.js";
import { Provider } from "../lib/provider.js";
import { Router } from "../lib/router.js";
import { importSettings, downloadSettings } from "./settings.service.js";
const { div, hr, h4, button, details, summary } = Component;

export function SettingsPage() {
      return div({ style: `width: 600px; height: 80vh; ${column()}`, class: 'scroll' },
            button({ class: 'icon-btn', style: 'align-self: start;', click: () => Provider.of(Router).goto('/') }, 
                  icon({}, Icons.Back)
            ),
            h4({}, 'Share'),
            details({ style: ` padding: 10px; width: 100%;` },
                  summary({ style: `margin-bottom: 30px;` },
                        'Share your game settings with other players'
                  ),
                  div({ style: row() },
                        button({ class: 'icon-btn', click: downloadSettings }, 
                              icon({},
                                    Icons.Share
                              )
                        ),
                        button({ class: 'icon-btn', click: importSettings }, 
                              icon({},
                                    Icons.Upload
                              )
                        ),
                  )
            ),
            h4({}, 'Theme'),
            ThemePicker(),
            hr({}),
            h4({ }, 'Cloud settings'),
            CloudKeyInput(),
      )
}