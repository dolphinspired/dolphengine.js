import { Vector2d } from './vector';

export class Offset2d<T> {
  constructor(original: T, offset: Vector2d) {
    this.original = original;
    this.offset = offset;
  }

  original: T;
  offset = new Vector2d(0, 0);
}
