export class Color32 {
  private static readonly regHex = /^[A-Fa-f0-9]+$/;

  private readonly raw: Uint8Array;

  private h: string;
  private h_refresh: boolean;

  //#region Constructors

  constructor(r: number, g: number, b: number, a: number) {
    this.raw = new Uint8Array([r, g, b, a]);
    this.h_refresh = true;
  }

  static fromHex(hex: string): Color32 {
    const result = this.parseHex(hex);
    return new Color32(result.r, result.g, result.b, result.a);
  }

  static fromRGB(r: number, g: number, b: number): Color32 {
    return new Color32(r, g, b, 255);
  }

  static fromRGBO(r: number, g: number, b: number, opacity: number): Color32 {
    const color = new Color32(r, g, b, 255);
    color.opacity = opacity;
    return color;
  }

  static fromRGBA(r: number, g: number, b: number, a: number): Color32 {
    return new Color32(r, g, b, a);
  }

  //#endregion

  //#region Properties

  get red(): number {
    return this.raw[0];
  }

  set red(value: number) {
    this.raw[0] = value;
    this.h_refresh = true;
  }

  get green(): number {
    return this.raw[1];
  }

  set green(value: number) {
    this.raw[1] = value;
    this.h_refresh = true;
  }

  get blue(): number {
    return this.raw[2];
  }

  set blue(value: number) {
    this.raw[2] = value;
    this.h_refresh = true;
  }

  get alpha(): number {
    return this.raw[3];
  }

  set alpha(value: number) {
    this.raw[3] = value;
    this.h_refresh = true;
  }

  get opacity(): number {
    return this.raw[3] / 255;
  }

  set opacity(value: number) {
    // Clamp opacity to the range 0-1
    this.alpha = (value < 0 ? 0 : value > 1 ? 1 : value) * 255;
  }

  get hex(): string {
    if (this.h_refresh) {
      this.calcHexString();
      this.h_refresh = false;
    }
    return this.h;
  }

  set hex(value: string) {
    if (value !== this.h) {
      const result = Color32.parseHex(value);
      this.raw[0] = result.r;
      this.raw[1] = result.g;
      this.raw[2] = result.b;
      this.raw[3] = result.a;
      this.h_refresh = true;
    }
  }

  //#endregion

  //#region Non-public methods

  private calcHexString(): void {
    // todo: Canvas requires the # character to prefix hex colors
    // but this could be made configurable in such a way that any desired format
    // is set on refresh
    this.h = '#';
    this.h += Color32.to2charHexString(this.raw[0]);
    this.h += Color32.to2charHexString(this.raw[1]);
    this.h += Color32.to2charHexString(this.raw[2]);
    this.h += Color32.to2charHexString(this.raw[3]);
  }

  private static parseHex(hex: string): { r: number, g: number, b: number, a: number } {
    let hx = hex;
    if (hx.startsWith('#')) {
      hx = hex.replace('#', '');

    } else if (hx.startsWith('0x')) {
      hx = hex.replace('0x', '');
    }

    if (hx.length === 3) {
      hx = hx[0] + hx[0] + hx[1] + hx[1] + hx[2] + hx[2];
    }

    return {
      r: this.parseIntOrDefault(hx[0] + hx[1], 0),
      g: this.parseIntOrDefault(hx[2] + hx[3], 0),
      b: this.parseIntOrDefault(hx[4] + hx[5], 0),
      a: this.parseIntOrDefault(hx[6] + hx[7], 255),
    };
  }

  private static parseIntOrDefault(hex: string, def: number): number {
    if (!this.regHex.test(hex)) {
      return def;
    }

    return parseInt(hex, 16);
  }

  private static to2charHexString(value: number) {
    if (!value) {
      return '00';
    }

    if (value < 16) {
      return `0${value.toString(16)}`;
    }

    return value.toString(16);
  }

  //#endregion
}
