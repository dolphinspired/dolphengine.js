import { DirectiveRenderer } from '../graphics/directive-renderer';
import { SpriteDirective, PolygonDirective, TextDirective } from '../graphics/directives';
import { Color32 } from '../core';
import { Vector2d } from '../core/structs/2d/vector';

export class CanvasRenderer extends DirectiveRenderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private readonly colorTransparent = Color32.fromRGBA(255, 255, 255, 0);
  private readonly colorBlack = Color32.fromRGB(0, 0, 0);
  private readonly defaultFont = '12px sans-serif';

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
    this.context.fillStyle = this.colorTransparent.hex;
    this.context.font = this.defaultFont;
    return true;
  }

  private drawSprite(dir: SpriteDirective) {
    // todo: handle sprite directive
  }

  private drawPolygon(dir: PolygonDirective) {
    if (!dir.polygon || !dir.polygon.original
      || !dir.polygon.original.points || !dir.polygon.original.points.length
      || (!dir.fillColor && !dir.lineColor)) {
      return;
    }

    const points = dir.polygon.original.points;
    const start = dir.polygon.offset || new Vector2d(0, 0);
    const lineColor = dir.lineColor || this.colorTransparent;

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
    if (!dir.text) {
      // No text to draw
      return;
    }

    let x = 0;
    let y = 0;
    const font = dir.font || this.defaultFont;
    const color = dir.color || this.colorBlack;

    if (dir.dest) {
      if (dir.dest.x) {
        x = dir.dest.x;
      }
      if (dir.dest.y) {
        y = dir.dest.y;
      }
    }

    this.context.font = font;
    this.context.fillStyle = color.hex;
    this.context.fillText(dir.text, x, y);
  }
}