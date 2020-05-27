/*
    Question: 

    Solution: 
*/

/*

**********************SOLUTION**********************
*/

/*
    Question 1: Is Unique. Implement an algorithm to determine if a string has all unique characters. 
    What if you cannot use additional data structures.

    Solution : Iterate through the string and map characters to an object that will track if character has already 
    appeared.
        O(n)
    Less optimal : Iterate through string while iterating through the string to make sure no characters match.
        O(n^2)
*/

const isUnique = (s) => {
  let obj = {};
  for (let i = 0; i < s.length; i++) {
    if (!obj[s[i]]) obj[s[i]] = 1;
    else {
      obj[s[i]]++;
      return false;
    }
  }
  return true;
};

/*

**********************SOLUTION**********************

CTCI Solution Summary

  1. Fist, ask if the string is unicode or ASCII. If it is not ASCII, then the we will have to increase the storage size. 
  
  2. Then, create an array of 128 items long, filling each value with a boolean. There are only 128 possibilities before there has to be a repeat.
  
  3. Create an object that you will check against to see whether or not the character has appeared yet.

  4. If a character has appeared, then return false. If it hasn't then just record it.


  --
  boolean isUniqueChars(String str) {
    if (str.length() > 128) return false;

    boolean[] char_set = new boolean[128];
    for (int i = 0; i < str.length(); i++) {
      int val = str.charAt(i);
      if (char_set[val]) return false
      char_set[val] = true;
    }
    return true;
  }
  --

  ** If you can't use additional data structures, then using two for loops to check the string would be the solution. O(n^2) **

*/

// console.log(isUnique('qwertyuiop'));
// console.log(isUnique('qwertyuiopp'));

/*
    Question 2: Check Permutation. Given two strings, write a method to decide if one is a permutation of the other.

    Solution : Loop through string, mapping characters to an object. Do the same on the second string. And if at the 
    end the two objects have the same entries / keys, then it will be true. Otherwise, there was a character missing 
    or added which means it can't be a permutation.
    

*/

const compareTwoObjs = (obj1, obj2) => {
  let objOne = Object.entries(obj1).sort();
  let objTwo = Object.entries(obj2).sort();
  return JSON.stringify(objOne) == JSON.stringify(objTwo);
};

const checkPermutation = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  let obj1 = {};
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  for (let i = 0; i < s1.length; i++) {
    !obj1[s1[i]] ? (obj1[s1[i]] = 1) : obj1[s1[i]]++; // If the character doesn't exist in the object, then set it to one. Else iterate its value in the object.
  }
  let obj2 = {};
  for (let i = 0; i < s2.length; i++) {
    !obj2[s2[i]] ? (obj2[s2[i]] = 1) : obj2[s2[i]]++;
  }

  return compareTwoObjs(obj1, obj2);
};

// checkPermutation('abcd', 'dcBA');
// checkPermutation('abcs', 'assc');

/*

**********************SOLUTION**********************

  Solution #1 - Sort the strings
    - Actually really simple, can't believe I didn't think of it.
    - If they are permutations, then they will have the same characters. If they are both sorted then the string returned by both should be the 
    same. 
    - The book says that this isn't the most optimal. The method used in the book was the internal .sort() function used by Java so the 
    time complexity is whatever the runtime of that method is.

  Solution #2 - Check if two strings have identical character counts
    - Sorta like my solution. Except that they don't sort the object and then compare it. Instead, a second for loop is made and the keys are
    individually checked against one another. This is more efficient then my solution, JavaScripts .sort runtime is nlogn which is scales slightly more
    than n.

  -- wtf java
    boolean permutation(String s, String t) {
      if (s.length() != t.length()) return false;

      int[] letters = new int[128]; // Assumption

      chars[] s_array = s.toCharArray)();

      for (char c : s_array) letters[c]++ // count appearance of each char

      for (int i = 0; i < t.length(); i++) {
        int c = (int) t.charAt(i);
        letters[c]--;
        if (letters[c] < 0) return false
      }
      return true;
    }
  --

*/

