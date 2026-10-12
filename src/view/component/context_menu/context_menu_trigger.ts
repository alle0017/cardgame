import { ContextMenu, Options } from "./context_menu.js";

export function ContextMenuTrigger(child: HTMLElement, options: Options) {
      if (Object.entries(options).length <= 0) {
            return child;
      }
      child.addEventListener('contextmenu', e => {
            e.preventDefault();
            ContextMenu.append(child, options);
      })
      return child;
}