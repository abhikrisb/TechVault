import { executeCode } from './src/utils/executeCode.js';

async function test() {
    const code = `
from typing import *

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        print("Hello from sortArray!")
        return nums

s = Solution()
s.sortArray([1, 2, 3])
`;
    const result = await executeCode('Python', code);
    console.log(JSON.stringify(result, null, 2));
}

test();
