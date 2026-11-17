import { Preview } from "./preview.js";
import { AST } from "../../../service/store.js";

function getSize(node: HTMLElement) {
      const holder = document.createElement('div');
      holder.style.cssText = 'position:fixed;left:-99999px;top:0;visibility:hidden;';
      holder.appendChild(node);
      document.body.appendChild(holder);
      const size = node.getBoundingClientRect();
      node.remove();
      holder.remove();
      return size;
}
export async function saveAsImage(root: AST) {
      const node = Preview(root);
      const { width, height } = getSize(node);
      const clone = node.cloneNode(true);
      const xhtml = new XMLSerializer().serializeToString(clone);

      const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <foreignObject x="0" y="0" width="100%" height="100%">
                  ${xhtml}
            </foreignObject>
      </svg>`;

      const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

      const img = new Image();
      img.decoding = 'async';
      await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = svgUrl;
      });

      const scale = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      ctx?.scale(scale, scale);
      ctx?.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/png');
      console.log(dataUrl)
      return dataUrl;
}