const empty = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

// const empty = [
//     ['.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.'],
//     ['.', '.', '.', '.', '.', '.'],
// ];

let board = empty

const new_board = function() {
    board = empty
    return board
}

const transpose = (board) => board[0].map(
    (_, colIndex) => board.map((row) => row[colIndex])
);

const compose = (f) => 

/* Red = "X" so this function takes a column number, and makes
the first row of that column that is equal to "0" an "X".
Transpose the board first, to read it horizontally
Check: if all empty, add at last column. If last is true,
add to second, if last 2 is true add to column - 1.
Then, transpose back again.
*/

const addRedInGivenColumn = function (col, board) {
    transpose()
}

const red_move = (column) => (board) => addRedInGivenColumn(board)

debugger;