/*
    Question: URLify. Write a method to replace all spaces in a string with '%20'. You may assume that the string
    has sufficient space at the end to hold the additional characters, and that you are given the "true" length of
    the string. (Note : If implementing in Java, please use a character array so that you can perform this operation
    in place.)

    Solution: Loop to the supplied true length and replace all empty spaces with %20.
*/

const URLify = (s, n, r = '%20') => {
  let sNew = '';
  for (let i = 0; i < n; i++) {
    if (s[i] == ' ') {
      sNew += r;
      n -= r.length;
    } else if (s[i] != ' ') sNew += s[i];
  }
  return sNew;
};

console.log(URLify('www.google.com/ yo/ yo', 19));

/*
**********************SOLUTION**********************
  SO I got this solution, but I didnt account for the fact that the '%20' takes up 3 spaces. So same approach except subract from the 'true length'
  as you iterate through. ie. n -= r.length;
*/

/* 
    Question: Palindrome Permutation. Given a string, write a function to check if it is a permutation of a palindrome.
     A palindrome is a word or phrase that is the same forwards or backwards. A permutation is a rearrangement of 
     letters. The palindrome does not need to be limited to just dictionary words.

    Solution: Loop through the string mapping the characters to an object. 
        - IF the length of the string is even, then make sure that all keys have a value within the domain of 2^n

        - IF the length of the string is odd, then it will have to pass the above condition with one exception 
        for the character in the middle. If there isn't a separate character with a value of one but there is
        a key that is one over a value in 2^n then we can also say that it is true.

    Honestly, this one is pretty spicy
*/

// const returnSum = (arr) => {
//   let sum = 0;
//   arr.forEach((value) => (sum += value));
//   return sum;
// };

// const exponentOfTwo = (num) => {
//   // Runtime is faster than linear. ~ O(log(n))
//   let currentValue = 0;
//   for (let i = 1; currentValue <= num; i++) {
//     currentValue = Math.pow(2, i);
//     if (currentValue === num) return true;
//     else if (currentValue > num) return false;
//   }
//   return null;
// };

const permutationPalindrome = (s) => {
  let chars = {};
  let stringLength = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      if (!chars[s[i]]) chars[s[i]] = 1;
      else chars[s[i]]++;
      stringLength++;
    }
  }

  let values = Object.values(chars);
  // let stringLength = returnSum(values); // length without spaces. s.length() would be much more optimal but it would account for white spaces too

  if (stringLength % 2 === 0) {
    // if even
    for (let i = 0; i < values.length; i++) {
      let boolean = values[i] % 2 === 0 ? true : false;
      if (!boolean) return false;
    }
    return true;
  }
  if (stringLength % 2 !== 0) {
    // if odd
    let singleOdd = true;
    for (let i = 0; i < values.length; i++) {
      let boolean = values[i] % 2 === 0 ? true : false;
      if (!boolean && !singleOdd) return false;
      if (!boolean) singleOdd = false;
    }
    return true;
  }
  return null;
};

console.log(permutationPalindrome('taco cat')); // true, 'tac ocat'

/*
**********************SOLUTION**********************

  I got this solution wrong and it's messy so this will be a good one. I made the mistake when I thought that the amount of times a character
  shows up has to be in the domain of 2^n. Instead, the values just have to be even - so no remainder when divided by 2 recursively { n % 2 === 0 }.
  In an even length string, all values will have to be even. But in an odd length string, one value is allowed to be odd. This is because of the 
  middle position. If it is odd then the middle position is immutable even if it is read backwards.

  -- An alternate solution to this would be to check if the characters are valid while sorting. Honestly, this one just sounds kinda complex
  and the book even states that it is not more optimal, potentially less even. It's also kinda pointless because the final answer is reached
  only at the end. This is also true in the first solution so why not just seperate the logic.

  -- There is another even more complex solution which I won't explain but it is linear just like the others. This solution isn't optimal because
  of the time it takes to type it lol.

  -- Another possible solution could be to turn the string into two arrays spliced in the middle. If it's odd, then exlude the center character.
  Reverse one of the arrays and then compare the arrays. If they are even (contain the same values), then return true. I just made this one up
  so I'm proud but the runtime is gonna be linear because of the second part where we compare each key / value. In the first part, JavaScript
  .splice() function is worst case linear so that's good. This solution actually might be more optimal if the method
  usedto compare the array was a constant operation. So assuming the comparison method was constant, which I thinkt there's a way. Then 
  this solutions runtime would be dependant on the reverse runtime(linear) && splice() function. Which is worst case linear, and I can't find what the best case is. 
  But if that method could be made consant then this method would have a faster runtime. Lots of assumtions tho so not sure. Also, you have to 
  remove white spaces so it's more optimal to go with the the hashmap method.

*/

