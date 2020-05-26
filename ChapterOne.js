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
  
  2. Then, create an array of 128 characters long. There are only 128 possibilities before there has to be a repeat.
  
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
    if (s[i] == ' ') sNew += r;
    else sNew += s[i];
  }
  return sNew;
};

console.log(URLify('www.google.com/ yo/ yo', 17));

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

const returnSum = (arr) => {
  let sum = 0;
  arr.forEach((value) => (sum += value));
  return sum;
};

const exponentOfTwo = (num) => {
  // Runtime is faster than linear. ~ O(log(n))
  let currentValue = 0;
  for (let i = 1; currentValue <= num; i++) {
    currentValue = Math.pow(2, i);
    if (currentValue === num) return true;
    else if (currentValue > num) return false;
  }
  return null;
};

const permutationPalindrome = (s) => {
  let chars = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      if (!chars[s[i]]) chars[s[i]] = 1;
      else chars[s[i]]++;
    }
  }

  let values = Object.values(chars);
  let stringLength = returnSum(values); // length without spaces. s.length() would be much more optimal but it would account for white spaces too

  if (stringLength % 2 === 0) {
    // if even
    for (let i = 0; i < values.length; i++) {
      let boolean = exponentOfTwo(values[i]);
      if (!boolean) return false;
    }
    return true;
  }
  if (stringLength % 2 !== 0) {
    // if odd
    let singleOdd = true;
    for (let i = 0; i < values.length; i++) {
      if (values[i] === 1 && !singleOdd) return false;
      let boolean = exponentOfTwo(values[i]);
      if (!boolean && !singleOdd) return false;
      if (values[i] === 1) singleOdd = false;
    }
    return true;
  }
  return null;
};

console.log(permutationPalindrome('taco cat')); // true, 'tac ocat'

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
  let newMatrix = JSON.parse(JSON.stringify(matrix));
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

// console.log(isSubstring('waterbottle', 'erbottlewat'));
// console.log(cleanerIsSubstring('waterbottle', 'erbottlewat'));
