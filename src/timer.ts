export class Timer {
  private _start: number;
  private _elapsed: number;
  private _total: number;
  private _frames: number;

  constructor(start: number) {
    this._start = start;
  }

  get elapsed(): number {
    return this._elapsed;
  }

  get total(): number {
    return this._total;
  }

  get frames(): number {
    return this._frames;
  }

  /**
   * Advances the timer to the time (# milliseconds) provided.
   * @param time The number of ms elapsed since the timer started.
   */
  advance(time: number): void {
    this._frames++;
    const prev = this._total;
    this._total = time - this._start;
    this._elapsed = this._total - prev;
  }
}