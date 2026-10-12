// firebase-app (v9+ modular)

declare module "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js" {
      export interface FirebaseOptions {
            apiKey?: string;
            authDomain?: string;
            databaseURL?: string;
            projectId?: string;
            storageBucket?: string;
            messagingSenderId?: string;
            appId?: string;
      }

      export interface FirebaseApp {
            name: string;
            options: FirebaseOptions;
      }

      export function initializeApp(options: FirebaseOptions): FirebaseApp;
      export function getApp(name?: string): FirebaseApp;
      export function getApps(): FirebaseApp[];
}
// firebase-database.d.ts
declare module "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js" {
      import { FirebaseApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

      // Database instance
      export interface Database {
            app: FirebaseApp;
      }

      // Reference to a location in the DB
      export interface DatabaseReference {
            key: string | null;
            path: string;
      }

      // Data snapshot
      export interface DataSnapshot {
            readonly key: string | null;
            readonly ref: DatabaseReference;

            val(): any;
            exists(): boolean;

            child(path: string): DataSnapshot;
            hasChild(path: string): boolean;
            hasChildren(): boolean;
            forEach(
                  action: (child: DataSnapshot) => boolean | void
            ): boolean;
      }

      // Get the Database instance
      export function getDatabase(app?: FirebaseApp): Database;

      // Get a reference to a path
      export function ref(db: Database, path?: string): DatabaseReference;

      // Write data
      export function set(ref: DatabaseReference, value: any): Promise<void>;

      // Listen for realtime updates
      export function onValue(ref: DatabaseReference, callback: (snapshot: DataSnapshot) => void): void;
      export function push(
            parentRef: DatabaseReference,
            value?: any
      ): DatabaseReference;
      export function onChildAdded(
            ref: DatabaseReference,
            callback: (snapshot: DataSnapshot, previousChildKey?: string | null) => void,
            cancelCallback?: (error: Error) => void
      ): (snapshot: DataSnapshot) => void;
      // Optionally you could add more functions as needed
      // e.g., update, remove, push, get, off
      export function update(ref: DatabaseReference, value: any): Promise<void>;
      export function remove(ref: DatabaseReference): Promise<void>;
      export function get(ref: DatabaseReference): Promise<DataSnapshot>;
      export function off(ref: DatabaseReference, eventType?: string, callback?: (snapshot: DataSnapshot) => void): void;
}