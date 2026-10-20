import { CloudKeyInput } from "../component/cloud_key/cloud_key_input.js";
import { column } from "../component/theme.js";
import { ThemePicker } from "../component/theme/theme_picker.js";
import { Component } from "../lib/index.js";
const { div, hr, h4 } = Component;

export function SettingsPage() {
      return div({ style: `width: 600px; ${column()}` },
            h4({}, 'Theme'),
            ThemePicker(),
            hr({}),
            h4({ }, 'Cloud settings'),
            CloudKeyInput(),
      )
}