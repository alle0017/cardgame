import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { firebaseConfig } from "./config.js";

export class FirebaseComponent {
      private static readonly App = initializeApp(firebaseConfig);
      private static readonly Database = getDatabase(this.App);
      
      readonly database: import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js").Database;

      constructor() {
            this.database = FirebaseComponent.Database;
      }
}