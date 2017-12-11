// @flow

const borderUtils = require('./border-utils');
const matrixUtils = require('./matrix-utils');
const rectangleUtils = require('./rectangle-utils');

/*::
import type {Coordinate} from './rectangle-utils';
import type {
  ElementSymbol,
  Element,
  Matrix,
} from './matrix-utils';
import type {Rectangle} from './rectangle-utils';

export type Borders = {
  topWidth: number,
  bottomWidth: number,
  leftWidth: number,
  rightWidth: number,
};
export type BoxId = string | null;
export type Box = {
  borders: Borders;
  // Now neither ANSI characters nor surrogate-pairs is considered.
  content: string,
  id: BoxId,
  matrix: Matrix,
  x: number,
  y: number,
};
 */


function initializeBox(
  rectangle/*: Rectangle*/,
  options/*: {
    id?: BoxId,
    symbol?: ElementSymbol,
  }*/ = {}
)/*: Box*/ {
  const fixedOptions = Object.assign({}, {
    id: null,
    symbol: null,
  }, options);

  const box = {};

  box.id = fixedOptions.id;
  box.x = rectangle.x;
  box.y = rectangle.y;
  box.content = '';
  box.borders = {
    topWidth: 0,
    bottomWidth: 0,
    leftWidth: 0,
    rightWidth: 0,
  };

  box.matrix = matrixUtils.initializeMatrix(rectangle, fixedOptions.symbol);
  if (!matrixUtils.validateMatrix(box.matrix)) {
    throw new Error('The matrix size is invalid');
  }

  return box;
}

function textToSymbolMatrix(text/*: string*/)/*: ElementSymbol[][]*/ {
  return text
    .replace(/\n+$/, '')
    .split('\n')
    .map(row => row.split(''));
}

function initializeBoxFromText(text/*: string*/)/*: Box*/ {
  const symbolMatrix = textToSymbolMatrix(text);

  const box = initializeBox({
    x: 0,
    y: 0,
    width: symbolMatrix[0].length,
    height: symbolMatrix.length,
  });

  for (let y = 0; y < symbolMatrix.length; y += 1) {
    for (let x = 0; x < symbolMatrix[0].length; x += 1) {
      const element = matrixUtils.getElement(box.matrix, {x, y});
      if (element) {
        element.symbol = symbolMatrix[y][x];
      } else {
        throw new Error('It is a branch only for "flow", so it does not pass here at run-time.');
      }
    }
  }

  return box;
}

function getElementByAbsoluteCoordinate(box/*: Box*/, coordinate/*: Coordinate*/)/*: Element | null*/ {
  return matrixUtils.getElement(box.matrix, {
    x: coordinate.x - box.x,
    y: coordinate.y - box.y,
  });
}

