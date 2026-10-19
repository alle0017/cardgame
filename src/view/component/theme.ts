export class Theme {
      primary = '#333';
      secondary = '#111';
      accentPrimary = '#3e5869';
      accentSecondary = '#517084'
      text = '#cecece'
      background = '#444'

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
            ]
      }
}

export const row = (gap = '10px') => `display: flex; flex-direction: row; gap: ${gap};`
export const column = (gap = '10px', reverse: boolean = false) => `display: flex; flex-direction: ${reverse ? 'column-reverse' : 'column'}; gap: ${gap};`