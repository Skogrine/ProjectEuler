function solution() {

    var n = 0, dow = 2;
    var months = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (var y = 1901; y <= 2000; y++) {

        months[1] = 28 + (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0);

        for (var month of months) {
            dow+= month % 7;
            if (dow % 7 === 0) {
            n++;
            }
        }
    }
    return n;
}
console.log(solution());