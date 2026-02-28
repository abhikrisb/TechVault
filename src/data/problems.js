export const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers <code class="bg-dark-700 px-1 rounded text-brand-400">nums</code> and an integer <code class="bg-dark-700 px-1 rounded text-brand-400">target</code>, return indices of the two numbers such that they add up to <code class="bg-dark-700 px-1 rounded text-brand-400">target</code>.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        boilerplates: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            python: `from typing import *

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
            java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`
        }
    },
    {
        id: 11,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: `Given a string <code class="bg-dark-700 px-1 rounded text-brand-400">s</code>, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.`,
        examples: [
            {
                input: 's = "abcabcbb"',
                output: "3",
                explanation: 'The answer is "abc", with the length of 3.'
            },
            {
                input: 's = "pwwkew"',
                output: "3",
                explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
            }
        ],
        constraints: [
            "0 <= s.length <= 5 * 10^4",
            "s consists of English letters, digits, symbols and spaces."
        ],
        boilerplates: {
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
            python: `from typing import *

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`,
            java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`
        }
    },
    {
        id: 20,
        title: "Climbing Stairs",
        difficulty: "Medium",
        description: `You are climbing a staircase. It takes <code class="bg-dark-700 px-1 rounded text-brand-400">n</code> steps to reach the top.\n\nEach time you can either climb <code class="bg-dark-700 px-1 rounded text-brand-400">1</code> or <code class="bg-dark-700 px-1 rounded text-brand-400">2</code> steps. In how many distinct ways can you climb to the top?`,
        examples: [
            {
                input: "n = 2",
                output: "2",
                explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
            },
            {
                input: "n = 3",
                output: "3",
                explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
            }
        ],
        constraints: [
            "1 <= n <= 45"
        ],
        boilerplates: {
            javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
};`,
            python: `from typing import *

class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
            java: `import java.util.*;

class Solution {
    public int climbStairs(int n) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        
    }
};`
        }
    },
    {
        id: 7,
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: `Given a string <code class="bg-dark-700 px-1 rounded text-brand-400">s</code> containing just the characters <code class="bg-dark-700 px-1 rounded text-brand-400">'('</code>, <code class="bg-dark-700 px-1 rounded text-brand-400">')'</code>, <code class="bg-dark-700 px-1 rounded text-brand-400">'{'</code>, <code class="bg-dark-700 px-1 rounded text-brand-400">'}'</code>, <code class="bg-dark-700 px-1 rounded text-brand-400">'['</code> and <code class="bg-dark-700 px-1 rounded text-brand-400">']'</code>, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
        examples: [
            {
                input: 's = "()"',
                output: "true",
                explanation: "The input string contains only a pair of matching parentheses."
            },
            {
                input: 's = "()[]{}"',
                output: "true",
                explanation: "All pairs match in order."
            },
            {
                input: 's = "(]"',
                output: "false",
                explanation: "The parentheses do not match."
            }
        ],
        constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'."
        ],
        boilerplates: {
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
            python: `from typing import *

class Solution:
    def isValid(self, s: str) -> bool:
        pass`,
            java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        
    }
};`
        }
    },
    {
        id: 25,
        title: "Merge Sort (Divide and Conquer)",
        difficulty: "Medium",
        description: `Given an array of integers <code class="bg-dark-700 px-1 rounded text-brand-400">nums</code>, sort the array in ascending order and return it.\n\nYou must solve the problem without using any built-in functions in <code class="bg-dark-700 px-1 rounded text-brand-400">O(n log n)</code> time complexity and with the smallest space complexity possible. Implement utilizing the merge sort (divide and conquer) approach.`,
        examples: [
            {
                input: "nums = [5,2,3,1]",
                output: "[1,2,3,5]",
                explanation: "After sorting the array, the elements are rearranged from smallest to largest."
            },
            {
                input: "nums = [5,1,1,2,0,0]",
                output: "[0,0,1,1,2,5]",
                explanation: "Note that the values of nums are not necessarily unique."
            }
        ],
        constraints: [
            "1 <= nums.length <= 5 * 10^4",
            "-5 * 10^4 <= nums[i] <= 5 * 10^4"
        ],
        boilerplates: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    
};`,
            python: `from typing import *

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        pass`,
            java: `import java.util.*;

class Solution {
    public int[] sortArray(int[] nums) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        
    }
};`
        }
    },
    {
        id: 24,
        title: "Find Duplicate Number",
        difficulty: "Medium",
        description: `Given an array of integers <code class="bg-dark-700 px-1 rounded text-brand-400">nums</code> containing <code class="bg-dark-700 px-1 rounded text-brand-400">n + 1</code> integers where each integer is in the range <code class="bg-dark-700 px-1 rounded text-brand-400">[1, n]</code> inclusive.\n\nThere is only one repeated number in <code class="bg-dark-700 px-1 rounded text-brand-400">nums</code>, return this repeated number.\n\nYou must solve the problem without modifying the array <code class="bg-dark-700 px-1 rounded text-brand-400">nums</code> and uses only constant extra space.`,
        examples: [
            {
                input: "nums = [1,3,4,2,2]",
                output: "2",
                explanation: ""
            },
            {
                input: "nums = [3,1,3,4,2]",
                output: "3",
                explanation: ""
            }
        ],
        constraints: [
            "1 <= n <= 10^5",
            "nums.length == n + 1",
            "1 <= nums[i] <= n",
            "All the integers in nums appear only once except for precisely one integer which appears two or more times."
        ],
        boilerplates: {
            javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    
};`,
            python: `from typing import *

class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        pass`,
            java: `import java.util.*;

class Solution {
    public int findDuplicate(int[] nums) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        
    }
};`
        }
    },
    {
        id: 16,
        title: "Breadth First Search (BFS)",
        difficulty: "Medium",
        description: `Given an unweighted graph and a starting node, return an array representing the Breadth First Search (BFS) traversal of the graph.\n\nGraph is provided as an adjacency list. Explore neighbors in the order they appear in the adjacency list.`,
        examples: [
            {
                input: "graph = [[1, 2], [0, 2], [0, 1]], start = 0",
                output: "[0, 1, 2]",
                explanation: "Node 0 has neighbors 1 and 2. We visit 0, then 1, then 2."
            }
        ],
        constraints: [
            "1 <= graph.length <= 100",
            "0 <= start < graph.length",
            "The graph is connected."
        ],
        boilerplates: {
            javascript: `/**
 * @param {number[][]} graph
 * @param {number} start
 * @return {number[]}
 */
