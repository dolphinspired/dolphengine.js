import { Position2d } from './position';

export class Polygon2d {
  points: Position2d[];

  constructor(p?: Partial<Polygon2d>) {
    if (!p) return;
    this.points = p.points;
  }

  static fromCoords(...coords: [number, number][]): Polygon2d {
    return new Polygon2d({
      points: Position2d.fromCoords(...coords),
    });
  }

  close(): void {
    if (!this.points || this.points.length < 2) return;
    this.points.push(this.points[0]);
  }
}
