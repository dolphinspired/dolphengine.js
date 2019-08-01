import { Timer } from './timer';

export abstract class Game {
  timer: Timer;

  // tslint:disable-next-line: function-name
  _loop(time: number): void {
    window.requestAnimationFrame(this._loop.bind(this));

    this.timer.advance(time);
    this.update();
    this.render();
  }

  abstract init(): void;
  abstract load(): void;
  abstract update(): void;
  abstract render(): void;
}
