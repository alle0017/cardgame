
import { FirebaseComponent } from "../../../model/lib/firebase/firebase.js";
import { Component, bind, } from "../../lib/index.js";
import { row } from "../theme.js";
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

      return details({ style: ` padding: 10px; width: 100%;`},
            summary({ style: 'margin-bottom: 30px;' },
                  'Add a cloud key to play online'
            ),
            p({},
                  div({ style: row() },

                        input({ ...key.binding, placeholder: 'Insert here the Firebase key' }),
                        button({ click }, 'Submit'),
                  ),

                  hr({ style: "width: 80%; margin-top: 30px; margin-bottom: 30px;" }),

                  FirebaseGuide()
            )
      );
}
