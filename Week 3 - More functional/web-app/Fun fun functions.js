const add = (first, second) => first + second; // adds
const sub = (first, second) => first - second; // subtracts
const mul = (first, second) => first * second; // multiplies
const f = (x) => x; // returns the given argument
const addf = (first) => (second) => first + second; // adds separately
const liftf = (binary) => (first) => (second) => binary(first, second);
const curry = (binary, first) => (second) => binary(first, second);

const inc = addf(1);
// const inc2 = liftf(add)(1);
// const inc3 = curry(add, 1)

const twice = (binary) => (a) => binary(a, a);
const reverse = (binary) => (first, second) => binary(second, first);
const composeu = (f, g) => (a) => g(f(a));
const composeb = (f, g) => (a, b, c) => g(f(a, b), c);

const limit = (binary, count) => function (a, b) {
    if (count >= 1) {
        count-- ;
        return binary(a, b);
    }
    return undefined;
}

const from = function (start) {
    return function () {
        let next = start;
        start += 1;
        return next;
    };
};

const to = function (gen, end) {
    return function () {
        let value = gen();
        if (value < end) {
            return value;
        }
        return undefined;
    };
}

const fromTo = function (start, end) {
    return to (from(start), end);
};

const element = function (arr, gen) {
    if (gen === undefined) {
        gen === fromTo(0, arr.length);
    }
    return function () {
        let index = gen () ;
        if (index !== undefined) {
            return arr[index]
        };
    };
}


const collect = function (gen, arr) {
    return function () {
        var value = gen();
        if (value !== undefined) {
            arr.push(value);
        }
        return value;
    };
}


const filter = function (gen, predicate) {
    return function () {
        var value;
        do {
            value = gen () ;
        } while (
            value !== undefined &&
            !predicate(value)
        );
        return value;
    };
}


// function filter(gen, predicate) {
//     return function recur() {
//         var value = gen() ;
//         if (
//             value === undefined
//             || predicate(value)
//         ) {
//             return value;
//         }
//         return recur();
//     };
// }


const concat = function (genOne, genTwo) {
    var gen = genOne;
    return function () {
        var value = gen() ;
        if (value !== undefined) {
            return value;
        }
        gen = genTwo;
        return gen();
    };
}

// Generates a symbol if you give it G: 'G1', 'G2', ...
const gensymf = function (prefix) {
    var number = 0
    return function () {
        number++ ;
        return prefix + number;
    };
}

const fibonaccif = function (a, b) {
    return function () {
        var next = a;
        a = b;
        b += next;
        return next;
    }
};


// Object oriented programming
const counter = function (value) {
    return {
        up: function () {
            value ++ ;
            return value;
        },
        down: function () {
            value -- ;
            return value;
        }
    };
}


const revocable = function (binary) {
    return {
        inovke: function () {
            if (binary !== undefined) {
                return binary(
                    first,
                    second
                );
            }
        },
        revoke: function () {
            binary = unndefined ;
        }
    };
}


const m = function (value, source) {
    return {
        value: value,
        source: (typeof source === "string")
            ? source
            : String(value)
    };
}

const addm = function (m1, m2) {
    return m(
        add(m1.value, m2.value),
        `(${m1.source}+${m2.source})`
    );
};


const liftm = function (binary, op) {
    return function (m1, m2) {
        if (typeof m1 === "number") {
            m1 = m(m1) ;
        }
        if (typeof m2 === "number") {
            m2 = m(m2) ;
        }
        return m(
            binary(m1.value, m2.value),
            "(" + m1.source + op
            +m2.source + ")"
        ) ;
    } ;
}







debugger;