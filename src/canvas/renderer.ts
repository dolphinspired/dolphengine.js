import { DirectiveRenderer } from '../graphics/directive-renderer';
import { SpriteDirective, PolygonDirective, TextDirective } from '../graphics/directives';
import { Color32 } from '../core';
import { Position2d } from '../core/structs/2d/position';

export class CanvasRenderer extends DirectiveRenderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private transparent = Color32.fromRGBA(255, 255, 255, 0);

  constructor(canvasId: string) {
    super();

    if (!canvasId) {
      throw new Error('No canvasId provided!');
    }

    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error(`No canvas found with id '${canvasId}'`);
    }

    this.context = this.canvas.getContext('2d');

    this.addHandler('sprite', this.drawSprite);
    this.addHandler('polygon', this.drawPolygon);
    this.addHandler('text', this.drawText);
  }

  protected onBeforeDraw(): boolean {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.transparent.hex;
    return true;
  }

  private drawSprite(dir: SpriteDirective) {

  }

  private drawPolygon(dir: PolygonDirective) {
    if (!dir.polygon || !dir.polygon.points || !dir.polygon.points.length
      || (!dir.fillColor && !dir.lineColor)) {
      return;
    }

    const points = dir.polygon.points;
    const start = dir.startPosition || new Position2d(0, 0);
    const lineColor = dir.lineColor || this.transparent;

    this.context.strokeStyle = lineColor.hex;
    this.context.beginPath();

    let i = 0;
    points.forEach(pos => {
      if (i === 0) {
        this.context.moveTo(start.x + pos.x, start.y + pos.y);
      } else {
        this.context.lineTo(start.x + pos.x, start.y + pos.y);
      }
      i++;
    });
    this.context.stroke();

    if (dir.fillColor) {
      this.context.closePath();
      this.context.fillStyle = dir.fillColor.hex;
      this.context.fill();
    }
  }

  private drawText(dir: TextDirective) {

  }
}