/*
    Question: One Away. There are three types of edits that can be perfomed on strings: insert a character, 
    remove a character, or replace a character. Given two strings, write a function to check if they are one edit 
    (or zero edits) away.

    Solution: 
*/

const kAway = (s1, s2, k = 1) => {
  if (Math.abs(s1.length - s2.lenght) > k) return false;
  let m = k;
  let longestString = s1.length > s2.length ? s1.length : s2.length;
  for (let i = 0; i < longestString; i++) {
    if (s1[i] !== s2[i]) m--;
  }
  return m >= 0;
};

/*

**********************SOLUTION**********************
  I got this wrong. There is an edge case where if you remove some character in the middle, then the indexing of the characters after
  that weren't deleted get changed - which in my solution those are counted as edits which they aren't. Instead a while loop should be used 
  and two pointers should be used to be able to deal with that. The runtime will be O(max(n,m)), because it'll run until the the longest string. 
  You can tighten that up by checking simultaneously if k edits have been passed, if true then just return fals. Not sure how
  to express that in big o notation.


  --
  boolean oneEditAway(String first, String second) {
   if (Math.abs(first.length() - second.length()) > 1) return false;

   String s1 = first.length() > second.length() ? first.length() : second.length(); // longer
   String s2 = first.length() < second.length() ? first.length() : second.length(); // shorter

   int index1 = 0;
   int index2 = 0;

   boolean foundDifference = false;
   while(index1 < s1.length() && index2 < s2.length())  {
   if (s2.charAt(index2) != s1.charAt(index1)) {
    if(foundDifference) return false;
    if (s2.length() === s1.length()) index2++
   } else index2++;
   index1++
   }
   return true;
  }
  --

*/

/*
    Question: String Compression, implement a method to perform basic string compression using the counts of 
    repeated characters.For ex, 'aabcccccaaa' would become 'a2b1c5a3'.If the compressed string would not become smaller
    than the original string, return the original string.You can assume the string only has uppercase and lowercase
    letters(a - z).

*/

// Runtime: Time -> O(n) linear, Space -> O(1) constant

function stringCompression(s) {
  let compressedString = '';
  let j = 0;
  let count = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[j] === s[i]) count++;
    else {
      compressedString += `${s[j]}${count}`;
      j = i;
      count = 1;
    }
  }
  compressedString += `${s[j]}${count}`;
  if (compressedString.length > s.length) return s;
  else return compressedString;
}

/*
**********************SOLUTION**********************
 linear runtime is the pretty much as good as it gets on unsorted lists / arrays

 Something worth mentioning tho is that concatnation is costly in Java and the book comments on this and then says that it can be avoided 
 by using a StringBuilder which can be googled.
*/

// console.log(stringCompression('aabcccccaaa')); //'a2b1c5a3'
// console.log(stringCompression('xyzaaayyyyyy')); //'z1y1z1a3y6'

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Question 7: Rotate Matrix, given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

// we are going to assume that for this problem - the image will always be a square
// NxN = square
// NxM = possibly a rectange

//  - we should be able to write a method that works for both.
//  - the NxN solution will probably be easier to complete due to the fact that no new arrays will be inserted or possibly shortened/lengthened

// Can I do this in place ? Probably, there is likely a way to calculate the new index of each pixel.

/* 
input : 
[
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15]
]
output : 
[
    [11,6,1],
    [12,7,2],
    [13,8,3],
    [14,9,4],
    [15,10,5]
]
What is the change of each pixel ? 
    - Each pixel is pushed onto a new array with other pixels that contain the same index, within their own arrays.
    - The order is important, the pixels whose arrays are lower in index go towards the end and vice versa
*/

// runtime : time -> O(nm) || O(n), space -> O(1)
// time runtime is calculates assuming that insertion is constant, which we know isn't true

