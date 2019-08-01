import { DrawDirective } from '../draw';
import { Rect2d } from '../../../core';

export class SpriteDirective implements DrawDirective {
  constructor(p?: Partial<SpriteDirective>) {
    if (!p) return;
    this.asset = p.asset;
    this.source = p.source;
    this.dest = p.dest;
  }

  directive = 'sprite';
  asset: string;
  source: Rect2d;
  dest: Rect2d;
}
