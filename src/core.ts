export enum Anchor2d {
  Default         = 0b0000,
  Left            = 0b0001,
  Right           = 0b0010,
  Center          = 0b0011,
  Top             = 0b0100,
  TopLeft         = Top | Left,
  TopRight        = Top | Right,
  TopCenter       = Top | Center,
  Bottom          = 0b1000,
  BottomLeft      = Bottom | Left,
  BottomRight     = Bottom | Right,
  BottomCenter    = Bottom | Center,
  Middle          = 0b1100,
  MiddleLeft      = Middle | Left,
  MiddleRight     = Middle | Right,
  MiddleCenter    = Middle | Center,
}

export enum Direction2d {
  None        = 0,
  Up          = 1 << 1,
  Right       = 1 << 2,
  Down        = 1 << 3,
  Left        = 1 << 4,
  UpRight     = Up | Right,
  DownRight   = Down | Right,
  DownLeft    = Down | Left,
  UpLeft      = Up | Left,
}

export class ColorRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export class Origin2d {
  anchor: Anchor2d;
  offset: Vector2d;
}

export class Polygon2d {
  points: Position2d[];
}

export class Position2d {
  x: number;
  y: number;

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

export class Rect2d implements Position2d, Size2d {
  x: number;
  y: number;
  width: number;
  height: number;

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

export class Size2d {
  width: number;
  height: number;

  scale(x: number, y: number): void {
    this.width *= x;
    this.height *= y;
  }

  toString(): string {
    return `{ width: ${this.width}, height: ${this.height} }`;
  }
}

export class Vector2d {
  x: number;
  y: number;

  scale(x: number, y: number): void {
    this.x *= x;
    this.y *= y;
  }

  toString(): string {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }
}