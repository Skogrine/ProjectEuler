function evenFibSum(limit) {
    if (limit < 2)
        return 0;

    let ef1 = 0, ef2 = 2;
    let sum = ef1 + ef2;

    while (ef2 <= limit) {
        let ef3 = 4 * ef2 + ef1;

        if (ef3 > limit)
            break;
            
            ef1 = ef2;
            ef2 = ef3;
            sum += ef2;
    }

    return sum;
}

let limit = 4000000;
console.log("Résultat");
console.log(evenFibSum(limit));