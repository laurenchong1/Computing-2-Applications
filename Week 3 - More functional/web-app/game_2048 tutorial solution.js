const game_2048 = Object.create(null);

////
// Functional programming toolkit
////

// takes an argument and returns the argument
const identity = (x) => x;

const map = (map_function) => (array) => array.map(map_function);

const filter = (filter_function) => (array) => array.filter(filter_function);

// Takes a preidcate, and an array, returns a boolean of whether every element
// in the given array follows the predicate (rule).
const every = (predicate) => (array) => array.every(predicate);

const any = (predicate) => (array) => array.some(predicate);

const transpose = (array) => array[0].map(
    (ignore, colIndex) => array.map((row) => row[colIndex])
);

// takes a function, takes arrays, takes the transpose of that array and
// performs the given function on each array using a map function
const zip = (f) => (...arrays) => transpose(arrays).map((args) => f(...args));

const most = (array) => array.slice(0, array.length - 1);

// takes a slice of an array: making a copy from the second number to the last
const rest = (array) => array.slice(1, array.length);

// I've tidied compose and pipe with arrow functions.
// Also changed it so multiple arguments can be accepted on the first call.

// compose applies each function, starting from the right
const compose = (...fs) => (...args) => most(fs).reduceRight(
    (a, f) => f(a),
    fs[fs.length - 1](...args)
);

/*pipe takes function(s), it then takes argument(s), then it
takes the functions (from second position to last) and reduces it.
The reduce function takes an accumulator a, an initial value f,
and then an index at the end.

Pipe will basically take these functions in an order, and apply
them to the initial value one by one, starting with the first
function (fs[0]).
*/
const pipe = (...fs) => (...args) => rest(fs).reduce(
    (a, f) => f(a),
    fs[0](...args)
);

const reduce = (reducer) => (array) => array.reduce(reducer);

const sum = reduce((a, x) => a + x);

////
// 2048 Specific helper functions
////

const row_flip = (row) => row.slice().reverse();

// I've replaced the array.map with a curried version of map.
const h_flip = map(row_flip);

// I've replaced the array.filter with a curried version of filter.
// Takes only the values that aren't zero and creates a newe array for inputting
const strip_zeros = filter((x) => x !== 0);

const combine_tiles = function (row, new_row = []) {
    if (row.length === 0) { // if nothing in the row, no oepration needed
        return new_row;
    }
    if (row.length === 1) { // if there is only one element
        return new_row.concat(row[0]); // no need for combine and just concat
    }
    // first looks at the first two elements of the array
    const [a, b, ...remaining] = row;
    if (a === b) { // if the elements next to each other are equal
        // return the function again, having added 1 to the same numbers
        // it reutrns the array with 0s and it repeats for the remaining.
        return combine_tiles(remaining, [...new_row, a + 1]);
    } else { // if first two are not the same, try again with second two, repeat
        return combine_tiles([b, ...remaining], [...new_row, a]);
    }
};

const pad_zeros = (row) => row.concat([0, 0, 0, 0]).slice(0, 4);

const row_left = pipe(
    strip_zeros, // creates array of values in row (without zeroes)
    combine_tiles, // combines the equal tiles that are next to each other
    pad_zeros
);

/* Using pipe to apply the functions in order, it removes all the zeros
and returns a new array of only the values. For each element in the new
array, it returns a new array of each value of 2 to the power of that
element. Then all the values in the array are summed for the final score.
*/
const row_score = pipe(strip_zeros, map((n) => 2**n), sum);

// takes two arguments, and returns boolean if equal
const equal = (a, b) => a === b;

// from equal function, performs two functions: zip(equal), which
// checks for all rows that they are equal, and every, which checks
// that for each row taken in, it returns the same row.
const row_equal = pipe(zip(equal), every(identity));

// does the same as row_equal, but for each element in each row.
const board_equal = pipe(zip(row_equal), every(identity));

////
// 2048 Public interface
////

// I've replaced the array.map with a curried version of map.
game_2048.left = map(row_left);

game_2048.right = compose(h_flip, game_2048.left, h_flip);

game_2048.up = compose(transpose, game_2048.left, transpose);

game_2048.down = compose(transpose, game_2048.right, transpose);

const moves = [
    game_2048.left,
    game_2048.right,
    game_2048.up,
    game_2048.down
];

game_2048.new_board = () => [
    [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
];

game_2048.score = pipe(map(row_score), sum);

// A move is valid if perfoming that move gives a different board configuration.
// returns a boolean to check if there are any valid moves.
game_2048.any_valid_moves = (board) => any( // defines a function "any"
// it takes a move from moves
    (move) => !board_equal(move(board), board)
)(moves);

/* Lets you know where the free spaces are by iterating through each row
then each element of each row. Uses a ternary operator to check if a tile is 0.
If it is then return an empty array, if not, it returns the coordinates.
*/
game_2048.free_spaces = (board) => board.flatMap(
    (row, j) => row.flatMap(
        (tile, i) => (
            tile === 0
            ? []
            : [[i, j]]
        )
    )
);

// maps each element over exactly (copies) first for rows then elements?
const clone = pipe(map, map)(identity);

// takes (board, indices, value). At the coordinate (indices),
// clones board and makes that coordinate the given value.
game_2048.add_tile = function (board, [i, j], value) {
    const result_board = clone(board);

    // In principle, this is a mutation.
    // But it's confined to the function, so as an interface is still pure.
    result_board[j][i] = value;

    return result_board;
};

const try_moves = function (board, move_list) {
    if (move_list.length === 0) {
        return board;
    }
    const trial = move_list[0](board);
    if (!board_equal(trial, board)) {
        return trial;
    }
    return try_moves(board, rest(move_list));
};

// The strategy here is to try doing a down, right, left, up move in order.
// It's not perfect, but it does pretty well.

// I've also changed the signature from the sheet to return the resulting board,
// rather than the move itself.
game_2048.best_move = (board) => try_moves(board, [
    game_2048.down, game_2048.right, game_2048.left, game_2048.up
]);

export default Object.freeze(game_2048);
