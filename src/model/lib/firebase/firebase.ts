import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, type Database } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export class FirebaseComponent {
      private static database: Database | undefined;

      public static setKey(key: string) {
            localStorage.setItem('firebase-key', key);
      }
      public static hasKey() {
            return Boolean(localStorage.getItem('firebase-key'))
      }
      public static getKey() {
            return JSON.parse(localStorage.getItem('firebase-key') ?? '{}')
      }
      private static get Database() {
            if (!this.database) {
                  const key = this.getKey();
                  const app = initializeApp(key);
                  this.database = getDatabase(app);
            }
            return this.database;
      }

      readonly database: import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js").Database;

      constructor() {
            this.database = FirebaseComponent.Database;
      }
}