// If we go through backwards, then we can push onto the newMatrix without having to iterate through the second set

let matOne = [
  // N x M
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15]
];

let matTwo = [
  // N x N
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25]
];

function rotateMatrix(matrix) {
  // solution for N x N
  let rotatedMatrix = JSON.parse(JSON.stringify(matrix));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      rotatedMatrix[j][matrix[j].length - i - 1] = matrix[i][j];
    }
  }
  return rotatedMatrix;
}
function rotateMatrixTwo(matrix) {
  // solution for N x M && N x N
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = matrix.map((e) => e[i]).reverse();
    result.push(row);
  }
  return result;
}

/*
**********************SOLUTION**********************

Admittedly, the second solution was pulled from online. But the books solution is more confusing than that second solution so it's valuable.
The runtime of my first solution is the same as the runtime for my first solution. O(n^2). If you can understand how to swap the indexes than this
problem is easy.

*/

// console.log(rotateMatrix(matTwo));
// console.log(rotateMatrixTwo(matOne));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Question 8 : Zero Matrix, write an algorithm such that if an element in an  M x N matrix is 0, it's entire row and column are set to 0.

// Time Complexity -> O(nm)
// Space Complexity -> O(n)

/*
input : 
[
  [1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1]
]
output: 
[
  [0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0],
  [1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0]
]
*/

function zeroMatrix(matrix) {
  let newMatrix = JSON.parse(JSON.stringify(matrix)); // Essential in this problem. Need a method of performing a deep copy because we will alter this object while sorting through original object. If you don't do a deep copy, then the object will mutate as you iterate through it which will alter your results.
  let zeroColumns = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        zeroColumns.push(j);
        newMatrix[i].fill(0);
      }
      if (zeroColumns.includes(j)) newMatrix[i][j] = 0;
    }
  }
  return newMatrix;
}

let matThree = [
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1]
];

/*
**********************SOLUTION**********************
 I understood this problem well. The book also has a similar solution except theres information about optimizing according to the intricacies of
 C++ so I'm not gonna metion that stuff. But the runtime is still linear so awesome. The basic approach was just to solve the problem without a computer,
 then think about how you can turn those mental processes into computer processes.
*/

//console.log(zeroMatrix(matThree));
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Question 9: String Rotation: Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings s1 and s2, write code to check 
if s2 is a rotation of s1 using only one call to isSubstring 
ex: 
input : {s1: 'waterbottle', s2: 'erbottlewat'}
output: true, waterbottle is a rotation of erbottlewat
Additional Resource : https://medium.com/@jschapir/cracking-the-coding-interview-is-string-2-a-rotated-version-of-string-1-a02c9ec81f58
*/

// How can your intuition be translated into code ?
// When solving this problem by hand, or head, one simply starts where the word seems to start on the second string, and read from the beginning once the end is reached. If the string that was just read is the same as string one, then it is a substring.

function isSubstring(s1, s2) {
  if (s1.length !== s2.length) return null;
  let l = 0,
    count = 0;
  for (let r = 0; count < s1.length; r++) {
    r = r >= s1.length ? r - s1.length : r;
    if (s1[l] == s2[r]) {
      l++;
      count++;
    } else if (s1[l] !== s2[r]) {
      l = 0;
      count = 0;
    }
  }
  return count === s1.length;
}

function cleanerIsSubstring(s1, s2) {
  if (s1.length !== s2.length) return null;
  let s2s2 = s2 + s2;
  if (s2s2.includes(s1)) return true;
  return false;
}

/*
 **********************SOLUTION**********************
 The solution provided by the book is similar to the second solution. I also pulled the second solution from Stack Overflow, but I can't 
 believe I didn't think of this solution either. Obviously, the second solution is alot easier to remember so this problem should
 just be memorized.

 isSubstring(s1 = 'waterbottle', 'erbottlewat')

 s2 = s2 + s2;

 s1 = waterbottle
 s2 = erbottle[waterbottle]wat < -- wouldn't actually inc. brackets, just wanna highlight the intuition

 return s2.includes(s1)

 */

// console.log(isSubstring('waterbottle', 'erbottlewat'));
// console.log(cleanerIsSubstring('waterbottle', 'erbottlewat'));
