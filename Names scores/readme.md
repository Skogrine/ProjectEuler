# Solution 22 of Project Euler
## Names scores

<p align="center">Using p022_names.txt, a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.
<br><br>
For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.
<br><br>
What is the total of all the name scores in the file?
</p>

# Solution

The first observation of the given file is that it's in a CSV format, separated with commas and encapsulated in quotes, all values are upper case and everything is on a single line. The easiest way to parse this in JavaScript is simply adding brackets around the contents and parsing it with eval() as an array:

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

[The code](https://github.com/Skogrine/ProjectEuler/blob/main/Names%20scores/main.js)
