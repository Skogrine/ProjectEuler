# Solution 11 of Project Euler
## Largest product in a grid

<p align="center">
In the 20×20 grid below, four numbers along a diagonal line have been marked in red.
<br><br>
08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08<br>
49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00<br>
81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65<br>
52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91<br>
22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80<br>
24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50<br>
32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70<br>
67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21<br>
24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72<br>
21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95<br>
78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92<br>
16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57<br>
86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58<br>
19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40<br>
04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66<br>
88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69<br>
04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36<br>
20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16<br>
20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54<br>
01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48<br>
<br>
The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
<br>
What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid?
</p>

# Solution

Project Euler authors seem to like these grid-searches, Problem 8 was quite similar. However, this time we have to find all groups of numbers, whose product is the greatest.

For horizontal products we scan from `x = 0` to `c- k + 1`, with `c := 20` and `k := 4`, for every `y` coordinate. For vertical products we scan from `y = 0` to `y = r - k + 1` with `r := 20`, for every `x` coordinate.

For the diagonals the same bounds are true and the first diagonal can be constructed accordingly. The second must be inverted. So the solution is, that we scan over the full matrix and build factors that will be maximized if they fall into a valid range.

```javascript
var arr = [
    [08, 02, 22, 97, 38, 15, 00, 40, 00, 75, 04, 05, 07, 78, 52, 12, 50, 77, 91, 08],
    [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 04, 56, 62, 00],
    [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 03, 49, 13, 36, 65],
    [52, 70, 95, 23, 04, 60, 11, 42, 69, 24, 68, 56, 01, 32, 56, 71, 37, 02, 36, 91],
    [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80],
    [24, 47, 32, 60, 99, 03, 45, 02, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50],
    [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70],
    [67, 26, 20, 68, 02, 62, 12, 20, 95, 63, 94, 39, 63, 08, 40, 91, 66, 49, 94, 21],
    [24, 55, 58, 05, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72],
    [21, 36, 23, 09, 75, 00, 76, 44, 20, 45, 35, 14, 00, 61, 33, 97, 34, 31, 33, 95],
    [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 03, 80, 04, 62, 16, 14, 09, 53, 56, 92],
    [16, 39, 05, 42, 96, 35, 31, 47, 55, 58, 88, 24, 00, 17, 54, 24, 36, 29, 85, 57],
    [86, 56, 00, 48, 35, 71, 89, 07, 05, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58],
    [19, 80, 81, 68, 05, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 04, 89, 55, 40],
    [04, 52, 08, 83, 97, 35, 99, 16, 07, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66],
    [88, 36, 68, 87, 57, 62, 20, 72, 03, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69],
    [04, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 08, 46, 29, 32, 40, 62, 76, 36],
    [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 04, 36, 16],
    [20, 73, 35, 29, 78, 31, 90, 01, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 05, 54],
    [01, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 01, 89, 19, 67, 48]
];


function get(arr, y, x) {

  if (0 <= y && y < arr.length && 0 <= x && x < arr[y].length) {
    return arr[y][x];
  }
  return 0;
}

function solution(arr, k) {

  var max = 0;

  for (var y = 0; y < arr.length; y++) {
    for (var x = 0; x < arr.length; x++) {

      var p1 = 1, p2 = 1, p3 = 1, p4 = 1;

      for (var i = 0; i < k; i++) {
        p1*= get(arr, y, x + i);
        p2*= get(arr, y + i, x);
        p3*= get(arr, y + i, x + i);
        p4*= get(arr, y + i, x - i);
      }
      max = Math.max(p1, p2, p3, p4, max);
    }
  }
  return max;
}
solution(arr, 4);
```

Since the inner product building is always the same with different offsets, we can formulate it even shorter:

```javascript
function solution(arr, k) {

  var max = 0;

  var dx = [1, 0, 1,-1];
  var dy = [0, 1, 1, 1];

  for (var y = 0; y < arr.length; y++) {
    for (var x = 0; x < arr[y].length; x++) {
      for (var d = 0; d < 4; d++) {
        var p = 1;
        for (var i = 0; i < k; i++) {
          p*= get(arr, y + i * dy[d], x + i * dx[d]);
        }
        max = Math.max(p, max);
      }
    }
  }
  return max;
}
solution(arr, 4);
```

[The code](https://github.com/Skogrine/ProjectEuler/blob/main/Largest%20product%20in%20a%20grid/main.js)
