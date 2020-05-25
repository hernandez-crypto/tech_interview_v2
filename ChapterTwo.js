/*
  Maybe worth looking into C++, I hear that they have some data structures and methods already implemented.
*/

class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  addNodeToEnd(node) {
    if (this.head === null) {
      this.head = node;
      return;
    } else {
      let currentNode = this.head;
      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
  }
} /*
    Question: Remove Duplicates. Write code to remove duplicates from an unsorted linked list. 
    How would you solve this problem if a temporary buffer is not allowed ?

    Solution: Iterate through LinkedList with a hashmap that will check if that value has already
    appeared or not. If it hasn't, then set that value to one on the hashmap and iterate to the next
    value. If it has, then reassign the this.next pointer to point to the next node in the list to
    delete the node.
*/

const removeDuplicates = (ll) => {
  const head = ll.head;
  let prevNode = ll.head;
  let currentNode = prevNode.next;
  let returnLL = new LinkedListList();
  let hash = { [ll.head.value]: 1 };

  while (currentNode.value !== null) {
    if (!hash[currentNode.value]) {
      hash[currentNode.value] = 1;
      prevNode = prevNode.next;
    } else {
      hash[currentNode.value]++;
      prevNode = prevNode.next;
    }
  }
  returnLL.head = head;
  return returnLL;
}; /*
    Question: Partition. Write code to partition a linked list around a value x, such that all 
    nodes less than x come before all nodes greater than or equal to x. If x is contained within 
    the list, the values of x only neded to be after the elements less than x. The partiton 
    element x can apperar anywhere om the "right partition"; it does not need to appear between 
    the left and right partitions.

    (5 -> 6 -> 8 -> 7 -> 9 -> 4 -> 3 -> 2 -> 1 , x = 4)

    Solution: Initially I thought of an 'easy' solution where you could record the values as you iterate.
    You would have two data structures that have values less than or equal to x and one that contains values greater than x. After you've
    iterated through the linked list you would then iterate through both arrays constructing another linked list. Alternately, you could try
    and partition in place. If a node is less than x then it would be left in place if x hasn't been found, if x has been found then the node would have to be 
    pushed back until it is on the left of x. If a node that is greater than x is found then it will be pushed forward if x hasn't been found (
    <- for this last bit you can record values which would eventually get pushed onto the end of the linked list.), if x has been found you can then it 
    would be left in place. Honestly, the first solution seems much simpler so I will start with that.
*/

const Partition = (ll, x) => {
  // iterate through the linked list
  let currentNode = ll.head;
  let nextNode = currentNode.next;
  let arrayOne = [],
    arrayTwo = []; // arrayOne is for values < x, arrayTwo is for values <= x
  while (nextNode.value !== null) {
    if (currentNode.value < x) arrayOne.push(x);
    if (currentNode.value >= x) {
      if (currentNode.value === x) arrayTwo.unshift(x);
      else arrayTwo.push(x);
    }
    currentNode = nextNode;
    nextNode = nextNode.next;
  }
  // record two arrays, one containing values less than x the other more or equal to x
  // if (currentNode.value < x) arrayOne.push(currentNode.value)
  // else if (currentNode.value >= x) arrayTwo.push(currentNode.value) // <-- we will have to make sure that x is at the front of the array
  // here, the order is really important for this problem. We can use a shift or unshift method for that.
  // construct the linked list which will then be partitioned by iterating through arrayOne, then arrayTwo.
  let arrayThree = [...arrayOne, ...arrayTwo];
  let returnedLL = new LinkedList();
  for (let i = 0; i < arrayThree.length; i++) {
    if (i === 0) returnedLL.head = arrayThree[i];
    else returnLL.addNodeToEnd(arrayThree[i]); // making a method that adds a node to the end of a linkedList constant -> linear process
  }
  return returnLL;
  // return the linked list
}; /*
    Question: Palindromes. Implement a function to check if a linked list is a palindrome.
    
    Solution: Turn ll into string and perform regular palindrome checking algorithm. <-- string turned into object that has keys with values within the domain of 2^n 
    Solution v2: I think that with this solution we might be expected to use a stack. It will be a loop that will behave differently 
    depending on what the index is. If the index is less than half the length of the string, then it will add characters onto the stack. 
    If the index is more than half the length of the string, then it will pop items off the stack. Linear solution, best case is the program
    fails and the ll is not a palindrome.
*/

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

// ^ imported from chapterOne

