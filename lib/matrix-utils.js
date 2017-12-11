// @flow

const rectangleUtils = require('./rectangle-utils');

/*::
import {Coordinate} from './coordinate-utils';
import {Rectangle} from './rectangle-utils';

export type ElementSymbol = string;
export type Element = {
  x: number,
  y: number,
  // null  .. シンボルがないことを示す
  // false .. コンテンツ流し込み時に詰めることを表現するために使う内部用の値。
  //          Matrix に対して OutputBufferMatrix というここだけ変えた型を定義して分離しようとしたが、
  //          Flow が Comment Types で Generic Types が定義できないという問題が有り、
  //          似たような複数の型に対して処理を書くのが難しいので一旦止めた。
  symbol: ElementSymbol | null | false,
};
export type Matrix = Element[][];
 */


function initializeMatrix(rectangle/*: Rectangle*/, defaultSymbol/*: (ElementSymbol | null)*/)/*: Matrix*/ {
  const matrix = [];
  for (let y = 0; y < rectangle.height; y += 1) {
    matrix.push([]);
    for (let x = 0; x < rectangle.width; x += 1) {
      matrix[y].push({
        y,
        x,
        symbol: defaultSymbol,
      });
    }
  }
  return matrix;
}

function getElement(matrix/*: Matrix*/, coordinate/*: Coordinate*/)/*: Element | null*/ {
  const row = matrix[coordinate.y];
  if (!row) {
    return null;
  }
  return row[coordinate.x] || null;
}

function getWidth(matrix/*: Matrix*/)/*: number*/ {
  return matrix[0].length;
}

function getHeight(matrix/*: Matrix*/)/*: number*/ {
  return matrix.length;
}

function getMaxX(matrix/*: Matrix*/)/*: number*/ {
  return getWidth(matrix) - 1;
}

function getMaxY(matrix/*: Matrix*/)/*: number*/ {
  return getHeight(matrix) - 1;
}

function validateMatrix(matrix/*: Matrix*/)/*: boolean*/ {
  return (
    Array.isArray(matrix) &&
    matrix.length > 0 &&
    Array.isArray(matrix[0]) &&
    matrix[0].length > 0 &&
    matrix.every(row => row.length === matrix[0].length)
  );
}

function cropMatrix(matrix/*: Matrix*/, rectangle/*: Rectangle*/)/*: Matrix | null*/ {
  const newMatrix = [];

  for (let y = rectangle.y; y < rectangle.y + rectangle.height; y += 1) {
    const row = [];
    for (let x = rectangle.x; x < rectangle.x + rectangle.width; x += 1) {
      const element = getElement(matrix, {x, y});
      if (element) {
        row.push(element);
      }
    }
    if (row.length > 0) {
      newMatrix.push(row);
    }
  }

  if (!validateMatrix(newMatrix)) {
    return null;
  }

  return newMatrix;
}

// TODO: ANSI characters
//       Ref) https://github.com/chalk/slice-ansi
// TODO: Surrogate pairs
function parseContentToSymbols(content/*: string*/)/*: (ElementSymbol | '\n')[]*/ {
  return content.split('');
}

// TODO: multibyte characters
// TODO: consider word-wrap/word-break
// TODO: consider intentional overflow:hidden;
function pourContent(
  matrix/*: Matrix*/,
  content/*: string*/
)/*: void*/ {
  const maxWidth = matrix[0].length;
  const maxHeight = matrix.length;

  let yPointer = 0;
  let xPointer = 0;

  parseContentToSymbols(content).forEach(symbol => {
    if (symbol === '\n') {
      yPointer += 1;
      xPointer = 0;
    } else {
      if (xPointer === maxWidth) {
        yPointer += 1;
        xPointer = 0;
      }

      const element = getElement(matrix, {x: xPointer, y: yPointer});
      if (element) {
        element.symbol = symbol;
      }

      xPointer += 1;
    }
  });
}

module.exports = {
  cropMatrix,
  getElement,
  getHeight,
  getMaxX,
  getMaxY,
  getWidth,
  initializeMatrix,
  pourContent,
  validateMatrix,
};