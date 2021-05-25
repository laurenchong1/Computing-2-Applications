const game_2048 = Object.create(null);

// const board = [
//     [1, 1, 2, 2],
//     [1, 0, 0, 1],
//     [0, 0, 1, 1],
//     [0, 2, 2, 3]
// ];


// [1, 1, 2, 2]
// [1, 1, 2, 2] // strip_zeros
// [2, 3] // combine_tiles
// [2, 3, 0, 0] // pad_zeros


// [1, 0, 0, 1]
// [1, 1]
// [2]
// [2, 0, 0, 0]

// [2, 0, 0, 0]

// const left = [
//     [2, 3, 0, 0],
//     [2, 0, 0, 0],
//     [2, 0, 0, 0],
//     [3, 3, 0, 0]
// ];


// const h_flip = [
//     [2, 2, 1, 1],
//     [1, 0, 0, 1],
//     [1, 1, 0, 0],
//     [3, 2, 2, 0]
// ];

// const h_flip_left = [
//     [3, 2, 0, 0],
//     [2, 0, 0, 0],
//     [2, 0, 0, 0],
//     [3, 3, 0, 0]
// ];

// const h_flip_left_h_flip = [
//     [0, 0, 2, 3],
//     [0, 0, 0, 2],
//     [0, 0, 0, 2],
//     [0, 0, 3, 3]
// ];

// const right = [
//     [0, 0, 2, 3],
//     [0, 0, 0, 2],
//     [0, 0, 0, 2],
//     [0, 0, 3, 3]
// ];

// The identity function returns whatever it is passed. i.e does nothing.
const identity = (x) => x;

const row_flip = (row) => row.slice().reverse();

const h_flip = (board) => board.map(row_flip);

const strip_zeros = (row) => row.filter((x) => x !== 0);

// row:     [3]
// new_row: [2, 2]

// [a, b, ...rest] = [1, 1, 2, 3]
// a = 1
// b = 1
// rest = [2, 3]

// combine_tile([1, 1, 2, 2])
// combine_tile([1, 1, 2, 2], [])
// combine_tile([2, 2], [2])
// combine_tile([], [2, 3])
// [2, 3]

// combine_tiles([1, 2, 2, 3])
// combine_tiles([1, 2, 2, 3], [])
// combine_tiles([2, 2, 3], [1])
// combine_tiles([3], [1, 3])
// [1, 3, 3]

const combine_tiles = function (row, new_row = []) {
    if (row.length === 0) {
        return new_row;
    }
    if (row.length === 1) {
        return new_row.concat(row[0]);
    }
    const [a, b, ...rest] = row;
    if (a === b) {
        return combine_tiles(rest, new_row.concat(a + 1));
    } else {
        return combine_tiles([b].concat(rest), new_row.concat(a));
    }
};

const transpose = (array) => array[0].map(
    (ignore, colIndex) => array.map((row) => row[colIndex])
);

const compose = function (...fs) {
    return function (value) {
        return fs.reduceRight(function (a, f) {
            return f(a);
        }, value);
    };
};

const pipe = function (...fs) {
    return function (value) {
        return fs.reduce(function (a, f) {
            return f(a);
        }, value);
    };
};

// const pad_zeros = (row) => row.concat((new Array(4 - row.length)).fill(0));

const pad_zeros = (row) => row.concat([0, 0, 0, 0]).slice(0, 4);

// const row_left = (row) => pad_zeros(combine_tiles(strip_zeros(row)));

// const row_left = compose(pad_zeros, combine_tiles, strip_zeros);

const row_left = pipe(
    strip_zeros,
    combine_tiles,
    pad_zeros
);

const transpose = (board) => board[0].map(
    (_, colIndex) => board.map((row) => row[colIndex])
);

game_2048.left = (board) => board.map(row_left);

// game_2048.right = (board) => h_flip(game_2048.left(h_flip(board)));
game_2048.right = compose(h_flip, game_2048.left, h_flip);

game_2048.up = compose(transpose, game_2048.left, transpose);

game_2048.up = (board) => transpose(game_2048.left(transpose(board)));

game_2048.down = (board) => transpose(game_2048.right(transpose(board)));

// const board = [
//     [1, 1, 2, 2],
//     [1, 0, 0, 1],
//     [0, 0, 1, 1],
//     [0, 2, 2, 3]
// ];

const board = [
    [1, 2, 3, 4],
    [2, 1, 4, 3],
    [3, 4, 1, 2],
    [4, 1, 2, 3]
];


game_2048.new_board = () => [
    [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
];

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

// score = (board) => number, write a score function which takes a board and
// returns the score for that board. 0 tiles score zero, all other numbered
// tiles score 2**n points.

// game_2014.score = function(board) {
//     let out = 0;
//     const listOfNums = board.flat();
//     listOfNums.forEach(function(num) {
//         if (num === 0) {
//             out = out;
//         } else {
//             out = out + 2**num;
//         }
//         return out;});
// };

// Freddie's Version

game_2048.score = pipe(map(row_score), sum);

const pipe = (...fs) => (...args) => rest(fs).reduce(
    (a, f) => f(a),
    fs[0](...args)
);

const reduce = (reducer) => (array) => array.reduce(reducer);

const sum = reduce((a, x) => a + x);

const row_score = pipe(strip_zeros, map((n) => 2**n), sum);

const equal = (a, b) => a === b;

const row_equal = pipe(zip(equal), every(identity));

const board_equal = pipe(zip(row_equal), every(identity));




// Checks if each move done does nnot change the board. If all moves
// do not change the board, then return false, otherwise true.

const any_valid_moves = function (board) {
    if (board === left(board) && board === right(board)
        && board === up(board) && board === down(board)) {
        return false
    } else {
        return true
    }
};

export default Object.freeze(game_2048);

