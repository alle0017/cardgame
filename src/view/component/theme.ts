export class Theme {
      primary = '#000';
      secondary = '#000';
      accentPrimary = '#fff';
      accentSecondary = '#000'
      text = '#000'
      textPrimary = '#fff'
      background = '#fff'
      error = '#ff7b7b'

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
                  'secondary',
                  'accentPrimary', 
                  'accentSecondary',
                  'text',
                  'background',  
                  'textPrimary',
                  'error'
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