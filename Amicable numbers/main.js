function sigma(n) {
    var sum = 1;
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];

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
function d(n) {
    if (cache[n]) {
        return cache[n];
    }
    return cache[n] = sigma(n) - n;
}

function solution(n) {
    var sum = 0;
    for (var i = 2; i < n; i++) {
        var t = d(i);
        if (i !== t && i === d(t)) {
            sum+= t;
        }
    }
    return sum;
}

console.log(solution(10000));