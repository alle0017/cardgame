import { onChildAdded, push, ref } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { FirebaseComponent } from "./firebase.js";

export class FirebaseQueue<T> extends FirebaseComponent implements Queue<T> {
      public watch(topic: string, callback: (value: T) => void): void {
            onChildAdded(ref(this.database, topic), snapshot => {
                  callback(snapshot.val() as T)
            })
      }
      public push(topic: string, value: T): void {
            push(ref(this.database, topic), value);
      }
}