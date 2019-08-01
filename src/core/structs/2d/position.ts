export class Position2d {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static fromCoords(...coords: [number, number][]): Position2d[] {
    if (!coords) return [];
    return coords.map(c => new Position2d(c[0], c[1]));
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  shift(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  toString(): string {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }
}
