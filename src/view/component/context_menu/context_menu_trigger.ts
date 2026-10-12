import { ContextMenu, Options } from "./context_menu.js";
interface Args {
      options: Options, 
      ctx?: {}
}
export function ContextMenuTrigger({ options, ctx }: Args,  child: HTMLElement, ) {
      if (Object.entries(options).length <= 0) {
            return child;
      }
      child.addEventListener('contextmenu', e => {
            e.preventDefault();
            ContextMenu.append(child, options, ctx);
      })
      return child;
}