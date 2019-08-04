import { DrawDirective } from '../draw';
import { Rect2d, Offset2d } from '../../../core';

export class SpriteDirective implements DrawDirective {
  constructor(p?: Partial<SpriteDirective>) {
    if (!p) return;
    this.asset = p.asset;
    this.source = p.source;
    this.dest = p.dest;
  }

  directive = 'sprite';
  asset: string;
  source: Offset2d<Rect2d>;
  dest: Offset2d<Rect2d>;
}
