
import { Component,  } from "../../lib/index.js";
import { Carousel } from "../carousel/carousel.js";

const { p, ol, li, ul, h3, a, b } = Component;

export function FirebaseGuide() {
      return p({},
            h3({}, 'Guide to get the key'),

            Carousel({ class: 'stepper' },
                  p({ class: 'stepper-item' },
                        b({}, '1 - Create a Firebase project'),
                        ul({},
                              li({},
                                    a({ href: 'https://console.firebase.google.com/', target: '_blank' }, 'Open Firebase Console')
                              ),
                              li({}, 'Click "Create a project" and follow the instructions.')
                        )
                  ),
                  p({ class: 'stepper-item' },
                        b({}, '2- Register a web app'),
                        ul({},
                              li({}, 'Open Project settings → General.'),
                              li({}, 'Under "Your apps", click the web icon (</>).'),
                              li({}, 'Enter an app nickname and register the app.')
                        )
                  ),
                  p({ class: 'stepper-item' },
                        b({}, '3 - Copy the Web API key'),
                        ul({},
                              li({}, 'Find the Firebase configuration for your web app.'),
                              li({}, 'Copy the value of the apiKey field.')
                        )
                  ),
                  p({ class: 'stepper-item' },
                        b({}, '4 - Create a Realtime Database'),
                        ul({},
                              li({}, 'Open Build → Realtime Database.'),
                              li({}, 'Click "Create Database" and select a location.'),
                              li({}, 'Configure the database security rules and confirm.')
                        )
                  ),
                  p({ class: 'stepper-item' },
                        b({}, '5 - Enable database access'),
                        ul({},
                              li({}, 'Open the database Rules tab.'),
                              li({}, 'Configure appropriate read/write permissions and publish the rules.')
                        )
                  )
            ),

            p({},
                  'Note: The API key identifies your Firebase project; it is not a password. Protect database access with Security Rules and Firebase Authentication.'
            )
      )    
}
