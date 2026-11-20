import { BoardBuilder } from "../component/board_builder/board_builder.js";
import { Component } from "../lib/index.js";

const { div } = Component;

export function BoardBuilderPage() {
      return div({ style: 'padding: 20px; width: 100vw; padding-left: 100px;', class: 'scroll' },
            BoardBuilder()
      )
}