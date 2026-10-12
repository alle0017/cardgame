# Card Game Simulator

An experimental, browser-based framework for building generic card game simulators.

The project provides reusable primitives for cards, decks, hands, stacks, players, reactive views, local persistence, and optional remote synchronization. It is designed to support different card games without embedding the rules of one specific game into the framework.

## Scope

This repository is a foundation for card game applications. It currently covers:

- A domain model for games, players, decks, hands, stacks, graveyards, and player zones.
- Command-based mutations that can be applied locally or sent through a remote queue.
- A local in-memory queue for development and deterministic single-browser simulations.
- A Firebase Realtime Database queue adapter for multiplayer synchronization.
- Reactive state primitives for updating views when cards change.
- IndexedDB-backed repositories for locally stored cards and decks.
- A small component, page, routing, and dependency-provider layer for the browser UI.

The project does not currently provide a complete rules engine, matchmaking service, authentication system, turn manager, server authority model, or game-specific rules. Those concerns belong to an application built on top of this framework.

## Architecture

The source is organized into four broad layers:

```text
src/
├── model/       Domain objects and state synchronization
├── service/     Application services such as deck management
├── view/        Browser UI components and pages
└── index.ts     Application entry point
```

### Model layer

The model layer contains the reusable card-game concepts:

- `Game` creates a local player, a remote player, and a shared game stack.
- `Player` groups a deck, hand, graveyard, and three generic zones. `LocalPlayer` exposes controlled objects; `RemotePlayer` listens for remote commands.
- `Stack` stores cards and supports adding, removing, and popping cards.
- `Deck` extends `Stack` with drawing, shuffling, and replacing its complete card list.
- `Hand` stores cards with hand-specific add and remove operations.
- `Reactive<T>` stores a value and notifies subscribers when that value changes.

The global `Card` type is intentionally small:

```ts
type Card = {
	id: number;
	name: string;
	img: string;
};
```

Applications can extend this representation or introduce a richer card model as their rules require.

### Command dispatch and synchronization

Mutating model methods use the `@dispatch` decorator. When a controlled object calls one of these methods, the method is executed locally and a serializable `RemoteCall` is pushed to the configured queue:

```text
controlled method call
				│
				├── apply method locally
				└── push { topic, method, args } to Queue
															│
								 ┌────────────┴────────────┐
								 │                         │
					 LocalQueue                 FirebaseQueue
					in-memory replay        Firebase Realtime Database
```

`remote(topic)` subscribes an object to its topic and invokes the received method with the decoded arguments. Topics are derived from the object identity, for example `stack/<player>/` and `hand/<player>/`.

The queue is replaceable through `Controller.setQueue(...)`. The default is `LocalQueue`, which makes the application usable without a backend. A production multiplayer implementation should consider authentication, authorization, validation, duplicate delivery, ordering, reconnects, and server-side authority before exposing commands to other players.

### Services and persistence

`DeckService` is the application-facing service for cards and decks. Its repositories use the local datasource layer, which wraps IndexedDB transactions and schema setup. The persistence layer includes:

- `Datasource` for database access and transaction execution.
- `Repository<T>` for typed CRUD operations.
- `@schema`, `@table`, and `@key` metadata decorators for database schemas and entity keys.

Deck persistence and gameplay synchronization are separate concerns: IndexedDB stores a user's local library, while a queue transports game commands.

### View layer

The view layer is a lightweight component system built with browser DOM APIs. `App()` registers shared services through `Provider`, configures the `Router`, mounts the pages, and applies the theme. Current pages are:

- `/` for the home screen.
- `/game` for a game table.
- `/deck` for deck management.

Components are grouped by responsibility, including cards, decks, hands, stacks, players, zones, card search, card picking, and cloud-key configuration.

## Running locally

The repository currently has no `package.json` or build script. It uses the TypeScript compiler directly and emits JavaScript to `build/` according to `tsconfig.json`.

### Requirements

- Node.js with `tsc` available on the command line.
- A static web server. Opening `index.html` directly may be restricted by browser module and storage security rules.

### Build

```sh
tsc
```

This compiles `src/` into `build/` while preserving the module structure.

### Serve

From the project root, use any static file server. For example, with a globally available Python installation:

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080> in a browser.

### Type-check without emitting files

```sh
tsc --noEmit
```

## Using the model

A minimal game can be created with two player identifiers and a game identifier:

```ts
import { Game } from './model/game.js';

const game = new Game('local-player', 'remote-player', 'game-1');
game.local.deck.shuffle();
const card = game.local.deck.draw();

if (card) {
	game.local.hand.add(card);
}
```

The local player's model objects are wrapped by `controller(...)`, so decorated mutations are dispatched to the configured queue. The remote player's objects are subscribed with `remote(...)` and are intended to receive those commands.

## Configuring Firebase synchronization

`FirebaseQueue` implements the same `Queue<T>` interface as `LocalQueue`. A Firebase configuration is stored through `FirebaseComponent.setKey(...)` and is read from local storage when the Firebase database is first accessed.

An application must explicitly select the Firebase queue:

```ts
import { Controller } from './model/lib/controller.js';
import { FirebaseComponent } from './model/lib/firebase/firebase.js';
import { FirebaseQueue } from './model/lib/firebase/queue.js';

FirebaseComponent.setKey(firebaseConfig);
Controller.setQueue(new FirebaseQueue());
```

The Firebase configuration is user-provided and should not be committed to the repository. Realtime Database security rules must restrict who can read and write each game topic.

## Extension points

A new card game can build on the framework by:

1. Defining its card metadata and game-specific entities.
2. Extending `Game`, `Player`, `Deck`, `Hand`, or `Stack` where the rules need additional operations.
3. Marking state-changing commands with `@dispatch` so they can be replayed or synchronized.
4. Adding a queue implementation when transport or server authority requires something beyond local memory or Firebase.
5. Adding services for rules, turn progression, validation, and persistence.
6. Adding view components and routes for the game-specific workflow.

Keep commands small and serializable. A remote command should contain enough information to reproduce the state transition, but should not depend on DOM objects, closures, or non-serializable runtime state.

## Current limitations and considerations

- The default queue is local and in-memory; it is not multiplayer persistence.
- Remote calls are method names plus JSON arguments. They currently require trusted or validated callers.
- There is no built-in turn order, phase system, legality checking, conflict resolution, or undo model.
- `Reactive` supports subscription but currently has no unsubscribe operation.
- Firebase is loaded from Google CDN modules, so browser network access is required for that adapter.
- The HTML shell is intentionally minimal and currently uses a placeholder document title.
- The generated `build/` directory is compiled output; source changes should be made under `src/` and then rebuilt.

## Project status

This is an evolving framework and prototype. The strongest current use case is experimenting with card-game models and browser interfaces while keeping game state and transport loosely coupled. Before using it for a production multiplayer game, add a server-authoritative rules layer, identity and permissions, robust persistence, automated tests, and a formal protocol/versioning strategy.
