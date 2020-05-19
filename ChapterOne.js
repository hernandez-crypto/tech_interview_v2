/*
    Question : 

    Solution : 
    Less optimal :
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

// console.log(isUnique('qwertyuiop'));
// console.log(isUnique('qwertyuiopp'));

/*
    Question 2: Check Permutation. Given two strings, write a method to decide if one is a permutation of the other.

    Solution : Loop through string, mapping characters to an object. Do the same on the second string. And if at the 
    end the two objects have the same entries / keys, then it will be true. Otherwise, there was a character missing 
    or added which means it can't be a permutation.
    

*/

const checkPermutation = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  let obj1 = {};
  for (let i = 0; i < s1.length; i++) {
    !obj1[s1[i]] ? (obj1[s1[i]] = 1) : obj1[s1[i]]++; // If the character doesn't exist in the object, then set it to one. Else iterate its value in the object.
  }
  let obj2 = {};
  for (let i = 0; i < s2.length; i++) {
    !obj2[s2[i]] ? (obj2[s2[i]] = 1) : obj2[s2[i]]++;
  }
};
