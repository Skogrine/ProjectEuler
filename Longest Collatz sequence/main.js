var H = {1: 1};

function length(n) {

    if (H[n] === undefined) {
        H[n] = 1 + length(n % 2 ? 3 * n + 1 : n / 2);
    }
    return H[n];
}

function solution(n) {
    var max = 0, max_i = 0;
    for (var i = 1; i < n; i++) {
        var c = length(i);
        if (c > max) {
            max = c;
            max_i = i;
        }
    }
    return max_i;
}

console.log(solution(1000000));