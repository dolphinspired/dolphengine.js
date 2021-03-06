import { DolphEngine } from './dolphengine';
import { Game } from './game';
import { DirectiveChannel } from './graphics/directive-renderer';
import { PolygonDirective, TextDirective } from './graphics/directives';
import { Position2d, Polygon2d, Offset2d } from './core';
import { Color32 } from './core/structs/color';
import { CanvasRenderer } from './canvas/renderer';
import { DrawDirective } from './graphics/directives/draw';
import { Vector2d } from './core/structs/2d/vector';

export class MyGame extends Game {
  div: HTMLElement;

  renderer: CanvasRenderer;
  channel: MyChannel;
  poly: PolygonDirective;
  text: TextDirective;

  init(): void {
    this.div = document.getElementById('output') as HTMLElement;
  }

  load(): void {
    this.renderer = new CanvasRenderer('gameWindow');
    this.channel = new MyChannel();
    this.renderer.addChannel('test-channel', this.channel);
    this.poly = new PolygonDirective({
      polygon: new Offset2d(Polygon2d.fromCoords(
        [10, 10],
        [100, 10],
        [100, 100],
        [10, 100],
        [10, 10],
      ), new Vector2d(20, 20)),
      lineColor: Color32.fromHex('#0000FF80'),
      fillColor: Color32.fromHex('#FF000080'),
    });
    this.text = new TextDirective({
      text: 'Whaddup',
      dest: new Position2d(20, 200),
      font: '36px Helvetica',
    });
    this.channel.directives.push(this.poly, this.text);
  }

  update(): void {
    // Move the shape back and forth 100px over 2s
    let xPos = ((this.timer.total % 2000) / 2000) * 200;
    if (xPos > 100) {
      xPos = 100 - (xPos - 100);
    }
    this.poly.polygon.offset.moveTo(20 + xPos, 20);
  }

  render(): void {
    this.renderer.draw();
  }
}

export class MyChannel implements DirectiveChannel {
  directives: DrawDirective[] = [];
}

DolphEngine.showDebug = true;
(window as any).game = new MyGame(); // So I can play with it in the debug console
DolphEngine.start((window as any).game);
