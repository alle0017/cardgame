export class Theme {
      text = '#000'
      textPrimary = '#fff'
      primary = '#ffffff';
      /*The default color value for the brand color*/
      primaryEmphasis = '#eee';
      /*The default color value for the brand color*/
      fg = '#292929';
      /*Accessible text color (against body, plus subtle and muted color tokens)*/
      fgEmphasis = '#414141';
      /*Emphasized text color for use with muted background tokens*/
      bg = '#fff';
      /*For solid colored backgrounds with high contrast*/
      bgEmphasis = '#e1e1e1';
      borderColor = '#292929';
      /*Borders and dividers*/
      border = '1.5px solid var(--border-color)';
      fgPrimary = '#444';
      /*Text color that needs to be readable on the base and bg colors*/
      fgPrimaryEmphasis = '#333';
      /*Text color that needs to be readable on the base and bg colors*/
      shadow = '1.5px 1.5px 2px var(--bg-emphasis)';
      error = '#ff3e5b';
      errorEmphasis = '#cd3249';
      fgError = '#fff';

      constructor() {
            for (const k of Object.keys(this)) {
                  //@ts-expect-error
                  this[k] = localStorage.getItem(`theme#${k}`) ?? this[k]
            }
      }

      public update() {
            for (const [k,v] of Object.entries(this)) {
                  localStorage.setItem(`theme#${k}`, v)
            }
      }

      public colors(): (keyof this)[] {
            return [
                  'primary',
                  /*The default color value for the brand color*/
                  'primaryEmphasis',
                  /*The default color value for the brand color*/
                  'fg',
                  /*Accessible text color (against body, plus subtle and muted color tokens)*/
                  'fgEmphasis',
                  /*Emphasized text color for use with muted background tokens*/
                  'bg',
                  /*For solid colored backgrounds with high contrast*/
                  'bgEmphasis',
                  'borderColor',
                  /*Borders and dividers*/
                  'fgPrimary',
                  /*Text color that needs to be readable on the base and bg colors*/
                  'fgPrimaryEmphasis',
                  /*Text color that needs to be readable on the base and bg colors*/
                  'error',
                  'errorEmphasis',
                  'fgError',
            ]
      }

      public fields(): (keyof this)[] {
            return [
                  'shadow',
                  'border',
            ]
      }
}

export const row = (gap = '10px') => `display: flex; flex-direction: row; gap: ${gap};`
export const column = (gap = '10px', reverse: boolean = false) => `display: flex; flex-direction: ${reverse ? 'column-reverse' : 'column'}; gap: ${gap};`
export function Exception(e: unknown, timeout = 3000) {
      const div = document.createElement('div');
      div.classList.add('toast');
      if (e instanceof Error) {
            div.innerText = e.message;
      } else {
            div.innerText = e?.toString() ?? 'An error occurred';
      }
      document.body.append(div);
      setTimeout(() => div.remove(), timeout)
}