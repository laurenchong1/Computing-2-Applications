import game_2048 from "./game_2048.js";
const {left, right, up, down, score} = game_2048;

const print_boards = function (b1, b2) {
    const string_rows_1 = b1.map(String);
    const string_rows_2 = b2.map(String);
    const padding = ["       ", "  --\\  ", "  --/  ", "       "];
    const output = padding.map(
        (p, k) => string_rows_1[k] + p + string_rows_2[k] + "\n"
    ).reduce(
        (a, x) => a + x
    );
    console.log(output);
};

const board = [
    [1, 1, 2, 2],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 2, 2, 3]
];

const emptyBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const new_board = () => print_boards(emptyBoard, emptyBoard);

const any_valid_moves = function (board) {
    if (board === board.game_2048.left || board === board.game_2048.right
        || board === board.game_2048.up || board === board.game_2048.down) {
        return false
    } else {
        return true
    }
};


print_boards(board, down(board));
