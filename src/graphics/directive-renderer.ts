import { DrawDirective } from './directives';

export abstract class DirectiveRenderer {
  private _handlers = new Map<string, (d: DrawDirective) => void>();
  private _channels = new Map<string, DirectiveChannel>();

  protected addHandler(directive: string, handler: (d: DrawDirective) => void): DirectiveRenderer {
    this._handlers.set(directive, handler.bind(this));
    return this;
  }

  addChannel(name: string, channel: DirectiveChannel): DirectiveRenderer {
    this._channels.set(name, channel);
    return this;
  }

  draw() {
    if (!this._handlers.size) {
      throw new Error('Cannot draw, no handlers have been added!');
    }

    if (!this.onBeforeDraw()) {
      return;
    }

    this._channels.forEach(c => {
      if (!c.directives || !c.directives.length) {
        return;
      }

      c.directives.forEach(d => {
        const handler = this._handlers.get(d.directive);
        if (handler) {
          handler(d);
        }
      });
    });

    this.onAfterDraw();
  }

  protected onBeforeDraw(): boolean {
    return true;
  }

  protected onAfterDraw() { }
}

export interface DirectiveChannel {
  directives: DrawDirective[];
}