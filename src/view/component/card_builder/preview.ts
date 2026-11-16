import { AST } from "./component_tree.js";
import { Component } from "../../lib/index.js";


export function Preview(ast: AST): HTMLElement {
      const props: Record<string, string> = {}

      if (ast.image) {
            props['src'] = ast.image;
      }
      props['style'] = ast.css;
      props['title'] = ast.name;
      return Component[ast.component as keyof HTMLElementTagNameMap](props, 
            ast.text,
            ...ast.children.map(Preview)
      );
}