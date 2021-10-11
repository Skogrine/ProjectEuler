# Solution 3 of Project Euler
## Largest prime factor

<p align="center">
The prime factors of 13195 are 5, 7, 13 and 29.<br><br>
What is the largest prime factor of the number 600851475143?</p>

# Solution

Factorizing a number is a quite common problem and I'll not go into details here. A pretty straighforward implementation can be stated as this:

```javascript
function factorize(num) {
    var factors = {};

    var n = num;
    var i = 2;

    function count(n) {
        if (factors[n])
            ++factors[n];
        else
            factors[n] = 1;
    }

    while (i * i <= n) {

        while (n % i === 0) {
            n/= i;
            count(i);
        }
        i++;
    }

    if (n !== num) {
        if (n > 1)
            count(n);
    } else {
        count(num);
    }
    return factors;
}
```
With it, the problem can be solved quite easily:

```javascript
function solution(n) {

    var tmp = factorize(n);
    var max = 0;
    for (var i in tmp) {
        max = Math.max(max, i);
    }
    return max;
}
```
Alternatively, we can combine the two functions into a much smaller one, custom tailored for this task. Since the largest prime has an exponent of 1, we don't need extra checks and can go with (otherwise the commented out check is needed):

```javascript
function solution(n) {

  for (var i = 2; i * i <= n; i++) {
    while(n % i === 0 /* && i * i <= n */) {
      n/= i;
    }
  }
  return n;
}
solution(600851475143);
```

[The code](https://github.com/Skogrine/ProjectEuler/blob/main/Even%20Fibonacci%20numbers/main.js)
