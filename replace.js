const fs = require('fs');

let content = fs.readFileSync('src/data/problems.js', 'utf8');

const replacements = [
    {
        oldJS: `var twoSum = function(nums, target) {\n    \n};`,
        newJS: `var twoSum = function(nums, target) {\n    return [];\n};\n\n// Test block\nconsole.log(twoSum([2,7,11,15], 9));`,
        oldPY: `def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
        newPY: `def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().twoSum([2,7,11,15], 9))`,
        oldJA: `public int[] twoSum(int[] nums, int target) {\n        \n    }`,
        newJA: `public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(new Solution().twoSum(new int[]{2,7,11,15}, 9)));\n    }`,
        oldCPP: `vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }`,
        newCPP: `vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {2,7,11,15};\n    vector<int> res = sol.twoSum(nums, 9);\n    for(int x : res) cout << x << " ";\n    cout << endl;\n    return 0;`
    },
    {
        oldJS: `var lengthOfLongestSubstring = function(s) {\n    \n};`,
        newJS: `var lengthOfLongestSubstring = function(s) {\n    return 0;\n};\n\n// Test block\nconsole.log(lengthOfLongestSubstring("abcabcbb"));`,
        oldPY: `def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
        newPY: `def lengthOfLongestSubstring(self, s: str) -> int:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().lengthOfLongestSubstring("abcabcbb"))`,
        oldJA: `public int lengthOfLongestSubstring(String s) {\n        \n    }`,
        newJA: `public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(new Solution().lengthOfLongestSubstring("abcabcbb"));\n    }`,
        oldCPP: `int lengthOfLongestSubstring(string s) {\n        \n    }`,
        newCPP: `int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring("abcabcbb") << endl;\n    return 0;`
    },
    {
        oldJS: `var climbStairs = function(n) {\n    \n};`,
        newJS: `var climbStairs = function(n) {\n    return 0;\n};\n\n// Test block\nconsole.log(climbStairs(2));`,
        oldPY: `def climbStairs(self, n: int) -> int:\n        pass`,
        newPY: `def climbStairs(self, n: int) -> int:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().climbStairs(2))`,
        oldJA: `public int climbStairs(int n) {\n        \n    }`,
        newJA: `public int climbStairs(int n) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(new Solution().climbStairs(2));\n    }`,
        oldCPP: `int climbStairs(int n) {\n        \n    }`,
        newCPP: `int climbStairs(int n) {\n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << sol.climbStairs(2) << endl;\n    return 0;`
    },
    {
        oldJS: `var isValid = function(s) {\n    \n};`,
        newJS: `var isValid = function(s) {\n    return false;\n};\n\n// Test block\nconsole.log(isValid("()"));`,
        oldPY: `def isValid(self, s: str) -> bool:\n        pass`,
        newPY: `def isValid(self, s: str) -> bool:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().isValid("()"))`,
        oldJA: `public boolean isValid(String s) {\n        \n    }`,
        newJA: `public boolean isValid(String s) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(new Solution().isValid("()"));\n    }`,
        oldCPP: `bool isValid(string s) {\n        \n    }`,
        newCPP: `bool isValid(string s) {\n        return false;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << (sol.isValid("()") ? "true" : "false") << endl;\n    return 0;`
    },
    {
        oldJS: `var sortArray = function(nums) {\n    \n};`,
        newJS: `var sortArray = function(nums) {\n    return [];\n};\n\n// Test block\nconsole.log(sortArray([5,2,3,1]));`,
        oldPY: `def sortArray(self, nums: List[int]) -> List[int]:\n        pass`,
        newPY: `def sortArray(self, nums: List[int]) -> List[int]:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().sortArray([5,2,3,1]))`,
        oldJA: `public int[] sortArray(int[] nums) {\n        \n    }`,
        newJA: `public int[] sortArray(int[] nums) {\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(new Solution().sortArray(new int[]{5,2,3,1})));\n    }`,
        oldCPP: `vector<int> sortArray(vector<int>& nums) {\n        \n    }`,
        newCPP: `vector<int> sortArray(vector<int>& nums) {\n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {5,2,3,1};\n    vector<int> res = sol.sortArray(nums);\n    for(int x : res) cout << x << " ";\n    cout << endl;\n    return 0;`
    },
    {
        oldJS: `var findDuplicate = function(nums) {\n    \n};`,
        newJS: `var findDuplicate = function(nums) {\n    return 0;\n};\n\n// Test block\nconsole.log(findDuplicate([1,3,4,2,2]));`,
        oldPY: `def findDuplicate(self, nums: List[int]) -> int:\n        pass`,
        newPY: `def findDuplicate(self, nums: List[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().findDuplicate([1,3,4,2,2]))`,
        oldJA: `public int findDuplicate(int[] nums) {\n        \n    }`,
        newJA: `public int findDuplicate(int[] nums) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(new Solution().findDuplicate(new int[]{1,3,4,2,2}));\n    }`,
        oldCPP: `int findDuplicate(vector<int>& nums) {\n        \n    }`,
        newCPP: `int findDuplicate(vector<int>& nums) {\n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {1,3,4,2,2};\n    cout << sol.findDuplicate(nums) << endl;\n    return 0;`
    },
    {
        oldJS: `var bfsTraversal = function(graph, start) {\n    \n};`,
        newJS: `var bfsTraversal = function(graph, start) {\n    return [];\n};\n\n// Test block\nconsole.log(bfsTraversal([[1, 2], [0, 2], [0, 1]], 0));`,
        oldPY: `def bfsTraversal(self, graph: List[List[int]], start: int) -> List[int]:\n        pass`,
        newPY: `def bfsTraversal(self, graph: List[List[int]], start: int) -> List[int]:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().bfsTraversal([[1, 2], [0, 2], [0, 1]], 0))`,
        oldJA: `public List<Integer> bfsTraversal(List<List<Integer>> graph, int start) {\n        \n    }`,
        newJA: `public List<Integer> bfsTraversal(List<List<Integer>> graph, int start) {\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        List<List<Integer>> graph = new ArrayList<>();\n        graph.add(Arrays.asList(1, 2));\n        graph.add(Arrays.asList(0, 2));\n        graph.add(Arrays.asList(0, 1));\n        System.out.println(new Solution().bfsTraversal(graph, 0));\n    }`,
        oldCPP: `vector<int> bfsTraversal(vector<vector<int>>& graph, int start) {\n        \n    }`,
        newCPP: `vector<int> bfsTraversal(vector<vector<int>>& graph, int start) {\n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<vector<int>> graph = {{1, 2}, {0, 2}, {0, 1}};\n    vector<int> res = sol.bfsTraversal(graph, 0);\n    for(int x : res) cout << x << " ";\n    cout << endl;\n    return 0;`
    },
    {
        oldJS: `var isPalindrome = function(s) {\n    \n};`,
        newJS: `var isPalindrome = function(s) {\n    return false;\n};\n\n// Test block\nconsole.log(isPalindrome("A man, a plan, a canal: Panama"));`,
        oldPY: `def isPalindrome(self, s: str) -> bool:\n        pass`,
        newPY: `def isPalindrome(self, s: str) -> bool:\n        pass\n\nif __name__ == '__main__':\n    print(Solution().isPalindrome("A man, a plan, a canal: Panama"))`,
        oldJA: `public boolean isPalindrome(String s) {\n        \n    }`,
        newJA: `public boolean isPalindrome(String s) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(new Solution().isPalindrome("A man, a plan, a canal: Panama"));\n    }`,
        oldCPP: `bool isPalindrome(string s) {\n        \n    }`,
        newCPP: `bool isPalindrome(string s) {\n        return false;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << (sol.isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl;\n    return 0;`
    }
];

let replaced = content;
for (const r of replacements) {
    replaced = replaced.replace(r.oldJS, r.newJS);
    replaced = replaced.replace(r.oldPY, r.newPY);
    replaced = replaced.replace(r.oldJA, r.newJA);
    replaced = replaced.replace(r.oldCPP + `\n};`, r.newCPP + `\n}`);
}

fs.writeFileSync('src/data/problems.js', replaced, 'utf8');
console.log('Update complete.');
