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
} /*
    Question: Remove Duplicates. Write code to remove duplicates from an unsorted linked list. 
    How would you solve this problem if a temporary buffer is not allowed ?

    Solution: Iterate through LinkedList with a hashmap that will check if that value has already
    appeared or not. If it hasn't, then set that value to one on the hashmap and iterate to the next
    value. If it has, then reassign the this.next pointer to point to the next node in the list to
    delete the node.
*/ /*
    Question: Delete Middle Node. Implement an algorithm to delete a node in the middle (ie. Any node but the first 
    and last node, not necessarily the exact middle node of a singly linked list, given only access to that 
    node.

    Solution: A really easy solution that would fit these constraints could be to just iterate three times 
    and make sure that a linked list was at least 3 nodes long. If it is, then delete the 2nd node.
*/ /*
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
    would be left in place. 
*/ /*
    Question: Sum Lists. You have two numbers represented by a linked lists, where each node contains a single digit.
    The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function 
    that adds the two numbers and returns the sum as a linked list.

    Solution: Iterate through both linked lists. Construct the numbers using a string / array. Add the numbers up.
    Turn the sum into a string / array. Iterate through and construct the linked list which will be returned.
    
*/ /*
    Question: Palindromes. Implement a function to check if a linked list is a palindrome.
    
    Solution: Turn ll into string and perform regular palindrome checking algorithm. <-- string turned into object that has keys with values within the domain of 2^n 
    Solution v2: I think that with this solution we might be expected to use a stack. It will be a loop that will behave differently 
    depending on what the index is. If the index is less than half the length of the string, then it will add characters onto the stack. 
    If the index is more than half the length of the string, then it will pop items off the stack. Linear solution, best case is the program
    fails and the ll is not a palindrome.
*/ /*
    Question: Intersection. Given two (singly) linked lists, determine if the two lists intersect. Return the 
    intersecting node. Note that the intersection is defined based on reference, not just value, That is, if the 
    kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked 
    list then they are intersecting.

    Solution: One for loop that runs until the length of the shortest linked list. k and j will iterate at the same time, we can even
    deduce it to just one variable. But it basically, a while loop that iterates simultaneously on both linked lists. When the value from
    one linked list is iterated on is equal to the other linked list, then return that node or value as the intersection.

    
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
