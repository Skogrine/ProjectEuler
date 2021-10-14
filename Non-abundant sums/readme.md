# Solution 23 of Project Euler
## Non-abundant sums

<p align="center">
A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
<br><br>
A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.
<br><br>
As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.
<br><br>
Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
</p>

# Solution

With Problem 21, we figured out on how to calculate the sum of proper divisors already. We can recycle this knowledge here, since we need to decide based on this sum, if a number is a perfect number, an abundant or a deficient number. Since they already spoilered the upper limit of 28123, we need primes only up to  and can copy the sigma function over (I know, I should solve the prime generation with a sieve...):

```javascript
var fs = require('fs');
fs.readFile('./p022_names.txt', function(err, data) {
    console.log(solution(eval("[" + data.toString() + "]")));
});
```
The most important part is the sorting, for this job JavaScript has the nice feature of being able to alphabetically compare strings with the normal comparision operators. This results in a simple one-liner sorting. What follows is looping over the full array of names and multiplying the position with the ASCII-value:

```javascript
function solution(data) {

    data.sort((a, b) => (a > b) - (a < b));

    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum+= asciiValue(data[i]) * (i + 1);
    }
    return sum;
}
```
The ASCII-value itself can be computed by looping over a name and adding all the value, reduced by 64 each:

```javascript
function asciiValue(str) {

    var sum = 0;
    for (var i = str.length; i--; ) {
        sum+= str.charCodeAt(i) - 64;
    }
    return sum;
}
```

[The code](https://github.com/Skogrine/ProjectEuler/blob/main/Non%2dabundant%20sums/main.js)
