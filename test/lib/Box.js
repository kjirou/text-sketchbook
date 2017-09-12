const assert = require('assert');

const Box = require('../../lib/Box');


describe('lib/Box', function() {
  describe('constructor', function() {
    it('should not throw an error', function() {
      assert.doesNotThrow(() => {
        new Box({x: 0, y: 0, width: 3, height: 4}, {symbol: 'x'});
      });
    });
  });
});