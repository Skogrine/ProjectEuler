# Solution 7 of Project Euler
## 10001st prime

<p align="center">
By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
<br>
What is the 10.001st prime number?
</p>

# Solution

The easiest way to solve this problem is checking number by number if it's a prime and if so, incrementing a counter until 10001. Since every prime after 2 is odd, we can increment by two, which halves the actual search space. However, it is also known that all primes except 2 and 3 have the form `6k ± 1`, wich allows us to go in steps of 6. An implementation can then look as follows:

```javascript
function solution(L) {

  var c = 2;
  var n = 0;

  while (c < L) {

    n+= 6;

    if (isPrime(n + 1)) {
      c++;
    }

    if (isPrime(n - 1)) {
      c++;
    }
  }
  // Add one for the final prime being of the form 6k + 1
  return n + 1;
}
solution(10001);
```
A function isPrime is used in the solution. A primal check can be done by  looping from 2 to nn and check if any number on the way divides our number. If not, we found a prime. One optimization is to loop to `√n` instead of the whole space, since only multiples of already known primes remain above the limit. What we also can do is unrolling checks of multiples of 2 and 3, which allows us to loop in a stepwidth of 6, which however requires a check of every `i + 2` as well. The implementation can then be stated as:

```javascript
function isPrime(n) {

  if (n < 2)
    return false;

  if (n % 2 === 0)
    return n === 2;

  if (n % 3 === 0)
    return n === 3;

  var h = Math.floor(1 + Math.sqrt(n));
  var i = 5;

  while (i <= h) {
    if (n % i === 0)
      return false;
    if (n % (i + 2) === 0)
      return false;
    i+= 6;
  }
  return true;
}
```

As such, the complexity of isPrime is bound to `O(√n)`, which results in an overall complexity of `O(n√n)`. Using a sieve could speed up things here, but utilizes a space complexity of `O(n)`.


[The code](https://github.com/Skogrine/ProjectEuler/blob/main/Sum%20square%20difference/main.py)
