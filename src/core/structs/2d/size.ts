export class Size2d {
  width: number;
  height: number;

  constructor(width?: number, height?: number) {
    this.width = width || 0;
    this.height = height || 0;
  }

  scale(x: number, y: number): void {
    this.width *= x;
    this.height *= y;
  }

  toString(): string {
    return `{ width: ${this.width}, height: ${this.height} }`;
  }
}
