import { style, } from "./lib/index.js"
import { Provider } from "./lib/provider.js"
import { Theme } from "./component/theme.js"
export function Stylesheet() {
      style(/*css*/`
            :root {
            --primary: #ffffff;
            /*The default color value for the brand color*/
            --primary-emphasis: #eee;
            /*The default color value for the brand color*/
            --fg: #292929;
            /*Accessible text color (against body, plus subtle and muted color tokens)*/
            --fg-emphasis: #414141;
            /*Emphasized text color for use with muted background tokens*/
            --bg: #fff;
            /*For solid colored backgrounds with high contrast*/
            --bg-emphasis: #e1e1e1;
            --border-color: #292929;
            /*Borders and dividers*/
            --border: 1.5px solid var(--border-color);
            --fg-primary: #444;
            /*Text color that needs to be readable on the base and bg colors*/
            --fg-primary-emphasis: #333;
            /*Text color that needs to be readable on the base and bg colors*/
            --shadow: 1.5px 1.5px 2px var(--bg-emphasis);
            --error: #ff3e5b;
            --error-emphasis: #cd3249;
            --fg-error: #fff;
            }

            body {
                  height: 100vh;
                  overflow: hidden;
                  padding: 10px;
                  margin: 0;
                  width: 100vw;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  gap: 10px;
                  background-color: var(--bg);
                  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            }

            * {
                  color: var(--fg);
                  background-color: transparent;
            }

            button {
                  width: 20%;
                  min-width: 100px;
                  font-weight: bolder;
                  text-transform: capitalize;
                  background-color: var(--primary);
                  color: var(--fg-primary);
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
            }

            button:hover {
                  background-color: var(--primary-emphasis);
                  color: var(--fg-primary-emphasis);
            }

            button:active {
                  background-color: var(--primary);
                  color: var(--fg-primary);
            }

            input,
            select,
            details {
                  width: 60%;
                  min-width: 150px;
            }

            input:focus,
            select:focus {
                  outline: none;
            }

            select {
                  background-color: var(--primary);
            }

            select {
                  &,
                  &::picker(select) {
                        appearance: base-select;
                  }
            }

            select:open::picker(select) {
                  border: var(--border);
                  border-radius: 4px;
                  padding: 5px;
                  box-sizing: border-box;
            }

            option:hover {
                  background-color: var(--bg-emphasis);
            }

            select::picker-icon {
                  content: '⌵';
            }

            option:checked {
                  font-weight: bolder;
            }

            select:open::picker-icon {
                  rotate: 180deg;
            }

            option {
                  border-radius: 4px;
                  background-color: var(--bg);
            }

            .icon-btn {
                  width: 32px;
                  min-width: 32px;
            }

            .scroll {
                  overflow-x: hidden;
                  overflow-y: scroll;
                  -ms-overflow-style: none;
                  scrollbar-width: none;
            }

            .pane {
                  min-width: 200px;
                  width: 33%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  gap: 20px;
                  height: 100%;
                  overflow: scroll;
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                  border-left: var(--border);
                  border-right: var(--border);
                  box-shadow: var(--shadow);
            }

            .pane::-webkit-scrollbar, .scroll::-webkit-scrollbar {
                  display: none;
            }

            input,
            button,
            select {
                  box-shadow: var(--shadow);
                  border: var(--border);
                  border-radius: 4px;
                  box-sizing: border-box;
                  height: 32px;
                  box-sizing: border-box;
                  padding: 5px;
            }

            summary {
                  margin-bottom: 30px;
                  font-weight: bolder;
            }
            details summary {
                  list-style: none;
                  &::before {
                        content: "⌵";
                        display: inline-block;
                        transform: rotate(270deg);
                        margin-right: 5%;
                  }
                  [open] &::before {
                        transform: rotate(0deg);
                  }
            }

            hr {
                  width: 80%;
                  background-color: var(--fg);
                  height: .5px;
            }

            .icon-btn-bar {
                  height: 32px; 
                  align-items: center;
                  display: flex;
                  flex-direction: row;
                  gap: 10px;
            }
            .icon-btn-bar > .icon-btn {
                  border: none;
                  box-shadow: none;
            }

            .box, .card {
                  border-radius: 4px;
                  border: var(--border);
                  box-shadow: var(--shadow);
            }
            .card {
                  min-width: 350px;
                  width: 33%;
                  height: 70%;
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  align-items: center;
                  justify-content: center;
            }

            .toast {
                  position: fixed;
                  right: 10px;
                  top: 10px;
                  width: 300px;
                  height: 80px;
                  border-radius: 4px;
                  background-color: var(--error);
                  border: 2px solid var(--error-emphasis);
                  color: var(--fg-error);
                  box-shadow: 2px 3px 2px var(--bg-emphasis);
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  padding: 10px;
            }
      `)
}