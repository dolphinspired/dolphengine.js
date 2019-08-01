import { Color32 } from '../../../core';
import { DrawDirective } from '../draw';

export class TextDirective implements DrawDirective {
  constructor(p?: Partial<TextDirective>) {
    if (!p) return;
    this.text = p.text;
    this.font = p.font;
    this.color = p.color;
  }

  directive = 'text';
  text: string;
  font: string;
  color: Color32;
}
