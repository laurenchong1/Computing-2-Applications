const factorial = function (n) {
    if (n < 0) {
        return 1;
    } else if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
};

// fibonacci(n) = fibonacci(n - 1) + fibonacci(n - 2)
// fibonacci(0) = 0, fibonacci(1) = 1
const fibonacci = function (num) {
    if (num <= 1) {
        return num;
    } else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
};

// lucas(0) = 2, and lucas(1) = 1
// Implement these, you should find lucas(10) = 123
const lucas = function (n) {
    if (n === 0) {
        return 2;
    } else if (n === 1) {
        return 1;
    } else if (n < 0) {
        return n;
    } else {
        return lucas(n - 1) + lucas(n - 2);
    }
};

const likeFibonacci = function (baseZero, baseFirst) {
    return function like(n) {
        if (n === 0) {
            return baseZero;
        } else if (n === 1) {
            return baseFirst;
        } else if (baseZero === 0 && baseFirst === 1) {
            return fibonacci(n)
        } else if (baseZero === 2 && baseFirst === 1) {
            return lucas(n)
        } else {
            return like(n - 1) + like(n - 2);
        }
    };
};


debugger;
const exercises = Object.create(null);

let cache = [0, 1];
const fibonacci = function (n) {
    if (cache[n] !== undefined) {
        return cache[n];
    }
    const result = fibonacci(n - 1) + fibonacci(n - 2);
    cache[n] = result;
    return result;
};

const fibonacci_2 = function (n, a, b) {
    if (n === 0) {
        return a;
    } else {
        return fibonacci_2(n - 1, b, a + b);
    }
};


const cat = {"name": "tiddles", "toy": "ball", "fleas": false};


let hedge_toy = "bone";
const encounter_hedge = function (animal) {
    [animal.toy, hedge_toy] = [hedge_toy, animal.toy];
    animal.fleas = true;
};

encounter_hedge(cat)


export default Object.freeze(exercises);
