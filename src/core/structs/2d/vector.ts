export class Vector2d {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
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
    this.x *= x;
    this.y *= y;
  }

  toString(): string {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }
}
