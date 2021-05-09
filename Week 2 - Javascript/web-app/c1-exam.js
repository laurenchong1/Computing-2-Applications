/**
 * This worksheet adapts the final question of Exam 1 of Computing 1 2020/21.
 * Here you should complete each of the functions as they are specified.
 * Of course, this time, the code is in Javascript.
 *
 * Original Python Code and Exam, Becky Stewart @TheLeadingZero.
 */
const Exam = Object.create(null);

// Lists

// Write a function that returns a list containing every third item in
// the original list starting with the first item.
//    for example:
//      an input list of [1,2,3,4,5,6,7,8]
//      returns [1,4,7]
Exam.every_third = function numbers(array) {
    return array.filter((ignore, k) => k % 3 === 0);
};


// Strings

// Write a function that concatenates two sentences passed as inputs.
// The returned string is the first word from the first sentence,
// then the first word from the second sentence, alternating back forth.
// If the sentences are not the same number of words, a "ValueError" is thrown.
//    for example:
//       the input sentences "the cow jumped over the moon" and
//                            "jack and jill went up the"
//       returns "the jack cow and jumped jill over went the up moon the"
Exam.merge_sentences = function words(sentenceOne, sentenceTwo) {
    const wordsOne = sentenceOne.split(" ");
    const wordsTwo = sentenceTwo.split(" ");
    if (wordsOne.length !== wordsTwo.length) {
        throw "ValueError";
    }
    return wordsOne.flatMap((v, k) => [v, wordsTwo[k]]).join(" ");
};


// Write a function that returns the number of lowercase letters in
// input string.
//     for example:
//          the input "sPonGe bOb"
//          returns 6
// Exam.lowercase_count = function countLowers(letters) {
//     let count = 0
//     for (const char of letters) {
//         if (char.match(/[a-z]/)){
//             count++
//         }
//     }
//     return count;
// };

Exam.lowercase_count = function countLowers(string) {
    const letters = string.split("")
    return letters.filter(chars => chars !== chars.toUpperCase()).length
}

// Objects

// Write a function that returns the longest key in the input object
// whose keys are all strings.
Exam.longest_key = function (objectOne) {
    return Object.keys(objectOne).reduce((acc, val) => (
        acc.length >= val.length
        ? acc : val
    )); // referred to answers, I get it but need to try and revise
    // understanding of method structure of .reduce()
};

// Write a function that returns the largest value that is an even value in the
// input dictionary whose values are all whole numbers.
Exam.value_greatest_even = function (object) {
    const evenNums = Object.values(object).filter(num => num % 2 === 0);
    return evenNums.reduce((acc, val) => (
        acc > val
        ? acc : val
    ));
};


// Arguments

// Write a function with two input arguments "username" and "location".
// The function should return text "Hello, {name}, how is {location}?".
//
// The username argument should not be set to a default,
// but the location argument should default to "London".
Exam.greeting = function (username, location = "London") {
    return "Hello, " + username + ", how is " + location + "?"
};

/* A more efficient approach: using tilda for strings and $ before arguments
Exam.greeting = function (name, location = "London") {
    return `Hello, ${name}, how is ${location}?`;
};
*/

// Write a function three input arguments,
// the first one, x, is required and the second two are
// the following keywords with default values:
//     scalar with a default of 1
//     offset with a default of 0
// The function returns the calculation x * scalar + offset for the input x
// if the output value of the calculation is positive, otherwise it returns 0.
Exam.floor_line = function (x, scalar = 1, offset = 0) {
    let out = x * scalar + offset
    if (out >= 0) {
        return out
    } else {
        return 0
    }
};

export default Object.freeze(Exam);
