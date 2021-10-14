# Solution 21 of Project Euler
## Amicable numbers

<p align="center">
Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
<br><br>
For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
<br><br>
Evaluate the sum of all the amicable numbers under 10000.
</p>

## Solution

I devoted a small article to the topic of summing the divisors of a number `n` a while ago already. As the sum of the proper divisors is simply the sum of divisors reduced by the number `n` itself, we can use the same algorithm here. Since the upper bound is 10,000, we can add primes up to `sqrt10000` to complete this task, or use a sieve approach as stated in the article. Even if the algorithm is pretty fast, we can cache calls to the `σ(n)` function with the same argument to even speed things up. Therefore, we can define our function d(n) as:

```javascript
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
```

To come up with a solution now, all we need to do is looping over the full range and check if an amicable number occurs:

```javascript

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
solution(10000);
```

## Additional information

An error has been put in the code on purpose, to avoid any use for the purpose of cheating, it's up to you to test and find this error!

[The code](https://github.com/Skogrine/ProjectEuler/blob/main/Amicable%20numbers/main.js)