var bfsTraversal = function(graph, start) {
    
};`,
            python: `from typing import *

class Solution:
    def bfsTraversal(self, graph: List[List[int]], start: int) -> List[int]:
        pass`,
            java: `import java.util.*;

class Solution {
    public List<Integer> bfsTraversal(List<List<Integer>> graph, int start) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> bfsTraversal(vector<vector<int>>& graph, int start) {
        
    }
};`
        }
    },
    {
        id: 3,
        title: "Valid Palindrome",
        difficulty: "Easy",
        description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string <code class="bg-dark-700 px-1 rounded text-brand-400">s</code>, return <code class="bg-dark-700 px-1 rounded text-brand-400">true</code> if it is a palindrome, or <code class="bg-dark-700 px-1 rounded text-brand-400">false</code> otherwise.`,
        examples: [
            {
                input: 's = "A man, a plan, a canal: Panama"',
                output: "true",
                explanation: '"amanaplanacanalpanama" is a palindrome.'
            },
            {
                input: 's = "race a car"',
                output: "false",
                explanation: '"raceacar" is not a palindrome.'
            }
        ],
        constraints: [
            "1 <= s.length <= 2 * 10^5",
            "s consists only of printable ASCII characters."
        ],
        boilerplates: {
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};`,
            python: `from typing import *

class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass`,
            java: `import java.util.*;

class Solution {
    public boolean isPalindrome(String s) {
        
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`
        }
    }
];

// Helper to get 3 random problems
export const getRandomProblems = (count = 3) => {
    const shuffled = [...problems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
