import { Component } from "../lib/index.js"
import { Provider } from "../lib/provider.js"
import { Theme } from "./theme.js"

const { span } = Component
export const Icons = {
      Save: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M21,7V19q0,0.82-0.59,1.41T19,21H5q-0.83,0-1.41-0.59T3,19V5Q3,4.17 3.59,3.59T5,3H17l4,4ZM19,7.85L16.15,5H5V19H19V7.85Zm-4.88,9.28Q15,16.25 15,15t-0.88-2.13T12,12T9.88,12.88T9,15t0.88,2.13T12,18t2.13-0.88ZM6,10h9V6H6v4ZM5,7.85V19V5V7.85Z"/></svg>
      `,
      SaveCollection: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M8,16H20V4H18v7L15.5,9.5L13,11V4H8V16Zm0,2q-0.82,0-1.41-0.59T6,16V4Q6,3.17 6.59,2.59T8,2H20q0.83,0 1.41,0.59T22,4V16q0,0.82-0.59,1.41T20,18H8ZM4,22q-0.82,0-1.41-0.59T2,20V6H4V20H18v2H4ZM13,4h2.5H18H13ZM8,4h5h2.5H18h2H8Z"/></svg>
      `,
      Copy: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M9,18q-0.82,0-1.41-0.59T7,16V4Q7,3.17 7.59,2.59T9,2h9q0.82,0 1.41,0.59T20,4V16q0,0.82-0.59,1.41T18,18H9Zm0-2h9V4H9V16ZM5,22q-0.83,0-1.41-0.59T3,20V6H5V20H16v2H5Zm4-6V4V16Z"/></svg>
      `,
      Search: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M19.6,21l-6.3-6.3q-0.75,0.6-1.72,0.95T9.5,16q-2.72,0-4.61-1.89Q3,12.23 3,9.5Q3,6.77 4.89,4.89T9.5,3t4.61,1.89T16,9.5q0,1.1-0.35,2.07T14.7,13.3L21,19.6L19.6,21ZM9.5,14q1.88,0 3.19-1.31T14,9.5T12.69,6.31T9.5,5T6.31,6.31T5,9.5t1.31,3.19T9.5,14Z"/></svg>
      `,
      LoadImage: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M12,12ZM5,21q-0.83,0-1.41-0.59T3,19V5Q3,4.17 3.59,3.59T5,3h8q0,0.42 0,0.92T13,5H5V19H19V11q0.58,0 1.08,0T21,11v8q0,0.82-0.59,1.41T19,21H5Zm1-4H18l-3.75-5l-3,4L9,13L6,17ZM17,9V7H15V5h2V3h2V5h2V7H19V9H17Z"/></svg>
      `,
      Trash: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M7,21q-0.82,0-1.41-0.59T5,19V6H4V4H9V3h6V4h5V6H19V19q0,0.82-0.59,1.41T17,21H7ZM17,6H7V19H17V6ZM9,17h2V8H9v9Zm4,0h2V8H13v9ZM7,6V19V6Z"/></svg>
      `
} as const

type IconArgs = { width?: number, height?: number, color?: string }

export function icon({ width = 16, height = 16, color = Provider.of(Theme).text }: IconArgs, icon: string) {
      return span({ 
            style: 'background-color: #0000; display: flex; align-items: center; justify-content: center;',
            innerHTML: icon
                  .replace('width="24px"', `width="${width}"`) 
                  .replace('height="24px"', `height="${height}"`) 
                  .replace('fill="#currentColor"', `fill="${color}"`) 
      })
}