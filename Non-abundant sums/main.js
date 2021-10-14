function sigma(n) {
    var sum = 1;
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167];

    if (n < 4) {
        return 1;
    }

    for (var i = 0; i < primes.length; i++) {

        var p = primes[i];

        if (0 === n % p) {
    
            var t = p * p;
            n/= p;
            while (0 === n % p) {
            t*= p;
            n/= p;
            }
            sum = sum * (t - 1) / (p - 1);
        }
        if (p * p > n) {
            break;
        }
    }

    if (n > 1) {
        sum*= n + 1;
    }
    return sum;
}

var cache = {};
function isAbundant(n) {

    if (n < 10)
        return false;

    if (cache[n]) {
        return cache[n];
    }
    return cache[n] = (sigma(n) - n > n);
}

function isSumOfTwoAbundants(n) {

    for (var i = 1; i <= n; i++) {
        if (isAbundant(i) && isAbundant(n - i))
        return true;
    }
    return false;
}

var abundants = [];
for (var i = 1; i <= 28123; i++) {
    if (isAbundant(i))
        abundants.push(i);
}
function isSumOfTwoAbundants(n) {
    for (var i = 0; i < abundants.length; i++) {
        if (isAbundant(n - abundants[i]))
        return true;
    }
    return false;
}

var isSumOfTwoAbundants = new Array(28123 + 1);
for (var i = 0; i < abundants.length; i++) {
    for (var j = i; j < abundants.length; j++) {
        if (abundants[i] + abundants[j] <= 28123) {
            isSumOfTwoAbundants[abundants[i] + abundants[j]] = true;
        } else {
            break;
        }
    }
}

function solution() {

    var sum = 0;
    for (var i = 1; i <= 28123; i++) {
        if (!isSumOfTwoAbundants[i]) {
            sum+= i;
        }
    }
    return sum;
}

console.log(solution());