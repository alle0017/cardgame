import { Player, LocalPlayer, RemotePlayer } from './player.js';
import { Stack } from './components/stack.js';
import { remote, controller } from './lib/controller.js';

export class Shared<T extends Topic> {
      public readonly controller: T;
      constructor(public readonly target: T) {
            this.controller = controller(target);
            remote(target);
      }
}
export class Game {
      public readonly local: Player;
      public readonly remote: Player;
      private readonly _stack: Shared<Stack>;

      get stack() {
            return this._stack.controller;
      }

      constructor(localPlayer: string, remotePlayer: string, public readonly game: string) {
            this.local = new LocalPlayer(`${game}/${localPlayer}`);
            this.remote = new RemotePlayer(`${game}/${remotePlayer}`);
            this._stack = new Shared(new Stack(game));
      }
}