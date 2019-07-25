import { DolphEngine } from './dolphengine';
import { Game } from './game';

console.log('Main file loaded.');

export class MyGame extends Game {
  div: HTMLElement;
  context: CanvasRenderingContext2D;

  init(): void {
    this.div = document.getElementById('output') as HTMLElement;
    this.context = this.canvas.getContext('2d');
  }

  load(): void {

  }

  update(): void {

  }

  render(): void {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Move a rectangle back and forth 100px over 2s
    this.context.fillStyle = 'blue';
    let xPos = ((this.timer.total % 2000) / 2000) * 200;
    if (xPos > 100) {
      xPos = 100 - (xPos - 100);
    }
    this.context.fillRect(10 + xPos, 10, 150, 100);

    this.div.innerHTML = `Time: ${this.timer.total}`;
  }
}

DolphEngine.canvasId = 'gameWindow';
DolphEngine.showDebug = true;
DolphEngine.start(new MyGame());