function setBorders(
  box/*: Box*/,
  options/*: {
    topWidth?: number,
    rightWidth?: number,
    bottomWidth?: number,
    leftWidth?: number,
    topSymbols?: (ElementSymbol | null)[],
    rightSymbols?: (ElementSymbol | null)[],
    bottomSymbols?: (ElementSymbol | null)[],
    leftSymbols?: (ElementSymbol | null)[],
    topRightSymbols?: (ElementSymbol | null)[],
    bottomRightSymbols?: (ElementSymbol | null)[],
    bottomLeftSymbols?: (ElementSymbol | null)[],
    topLeftSymbols?: (ElementSymbol | null)[],
  }*/ = {}
)/*: Box*/ {
  const fixedOptions = Object.assign({}, {
    topWidth: 0,
    rightWidth: 0,
    bottomWidth: 0,
    leftWidth: 0,
    topSymbols: [],
    rightSymbols: [],
    bottomSymbols: [],
    leftSymbols: [],
    topRightSymbols: [],
    bottomRightSymbols: [],
    bottomLeftSymbols: [],
    topLeftSymbols: [],
  }, options);

  const maxWidth = matrixUtils.getWidth(box.matrix);
  const maxHeight = matrixUtils.getHeight(box.matrix);

  let newBox = box;

  newBox = borderUtils.clearTopSide(newBox, fixedOptions.topWidth);
  newBox = borderUtils.clearBottomSide(newBox, fixedOptions.bottomWidth);
  newBox = borderUtils.clearLeftSide(newBox, fixedOptions.leftWidth);
  newBox = borderUtils.clearRightSide(newBox, fixedOptions.rightWidth);

  newBox = borderUtils.drawTopSide(
    newBox,
    fixedOptions.topWidth,
    fixedOptions.topSymbols,
    fixedOptions.leftWidth,
    maxWidth - fixedOptions.rightWidth
  );
  newBox = borderUtils.drawBottomSide(
    newBox,
    fixedOptions.bottomWidth,
    fixedOptions.bottomSymbols,
    fixedOptions.leftWidth,
    maxWidth - fixedOptions.rightWidth
  );
  newBox = borderUtils.drawLeftSide(
    newBox,
    fixedOptions.leftWidth,
    fixedOptions.leftSymbols,
    fixedOptions.topWidth,
    maxHeight - fixedOptions.bottomWidth
  );
  newBox = borderUtils.drawRightSide(
    newBox,
    fixedOptions.rightWidth,
    fixedOptions.rightSymbols,
    fixedOptions.topWidth,
    maxHeight - fixedOptions.bottomWidth
  );

  newBox = borderUtils.drawCorner(  // top-left
    newBox,
    {x: 0, y: 0,
      width: fixedOptions.leftWidth, height: fixedOptions.topWidth},
    fixedOptions.topLeftSymbols
  );
  newBox = borderUtils.drawCorner(  // top-right
    newBox,
    {x: maxWidth - fixedOptions.rightWidth, y: 0,
      width: fixedOptions.rightWidth, height: fixedOptions.topWidth},
    fixedOptions.topRightSymbols
  );
  newBox = borderUtils.drawCorner(  // bottom-left
    newBox,
    {x: 0, y: maxHeight - fixedOptions.bottomWidth,
      width: fixedOptions.leftWidth, height: fixedOptions.bottomWidth},
    fixedOptions.bottomLeftSymbols
  );
  newBox = borderUtils.drawCorner(  // bottom-right
    newBox,
    {x: maxWidth - fixedOptions.rightWidth, y: maxHeight - fixedOptions.bottomWidth,
      width: fixedOptions.rightWidth, height: fixedOptions.bottomWidth},
    fixedOptions.bottomRightSymbols
  );

  newBox.borders = {
    topWidth: fixedOptions.topWidth,
    bottomWidth: fixedOptions.bottomWidth,
    leftWidth: fixedOptions.leftWidth,
    rightWidth: fixedOptions.rightWidth,
  };

  return newBox;
}

function computeContentArea(box/*: Box*/)/*: Rectangle*/ {
  const maxHeight = matrixUtils.getHeight(box.matrix);
  const maxWidth = matrixUtils.getWidth(box.matrix);

  let contentArea = {
    x: 0,
    y: 0,
    width: maxWidth,
    height: maxHeight,
  };

  contentArea = rectangleUtils.shrinkRectangle(contentArea, {
    top: box.borders.topWidth,
    bottom: box.borders.bottomWidth,
    left: box.borders.leftWidth,
    right: box.borders.rightWidth,
  });

  return contentArea;
}

// TODO: child boxes
// TODO: cache
function render(
  box/*: Box*/,
  options/*: {
    defaultSymbol: ElementSymbol,
  }*/ = {
    defaultSymbol: ' ',
  }
)/*: string*/ {
  const outputBuffer/*: Matrix*/ = box.matrix.map(row => {
    return row.map(element => {
      return Object.assign({}, element, {
        symbol: element.symbol === null ? options.defaultSymbol : element.symbol,
      });
    });
  });

  if (box.content !== '') {
    const contentArea = matrixUtils.cropMatrix(outputBuffer, computeContentArea(box));
    if (contentArea) {
      matrixUtils.pourContent(contentArea, box.content);
    }
  }

  return outputBuffer
    .map(row => {
      return row.map(element => {
        return element.symbol === false ? '' : element.symbol;
      }).join('');
    })
    .join('\n');
}

module.exports = {
  initializeBox,
  initializeBoxFromText,
  render,
  setBorders,
};