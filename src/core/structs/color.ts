export class Color32 {
  private static readonly min = 0;
  private static readonly max = 2 ^ 32 - 1;

  private static readonly pos_r = 24;
  private static readonly pos_g = 16;
  private static readonly pos_b = 8;
  private static readonly pos_a = 0;

  private raw: number;

  constructor(raw?: number) {
    if (!raw) {
      this.raw = 0;
      return;
    }

    const clamped = raw < Color32.min ? Color32.min : raw > Color32.max ? Color32.max : raw;
    this.raw = Math.trunc(clamped);
  }

  static fromHex(hex: string): Color32 {
    let normalized: string;
    if (hex.startsWith('#')) {
      normalized = hex.replace('#', '');
      if (normalized.length === 3) {
        const n = normalized;
        normalized = n[0] + [0] + n[1] + n[1] + n[2] + n[2];
      }
    } else if (hex.startsWith('0x')) {
      normalized = hex.replace('0x', '');
    }

    if (normalized.length < 8) {
      normalized = normalized.padEnd(8, '0');
    }

    const parsed = parseInt(normalized, 16);
    return new Color32(parsed);
  }

  static fromRGB(r: number, g: number, b: number): Color32 {
    return this.fromRGBA(r, g, b, 255);
  }

  static fromRGBO(r: number, g: number, b: number, opacity: number): Color32 {
    const normalized = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity;
    return this.fromRGBA(r, g, b, normalized * 255);
  }

  static fromRGBA(r: number, g: number, b: number, a: number): Color32 {
    const value = r << Color32.pos_r + g << Color32.pos_g + b << Color32.pos_b + a << Color32.pos_a;
    return new Color32(value);
  }

  toHexString() {
    return this.raw.toString(16);
  }

  get red(): number {
    return (this.raw >> Color32.pos_r) % 256;
  }

  get green(): number {
    return (this.raw >> Color32.pos_g) % 256;
  }

  get blue(): number {
    return (this.raw >> Color32.pos_b) % 256;
  }

  get alpha(): number {
    return (this.raw >> Color32.pos_a) % 256;
  }

  get opacity(): number {
    return this.alpha / 256;
  }
}
