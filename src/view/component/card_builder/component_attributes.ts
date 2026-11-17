import { Component, } from "../../lib/index.js";
import { column, row } from "../theme.js";
import { AST } from "../../../service/store.js";
import { icon, Icons } from "../icons.js";

const { div, button, textarea, input } = Component;

type Props = {
      save(): void
}

function fileAsDataUrl(file: File | Blob): Promise<string> {
      return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error(reader.error?.message));
            reader.readAsDataURL(file);
      });
}

export function ComponentAttributes({ save }: Props, child: AST): HTMLElement {
      
      const areaStyle = `border: none; height: 300px; width: 300px; resize: none;`;
      const picker = input({ type: 'file',  accept: "image/*", change: loadImage }) as HTMLInputElement;
      async function loadImage() {
            if (!picker.files || picker.files.length <= 0) { 
                  return;
            }
            const url = await fileAsDataUrl(picker.files[0]);
            child.image = url;
            save()
      }
      return div({ style: column('40px') },
            div({ style: `height: 32px; align-items: center; ${row()}` },
                  div({ style: 'width: 100px;' },
                        child.name,
                  ),
            ),
            div({ style: column() },
                  'Name',
                  input({ value: child.name, change: e => { child.name = (e.target as HTMLInputElement).value; save() } }),
            ),
            div({ style: column() },
                  'Element',
                  input({ value: child.component, change: e => { child.component = (e.target as HTMLInputElement).value; save() } }),
            ),
            div({ style: column() },
                  'Image',
                  div({ style: row() },
                        button({ click: () => picker.click(), class: 'icon-btn', title: child.image ? child.image: 'Insert image here...' },
                              icon({}, Icons.LoadImage)
                        ),    
                        child.image ?
                              button({ class: 'icon-btn', click: () => { child.image = ''; save() }}, 
                                    icon({}, Icons.Trash)
                              )
                        : ''
                  )
            ),
            div({ style: column() },
                  'Style',
                  input({ value: child.css, placeholder: 'Put here the style...', change: e => { child.css = (e.target as HTMLTextAreaElement).value; save() } }),
            ),
            div({ style: column() },
                  'Text',
                  textarea({
                        value: child.text,
                        style: areaStyle, 
                        placeholder: 'Put here the text...', 
                        change: e => { 
                              const el = e.target as HTMLTextAreaElement;
                              child.text = el.value;
                              save();
                        } 
                  }),
            ),
      )
}