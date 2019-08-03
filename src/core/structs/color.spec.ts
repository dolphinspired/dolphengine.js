import { expect } from 'chai';
import { Color32 } from './color';

describe('Color32', () => {
  let color: Color32;

  const red = 15;
  const green = 30;
  const blue = 45;
  const alpha = 60;
  const opacity = alpha / 255;
  const hex = '#0f1e2d3c';

  it('can be created', () => {
    color = new Color32(0, 0, 0, 0);
    expect(!!color).to.be.true;
  });
  describe('when created from values', () => {
    beforeEach(() => {
      color = new Color32(red, green, blue, alpha);
    });
    it('then red is set', () => {
      expect(color.red).to.equal(red);
    });
    it('then green is set', () => {
      expect(color.green).to.equal(green);
    });
    it('then blue is set', () => {
      expect(color.blue).to.equal(blue);
    });
    it('then alpha is set', () => {
      expect(color.alpha).to.equal(alpha);
    });
    it('then opacity is set', () => {
      expect(color.opacity).to.equal(opacity);
    });
    it('then the color can be converted to a hex string', () => {
      expect(color.hex).to.equal(hex);
    });
    describe('and red is changed', () => {
      beforeEach(() => {
        color.red += 5;
      });
      it('then the red value is updated', () => {
        expect(color.red).to.equal(red + 5);
      });
      it('then the hex string is updated', () => {
        expect(color.hex).to.not.equal(hex);
      });
    });
    describe('and green is changed', () => {
      beforeEach(() => {
        color.green += 5;
      });
      it('then the green value is updated', () => {
        expect(color.green).to.equal(green + 5);
      });
      it('then the hex string is updated', () => {
        expect(color.hex).to.not.equal(hex);
      });
    });
    describe('and blue is changed', () => {
      beforeEach(() => {
        color.blue += 5;
      });
      it('then the blue value is updated', () => {
        expect(color.blue).to.equal(blue + 5);
      });
      it('then the hex string is updated', () => {
        expect(color.hex).to.not.equal(hex);
      });
    });
    describe('and alpha is changed', () => {
      beforeEach(() => {
        color.alpha += 5;
      });
      it('then the alpha value is updated', () => {
        expect(color.alpha).to.equal(alpha + 5);
      });
      it('then the opacity value is updated', () => {
        expect(color.opacity).to.equal((alpha + 5) / 255);
      });
      it('then the hex string is updated', () => {
        expect(color.hex).to.not.equal(hex);
      });
    });
    describe('and opacity is changed', () => {
      beforeEach(() => {
        color.opacity /= 2;
      });
      it('then the opacity value is updated', () => {
        expect(color.opacity).to.equal(opacity / 2);
      });
      it('then the alpha value is updated', () => {
        expect(color.alpha).to.equal((opacity / 2) * 255);
      });
      it('then the hex string is updated', () => {
        expect(color.hex).to.not.equal(hex);
      });
    });
    describe('and the hex string is changed', () => {
      beforeEach(() => {
        color.hex = '3c2d1e0f';
      });
      it('then all values are updated', () => {
        expect(color.red).to.equal(60);
        expect(color.green).to.equal(45);
        expect(color.blue).to.equal(30);
        expect(color.alpha).to.equal(15);
        expect(color.opacity).to.equal(15 / 255);
      });
    });
  });
  describe('when created fromHex()', () => {
    const testCases = [
      { test: '0xFF0480', red: 255, green: 4, blue: 128, alpha: 255, opacity: 1.0, hex: '#ff0480ff' },
      { test: '#ace49b88', red: 172, green: 228, blue: 155, alpha: 136, opacity: 136 / 255, hex: '#ace49b88' },
      { test: 'invalid', red: 0, green: 0, blue: 0, alpha: 255, opacity: 1.0, hex: '#000000ff' },
    ];
    testCases.forEach(tc => {
      describe(`'${tc.test}'`, () => {
        beforeEach(() => {
          color = Color32.fromHex(tc.test);
        });
        it('then the hex string can be returned', () => {
          expect(color.hex).to.equal(tc.hex);
        });
        it('then the color values are parsed correctly', () => {
          expect(color.red, 'Red').to.equal(tc.red);
          expect(color.green, 'Green').to.equal(tc.green);
          expect(color.blue, 'Blue').to.equal(tc.blue);
          expect(color.alpha, 'Alpha').to.equal(tc.alpha);
        });
        it('then opacity is parsed correctly', () => {
          expect(color.opacity).to.equal(tc.opacity);
        });
      });
    });
  });
  describe('when created fromRGB()', () => {
    beforeEach(() => {
      color = Color32.fromRGB(red, green, blue);
    });
    it('then those values are set correctly', () => {
      expect(color.red).to.equal(red);
      expect(color.green).to.equal(green);
      expect(color.blue).to.equal(blue);
    });
    it('then alpha is set to 255', () => {
      expect(color.alpha).to.equal(255);
    });
    it('then opacity is set to 1', () => {
      expect(color.opacity).to.equal(1);
    });
  });
  describe('when created fromRGBO()', () => {
    beforeEach(() => {
      color = Color32.fromRGBO(red, green, blue, opacity);
    });
    it('then those values are set correctly', () => {
      expect(color.red).to.equal(red);
      expect(color.green).to.equal(green);
      expect(color.blue).to.equal(blue);
      expect(color.opacity).to.equal(opacity);
    });
    it('then alpha is set according to opacity', () => {
      expect(color.alpha).to.equal(alpha);
    });
  });
  describe('when created fromRGBA()', () => {
    beforeEach(() => {
      color = Color32.fromRGBA(red, green, blue, alpha);
    });
    it('then those values are set correctly', () => {
      expect(color.red).to.equal(red);
      expect(color.green).to.equal(green);
      expect(color.blue).to.equal(blue);
      expect(color.alpha).to.equal(alpha);
    });
    it('then opacity is set according to alpha', () => {
      expect(color.opacity).to.equal(opacity);
    });
  });
});
