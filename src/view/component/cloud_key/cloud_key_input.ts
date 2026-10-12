
import { FirebaseComponent } from "../../../model/lib/firebase/firebase.js";
import { Component, bind, } from "../../lib/index.js";
import { Provider } from "../../lib/provider.js";
import { column, Theme } from "../theme.js";
import { FirebaseGuide } from "./firebase_guide.js";

const { summary, details, p, input, button, hr, div } = Component;

export function CloudKeyInput() {
      const key = bind();

      function click() {
            try {
                  if (key.value) {
                        FirebaseComponent.setKey(key.value);
                  }
            } catch (e) {
                  console.error(e);
            }
      }

      return details({ style: `background-color: ${Provider.of(Theme).primary}; padding: 10px; width: 100%;`},
            summary({},
                  'Add a cloud key to play online'
            ),
            p({},
                  div({ style: column() },

                        input({ ...key.binding, placeholder: 'Insert here the Firebase key' }),
                        button({ click }, 'Submit'),
                  ),

                  hr({ style: "width: 80%;" }),

                  FirebaseGuide()
            )
      );
}
