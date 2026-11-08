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
      public readonly shared: Map<string, Shared<Stack>> = new Map;
      

      constructor(localPlayer: string, remotePlayer: string, public readonly game: string, public readonly board: Board) {
            this.local = new LocalPlayer(`${game}/${localPlayer}`, this.board);
            this.remote = new RemotePlayer(`${game}/${remotePlayer}`, this.board);

            for (const shared of this.board.shared) {

                  this.shared.set(shared, new Shared(new Stack(game)));
            }
      }
}