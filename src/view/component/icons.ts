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
      `,
      Back: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M7.83,13l5.6,5.6L12,20L4,12l8-8l1.43,1.4L7.83,11H20v2H7.83Z"/></svg>
      `,
      Sort: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M2,17L5.75,7H7.9l3.75,10H9.6L8.75,14.6H4.9L4.1,17H2Zm3.5-4.1H8.1L6.9,9.15H6.75L5.5,12.9ZM13.7,17V15.1l5.05-6.3H13.9V7h7.05V8.9l-5,6.3H21V17H13.7ZM9,5l3-3l3,3H9Zm3,17L9,19h6l-3,3Z"/></svg>
      `,
      Share: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M17,22q-1.25,0-2.13-0.88T14,19q0-0.15 0.08-0.7L7.05,14.2q-0.4,0.38-0.93,0.59T5,15q-1.25,0-2.13-0.88T2,12T2.88,9.88T5,9Q5.6,9 6.13,9.21T7.05,9.8l7.03-4.1q-0.05-0.18-0.06-0.34T14,5q0-1.25 0.88-2.13T17,2t2.13,0.88T20,5T19.13,7.13T17,8q-0.6,0-1.13-0.21T14.95,7.2L7.93,11.3q0.05,0.18 0.06,0.34T8,12T7.99,12.36T7.93,12.7l7.03,4.1q0.4-0.38 0.92-0.59T17,16q1.25,0 2.13,0.88T20,19t-0.88,2.13T17,22Zm0-2q0.43,0 0.71-0.29Q18,19.43 18,19t-0.29-0.71T17,18t-0.71,0.29T16,19t0.29,0.71T17,20ZM5,13q0.43,0 0.71-0.29Q6,12.43 6,12T5.71,11.29T5,11q-0.42,0-0.71,0.29T4,12t0.29,0.71T5,13ZM17.71,5.71Q18,5.43 18,5T17.71,4.29T17,4T16.29,4.29T16,5t0.29,0.71T17,6t0.71-0.29ZM17,19ZM5,12ZM17,5Z"/></svg>
      `,
      Upload: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M11,19h2V14.83l1.6,1.6L16,15l-4-4L8,15l1.43,1.4L11,14.83V19ZM6,22q-0.82,0-1.41-0.59T4,20V4Q4,3.17 4.59,2.59T6,2h8l6,6V20q0,0.82-0.59,1.41T18,22H6ZM13,9V4H6V20H18V9H13ZM6,4V9V4V9V20V4Z"/></svg>
      `,
      AddRow: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M5,10H19V4H5v6ZM3,20V2H21V20H17q0-0.25 0-0.49T17,19t0-0.51T17,18h2V12H5v6H7q0,0.25 0,0.49T7,19t0,0.51T7,20H3Zm9-8Zm0-2v2V10Zm0,0ZM11,22V20H9V18h2V16h2v2h2v2H13v2H11Z"/></svg>
      `,
      Wrap: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#currentColor"><path d="M4,20V4H6V20H4Zm14,0V4h2V20H18Zm-7.4-2.45L7.05,14l3.55-3.53l1.4,1.4L10.88,13H13q0.83,0 1.41-0.59T15,11q0-0.83-0.59-1.41T13,9H7V7h6q1.65,0 2.83,1.17T17,11t-1.17,2.82T13,15H10.88L12,16.13l-1.4,1.43Z"/></svg>
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