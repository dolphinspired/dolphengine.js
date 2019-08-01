import { Game } from './game';
import { Timer } from './timer';

export class DolphEngine {
  static showDebug: boolean;

  static failCount = 0;

  static start(game: Game): void {
    if (!game) {
      this.log('Failed to start - no game provided!');
      return;
    }

    window.addEventListener('DOMContentLoaded', () => {
      this.log('Starting init');
      game.init();
      this.log('Finished init');
      this.log('Starting load');
      game.load();
      this.log('Finished load');

      window.requestAnimationFrame(time => {
        game.timer = new Timer(time);
        game._loop(time);
      });
    });
  }

  private static log(message: string): void {
    if (DolphEngine.showDebug) {
      console.log(`[DolphEngine] ${message}`);
    }
  }
}
