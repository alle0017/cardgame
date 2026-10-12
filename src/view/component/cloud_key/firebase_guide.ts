
import { Component, } from "../../lib/index.js";

const { p, ol, li, ul, h3, a } = Component;

export function FirebaseGuide() {
      return p({},
            h3({}, 'Guide to get the key'),

            ol({},
                  li({},
                        'Create a Firebase project',
                        ul({},
                              li({},
                                    a({ href: 'https://console.firebase.google.com/', target: '_blank' }, 'Open Firebase Console')
                              ),
                              li({}, 'Click "Create a project" and follow the instructions.')
                        )
                  ),
                  li({},
                        'Register a web app',
                        ul({},
                              li({}, 'Open Project settings → General.'),
                              li({}, 'Under "Your apps", click the web icon (</>).'),
                              li({}, 'Enter an app nickname and register the app.')
                        )
                  ),
                  li({},
                        'Copy the Web API key',
                        ul({},
                              li({}, 'Find the Firebase configuration for your web app.'),
                              li({}, 'Copy the value of the apiKey field.')
                        )
                  ),
                  li({},
                        'Create a Realtime Database',
                        ul({},
                              li({}, 'Open Build → Realtime Database.'),
                              li({}, 'Click "Create Database" and select a location.'),
                              li({}, 'Configure the database security rules and confirm.')
                        )
                  ),
                  li({},
                        'Enable database access',
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
