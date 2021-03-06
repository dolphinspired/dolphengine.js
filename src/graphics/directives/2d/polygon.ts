import { Polygon2d, Color32, Position2d, Offset2d } from '../../../core';
import { DrawDirective } from '../draw';

export class PolygonDirective implements DrawDirective {
  constructor(p?: Partial<PolygonDirective>) {
    if (!p) return;
    this.fillColor = p.fillColor;
    this.lineColor = p.lineColor;
    this.polygon = p.polygon;
  }

  directive = 'polygon';
  fillColor: Color32;
  lineColor: Color32;
  polygon: Offset2d<Polygon2d>;
}
