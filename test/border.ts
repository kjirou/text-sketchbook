import * as assert from 'assert';

import {
  clearBottomSide,
  clearLeftSide,
  clearRightSide,
  clearTopSide,
  drawBottomSide,
  drawCorner,
  drawLeftSide,
  drawRightSide,
  drawTopSide,
} from '../src/border';
import {
  createBox,
  renderBox,
} from '../src/box';


describe('border', function() {
  describe('clearTopSide', function() {
    it('works', function() {
      let box1 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box1.matrix = clearTopSide(box1.matrix, 1);
      assert.strictEqual(renderBox(box1, {backgroundSymbol: 'N'}), [
        'NNN',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));

      let box2 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box2.matrix = clearTopSide(box2.matrix, 2);
      assert.strictEqual(renderBox(box2, {backgroundSymbol: 'N'}), [
        'NNN',
        'NNN',
        'xxx',
        'xxx',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: clearTopSide(box.matrix, 1),
      });

      assert.strictEqual(renderBox(box, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox, {backgroundSymbol: 'N'}), [
        'NNN',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
    });
  });

  describe('clearBottomSide', function() {
    it('works', function() {
      let box1 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box1.matrix = clearBottomSide(box1.matrix, 1);
      assert.strictEqual(renderBox(box1, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'xxx',
        'NNN',
      ].join('\n'));

      let box2 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box2.matrix = clearBottomSide(box2.matrix, 2);
      assert.strictEqual(renderBox(box2, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'NNN',
        'NNN',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: clearBottomSide(box.matrix, 1),
      });

      assert.strictEqual(renderBox(box, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'xxx',
        'NNN',
      ].join('\n'));
    });
  });

  describe('clearLeftSide', function() {
    it('works', function() {
      let box1 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box1.matrix = clearLeftSide(box1.matrix, 1);
      assert.strictEqual(renderBox(box1, {backgroundSymbol: 'N'}), [
        'Nxx',
        'Nxx',
        'Nxx',
        'Nxx',
      ].join('\n'));

      let box2 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box2.matrix = clearLeftSide(box2.matrix, 2);
      assert.strictEqual(renderBox(box2, {backgroundSymbol: 'N'}), [
        'NNx',
        'NNx',
        'NNx',
        'NNx',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: clearLeftSide(box.matrix, 1),
      });

      assert.strictEqual(renderBox(box, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox, {backgroundSymbol: 'N'}), [
        'Nxx',
        'Nxx',
        'Nxx',
        'Nxx',
      ].join('\n'));
    });
  });

  describe('clearRightSide', function() {
    it('works', function() {
      let box1 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box1.matrix = clearRightSide(box1.matrix, 1);
      assert.strictEqual(renderBox(box1, {backgroundSymbol: 'N'}), [
        'xxN',
        'xxN',
        'xxN',
        'xxN',
      ].join('\n'));

      let box2 = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box2.matrix = clearRightSide(box2.matrix, 2);
      assert.strictEqual(renderBox(box2, {backgroundSymbol: 'N'}), [
        'xNN',
        'xNN',
        'xNN',
        'xNN',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: clearRightSide(box.matrix, 1),
      });

      assert.strictEqual(renderBox(box, {backgroundSymbol: 'N'}), [
        'xxx',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox, {backgroundSymbol: 'N'}), [
        'xxN',
        'xxN',
        'xxN',
        'xxN',
      ].join('\n'));
    });
  });

  describe('drawTopSide', function() {
    it('can draw a border of 1 width', function() {
      let box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawTopSide(box.matrix, 1, ['B'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'BBB',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
    });

    it('can draw a border of 2 width', function() {
      let box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawTopSide(box.matrix, 2, ['1', '2'], 0, 2);
      assert.strictEqual(renderBox(box), [
        '111',
        '222',
        'xxx',
        'xxx',
      ].join('\n'));
    });

    it('can draw a border in the narrow x range', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 2}, {defaultSymbol: 'x'});
      box.matrix = drawTopSide(box.matrix, 1, ['B'], 1, 2);
      assert.strictEqual(renderBox(box), [
        'xBBx',
        'xxxx',
      ].join('\n'));
    });

    it('should circulate short symbols', function() {
      let box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawTopSide(box.matrix, 3, ['1', '2'], 0, 2);
      assert.strictEqual(renderBox(box), [
        '111',
        '222',
        '111',
        'xxx',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: drawTopSide(box.matrix, 1, ['B'], 0, 2),
      });

      assert.strictEqual(renderBox(box), [
        'xxx',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox), [
        'BBB',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
    });
  });

  describe('drawBottomSide', function() {
    it('can draw a border of 1 width', function() {
      let box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawBottomSide(box.matrix, 1, ['B'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'xxx',
        'xxx',
        'xxx',
        'BBB',
      ].join('\n'));
    });

    it('can draw a border of 2 width', function() {
      let box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawBottomSide(box.matrix, 2, ['1', '2'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'xxx',
        'xxx',
        '222',
        '111',
      ].join('\n'));
    });

    it('can draw a border in the narrow x range', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 2}, {defaultSymbol: 'x'});
      box.matrix = drawBottomSide(box.matrix, 1, ['B'], 1, 2);
      assert.strictEqual(renderBox(box), [
        'xxxx',
        'xBBx',
      ].join('\n'));
    });

    it('should circulate short symbols', function() {
      let box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawBottomSide(box.matrix, 3, ['1', '2'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'xxx',
        '111',
        '222',
        '111',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 3, height: 4}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: drawBottomSide(box.matrix, 1, ['B'], 0, 2),
      });

      assert.strictEqual(renderBox(box), [
        'xxx',
        'xxx',
        'xxx',
        'xxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox), [
        'xxx',
        'xxx',
        'xxx',
        'BBB',
      ].join('\n'));
    });
  });

  describe('drawLeftSide', function() {
    it('can draw a border of 1 width', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawLeftSide(box.matrix, 1, ['B'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'Bxxx',
        'Bxxx',
        'Bxxx',
      ].join('\n'));
    });

    it('can draw a border of 2 width', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawLeftSide(box.matrix, 2, ['B'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'BBxx',
        'BBxx',
        'BBxx',
      ].join('\n'));
    });

    it('can draw a border in the narrow y range', function() {
      let box = createBox({x: 0, y: 0, width: 2, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawLeftSide(box.matrix, 1, ['B'], 1, 2);
      assert.strictEqual(renderBox(box), [
        'xx',
        'Bx',
        'Bx',
        'xx',
      ].join('\n'));
    });

    it('should circulate short symbols', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawLeftSide(box.matrix, 3, ['1', '2'], 0, 2);
      assert.strictEqual(renderBox(box), [
        '121x',
        '121x',
        '121x',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: drawLeftSide(box.matrix, 1, ['B'], 0, 2),
      });

      assert.strictEqual(renderBox(box), [
        'xxxx',
        'xxxx',
        'xxxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox), [
        'Bxxx',
        'Bxxx',
        'Bxxx',
      ].join('\n'));
    });
  });

  describe('drawRightSide', function() {
    it('can draw a border of 1 width', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawRightSide(box.matrix, 1, ['B'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'xxxB',
        'xxxB',
        'xxxB',
      ].join('\n'));
    });

    it('can draw a border of 2 width', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawRightSide(box.matrix, 2, ['B'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'xxBB',
        'xxBB',
        'xxBB',
      ].join('\n'));
    });

    it('can draw a border in the narrow y range', function() {
      let box = createBox({x: 0, y: 0, width: 2, height: 4}, {defaultSymbol: 'x'});
      box.matrix = drawRightSide(box.matrix, 1, ['B'], 1, 2);
      assert.strictEqual(renderBox(box), [
        'xx',
        'xB',
        'xB',
        'xx',
      ].join('\n'));
    });

    it('should circulate short symbols', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawRightSide(box.matrix, 3, ['1', '2'], 0, 2);
      assert.strictEqual(renderBox(box), [
        'x121',
        'x121',
        'x121',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: drawRightSide(box.matrix, 1, ['B'], 0, 2),
      });

      assert.strictEqual(renderBox(box), [
        'xxxx',
        'xxxx',
        'xxxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox), [
        'xxxB',
        'xxxB',
        'xxxB',
      ].join('\n'));
    });
  });

  describe('drawCorner', function() {
    it('can draw a cornar with a single symbol', function() {
      let box1 = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box1.matrix = drawCorner(box1.matrix, {x: 0, y: 0, width: 3, height: 2}, ['1']);
      assert.strictEqual(renderBox(box1), [
        '111x',
        '111x',
        'xxxx',
      ].join('\n'));

      let box2 = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box2.matrix = drawCorner(box2.matrix, {x: 1, y: 1, width: 3, height: 2}, ['1']);
      assert.strictEqual(renderBox(box2), [
        'xxxx',
        'x111',
        'x111',
      ].join('\n'));
    });

    it('can draw a cornar with multiple symbols', function() {
      let box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      box.matrix = drawCorner(box.matrix, {x: 0, y: 0, width: 3, height: 2}, ['1', '2', '3', '4']);
      assert.strictEqual(renderBox(box), [
        '123x',
        '412x',
        'xxxx',
      ].join('\n'));
    });

    it('should not break original box', function() {
      const box = createBox({x: 0, y: 0, width: 4, height: 3}, {defaultSymbol: 'x'});
      const newBox = Object.assign({}, box, {
        matrix: drawCorner(box.matrix, {x: 0, y: 0, width: 1, height: 1}, ['1']),
      });

      assert.strictEqual(renderBox(box), [
        'xxxx',
        'xxxx',
        'xxxx',
      ].join('\n'));
      assert.strictEqual(renderBox(newBox), [
        '1xxx',
        'xxxx',
        'xxxx',
      ].join('\n'));
    });
  });
});
