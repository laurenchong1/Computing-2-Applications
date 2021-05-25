const empty = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

// NEW BOARD
const new_board = () => empty;

const transpose = (board) => board[0].map(
    (_, colIndex) => board.map((row) => row[colIndex])
);

// const red_move = (column) => (board) => {
//     let row = 5;
//     const col = column - 1;
//     if (board[row][col] === 0) {
//         board[row][col] = "R";
//     } else {
//         row--;
//         red_move(column)(board);
//     }
//     return board
// };

// RED MOVE
const red_move = (column) => (board) => {
    const col = column - 1;
    for (let row = 5; row > -1; row--) {
        if (board[row][col] === 0) {
            board[row][col] = "R";
            break;
        }
    } return board;
};

// YELLOW MOVE
const yellow_move = (column) => (board) => {
    const col = column - 1;
    for (let row = 5; row > -1; row--) {
        if (board[row][col] === 0) {
            board[row][col] = "Y";
            break;
        }
    } return board;
};

// STATUS
/* status = (board) => string,
"red to move", "yellow to move", "red win",
"yellow win", "draw"*/

const status = (board) => {
    if (board === empty) {return "red to move"}
    else if (board.redwin()) {return "red win"}
    else if (board.yellowwin()) {return "yellow win"}
    else if (board.redeven() )
}

debugger;