const PalindromesLL = (ll) => {
  // turn linked list into an object
  let prevNode = ll.head;
  let currentNode = prevNode.next;
  let length = 0;
  let obj = { [prevNode.value]: 1 };
  while (currentNode.next !== null) {
    obj[currentNode.value]
      ? obj[currentNode.value]++
      : (obj[currentNode.value] = 1);
    length++;
    prevNode = prevNode.next;
  }

  // check if values are within domain 2^n;
  let values = Object.values(obj);
  if (length % 2 === 0) {
    // if even
    for (let i = 0; i < values.length; i++) {
      let boolean = exponentOfTwo(values[i]);
      if (!boolean) return false;
    }
    return true;
  }
  if (length % 2 !== 0) {
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
  // check if values of keys of object, if they are in the domain of 2^n then return true;
};

/*
    Question: Intersection. Given two (singly) linked lists, determine if the two lists intersect. Return the 
    intersecting node. Note that the intersection is defined based on reference, not just value, That is, if the 
    kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked 
    list then they are intersecting.

    Solution: One for loop that runs until the length of the shortest linked list. k and j will iterate at the same time, we can even
    deduce it to just one variable. But it basically, a while loop that iterates simultaneously on both linked lists. When the value from
    one linked list is iterated on is equal to the other linked list, then return that node or value as the intersection.

    
*/
const intersection = (ll1, ll2) => {
  let prevNode1 = ll1.head;
  let currentNode1 = prevNode1.next;

  let prevNode2 = ll2.head;
  let currentNode2 = prevNode2.next;

  let i = 0;

  while (currentNode1.next !== null && currentNode2.next !== null) {
    if (currentNode1.value === currentNode2.value)
      return {
        iteration: i,
        value: currentNode1.value,
        node: { nodeOne: currentNode1, nodeTwo: currentNode2 }
      };
    prevNode = prevNode.next;
    i++;
  }
  return null;
};
/*
    Question: Sum Lists. You have two numbers represented by a linked lists, where each node contains a single digit.
    The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function 
    that adds the two numbers and returns the sum as a linked list.

    Solution: Iterate through both linked lists. Construct the numbers using a string / array. Add the numbers up.
    Turn the sum into a string / array. Iterate through and construct the linked list which will be returned.
    
*/

const sumLists = (ll1, ll2) => {
  let arr = new Array(100); // an array that has accessible indexes -> arr[i] === true
  let prevNode1 = ll1.head;
  let currentNode1 = prevNode1.next;

  let prevNode2 = ll2.head;
  let currentNode2 = prevNode2.next;

  let i = 0;

  while (currentNode1 !== null || currentNode2 !== null) {
    let bool1 = currentNode1 ? true : false;
    let bool2 = currentNode2 ? true : false;
    if (bool1 && bool2) arr[i] = currentNode1.value + currentNode2.value;
    else if (bool1 && !bool2) arr[i] = currentNode1.value;
    else if (!bool1 && bool2) arr[i] = currentNode2.value;
  }

  // need a method to correct value of numbers. Cant have a number that is more than 10 in any position on the array
  let carryOver = 0;
  for (let j = 0; j < arr.length; i++) {
    if (arr[i] >= 10)
      if (arr[i] === 10) {
        arr[i + 1] += 1;
        arr[i] = 0;
      } else {
        arr[i + 1] += 1;
        arr[i] = arr[i] - 10;
      }
  }
  let returnedLL = new LinkedList();

  arr.forEach((value) => returnedLL.addNodeToEnd(new LinkedListNode(value)));

  return returnedLL;
};

/*
    Question: Delete Middle Node. Implement an algorithm to delete a node in the middle (ie. Any node but the first 
    and last node, not necessarily the exact middle node of a singly linked list, given only access to that 
    node.

    Solution: A really easy solution that would fit these constraints could be to just iterate three times 
    and make sure that a linked list was at least 3 nodes long. If it is, then delete the 2nd node.
*/

/*
    Question: Return kth to last. Write a method to find the kth to last element of a singly linked list.

    Solution: Get the length of the list. Iterate again counting iterations, on the kth iteration return the correct node.
    A doubly linkedlist would help make this process easier. Or a length property on a linked list.
    
*/
/*
    Question: Loop Detection. Given a circular linked list, implement an algorithm that returns the node at the
    beginning of the loop.

    Solution: Just return the head of the list. Assuming the input is correct this should be. This is a constant operation.
*/
