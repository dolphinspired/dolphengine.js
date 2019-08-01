import { Position2d } from './position';
import { Size2d } from './size';

export class Rect2d implements Position2d, Size2d {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  shift(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  scale(x: number, y: number): void {
    this.width *= x;
    this.height *= y;
  }

  toString(): string {
    return `{ x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height} }`;
  }
}
