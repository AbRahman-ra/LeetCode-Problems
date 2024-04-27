"use strict";
let allRowsAllowedValues = new Map();
let allColumnsAllowedValues = new Map();
let allSquaresAllowedValues = new Map();
let sq;
let emptyCells = 0;
// TIME LIMIT EXCEEDED
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
    // 
    // If board[i][j] !== "." skip
    // Otherwise, find the intersection of allowed values
    // If the intersection is one number, then:
    // board[i][j] = number
    // remove the number from allowed values for i, j & square
    for (let i = 0; i < 9; i++) {
        allRowsAllowedValues.set(i, possibleValuesRow(board[i]));
        allColumnsAllowedValues.set(i, possibleValuesColumn(board, i));
        allSquaresAllowedValues.set(i, possibleValuesSquare(board, i));
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === ".")
                emptyCells++;
        }
    }
    solve(board);
}
const solve = function (board) {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (board[row][column] === ".") {
                sq = getSquare(row, column);
                let allowed = possibleValuesIntersection(allRowsAllowedValues.get(row), allColumnsAllowedValues.get(column), allSquaresAllowedValues.get(sq));
                if (allowed.size === 1) {
                    let number = +allowed.keys().next().value;
                    board[row][column] = `${number}`;
                    allRowsAllowedValues.get(row)?.delete(number);
                    allColumnsAllowedValues.get(column)?.delete(number);
                    allSquaresAllowedValues.get(sq)?.delete(number);
                    emptyCells--;
                }
            }
        }
    }
    return emptyCells ? solve(board) : board;
};
// Rows & Columns are from 0 - 8
const getSquare = function (row, column) {
    return (row - row % 3) + (column - column % 3) / 3;
};
// Row is 0 - 8
const possibleValuesRow = function (boardRow) {
    let result = new Map();
    for (let i = 1; i <= 9; i++) {
        result.set(i, true);
    }
    for (let cell of boardRow) {
        if (cell !== ".")
            result.delete(+cell);
    }
    return result;
};
// Column is 0 - 8
const possibleValuesColumn = function (board, column) {
    let result = new Map();
    for (let i = 1; i <= 9; i++) {
        result.set(i, true);
    }
    for (let row of board) {
        if (row[column] !== ".")
            result.delete(+row[column]);
    }
    return result;
};
const possibleValuesSquare = function (board, square) {
    let result = new Map();
    for (let i = 1; i <= 9; i++) {
        result.set(i, true);
    }
    /**
     * 3 * sq = 3 * (row - row % 3) + (column - column % 3);
     * 0 1 2
     * 3 4 5
     * 6 7 8
     * 7 = r6 r8 c3 c5
     */
    let startRow = square - square % 3;
    let startColumn = 3 * (square % 3);
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startColumn; c < startColumn + 3; c++) {
            if (board[r][c] !== ".")
                result.delete(+board[r][c]);
        }
    }
    return result;
};
const possibleValuesIntersection = function (rowValues, columnValues, squareValues) {
    let result = new Map();
    for (let i = 1; i <= 9; i++) {
        if (rowValues.has(i) && columnValues.has(i) && squareValues.has(i))
            result.set(i, true);
    }
    return result;
};
/**
 * 0 1 2 3 4 5 6 7 8
 * 3 4 5
 * 6 7 8
 * 0 => 0-2, 0-2
 * 1 => 0-2, 3-5
 * 2 => 0-2, 6-8
 */
solveSudoku([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]);
