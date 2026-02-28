import { executeCode } from './executeCode';

// Test cases for each problem (by ID)
// First test case is used for "Run Code", all are used for "Submit"
const PROBLEM_TEST_CASES = {
  1: {
    methodName: 'twoSum',
    paramNames: ['nums', 'target'],
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] }
    ]
  },
  11: {
    methodName: 'lengthOfLongestSubstring',
    paramNames: ['s'],
    tests: [
      { args: ['abcabcbb'], expected: 3 },
      { args: ['bbbbb'], expected: 1 },
      { args: ['pwwkew'], expected: 3 }
    ]
  },
  20: {
    methodName: 'climbStairs',
    paramNames: ['n'],
    tests: [
      { args: [2], expected: 2 },
      { args: [3], expected: 3 },
      { args: [5], expected: 8 }
    ]
  },
  7: {
    methodName: 'isValid',
    paramNames: ['s'],
    tests: [
      { args: ['()'], expected: true },
      { args: ['()[]{}'], expected: true },
      { args: ['(]'], expected: false },
      { args: ['([)]'], expected: false }
    ]
  },
  25: {
    methodName: 'sortArray',
    paramNames: ['nums'],
    tests: [
      { args: [[5, 2, 3, 1]], expected: [1, 2, 3, 5] },
      { args: [[5, 1, 1, 2, 0, 0]], expected: [0, 0, 1, 1, 2, 5] }
    ]
  },
  24: {
    methodName: 'findDuplicate',
    paramNames: ['nums'],
    tests: [
      { args: [[1, 3, 4, 2, 2]], expected: 2 },
      { args: [[3, 1, 3, 4, 2]], expected: 3 }
    ]
  },
  16: {
    methodName: 'bfsTraversal',
    paramNames: ['graph', 'start'],
    tests: [
      { args: [[[1, 2], [0, 2], [0, 1]], 0], expected: [0, 1, 2] },
      { args: [[[1], [0, 2], [1]], 0], expected: [0, 1, 2] }
    ]
  },
  3: {
    methodName: 'isPalindrome',
    paramNames: ['s'],
    tests: [
      { args: ['A man, a plan, a canal: Panama'], expected: true },
      { args: ['race a car'], expected: false },
      { args: [' '], expected: true }
    ]
  }
};

// Normalize values for comparison (strips whitespace for consistent matching)
const normalize = (val) => {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (Array.isArray(val)) return JSON.stringify(val).replace(/\s/g, '');
  if (typeof val === 'object') return JSON.stringify(val).replace(/\s/g, '');
  return String(val).trim().replace(/\s/g, '');
};

// Format value for display
const formatValue = (val) => {
  if (typeof val === 'string') return `"${val}"`;
  if (Array.isArray(val)) return JSON.stringify(val);
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  return String(val);
};

// Convert JS value to Python literal
const toPythonLiteral = (val) => {
  if (val === null || val === undefined) return 'None';
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (typeof val === 'string') return JSON.stringify(val);
  if (Array.isArray(val)) return `[${val.map(toPythonLiteral).join(', ')}]`;
  return String(val);
};

// Build JavaScript test runner code
const buildJSRunner = (methodName, tests) => {
  return `
// Test runner - automatically calls your function
const __tests = ${JSON.stringify(tests)};
const __normalize = (val) => {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (Array.isArray(val)) return JSON.stringify(val);
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val).trim();
};

for (const t of __tests) {
  try {
    const result = ${methodName}(...t.args);
    console.log('__RESULT__' + __normalize(result));
  } catch (e) {
    console.log('__ERROR__' + (e.message || String(e)));
  }
}
`;
};

// Build Python test runner code
const buildPythonRunner = (methodName, tests) => {
  const testCases = tests.map(t => {
    const argsStr = t.args.map(toPythonLiteral).join(', ');
    return `    (${argsStr},)`;
  }).join(',\n');

  return `
# Test runner - automatically calls your function
import json

def __normalize(val):
    if val is None:
        return 'null'
    if isinstance(val, bool):
        return 'true' if val else 'false'
    if isinstance(val, list):
        return json.dumps(val)
    return str(val).strip()

__tests = [
${testCases}
]

__sol = Solution()
for __t in __tests:
    try:
        __result = __sol.${methodName}(*__t)
        print('__RESULT__' + __normalize(__result))
    except Exception as __e:
        print('__ERROR__' + str(__e))
`;
};

// ============================================
// RUN CODE - Like LeetCode's "Run" button
// Runs solution against example test cases
// ============================================
export async function runCode(problemId, language, code) {
  const spec = PROBLEM_TEST_CASES[problemId];
  
  if (!spec) {
    return { error: 'No test cases configured for this problem.' };
  }

  const langKey = language.toLowerCase().replace('++', 'pp');
  
  if (!['python', 'javascript'].includes(langKey)) {
    return { error: `Language "${language}" is not supported for auto-testing yet. Use Python or JavaScript.` };
  }

  // Use first 2 test cases for "Run Code" (like LeetCode examples)
  const runTests = spec.tests.slice(0, 2);
  
  // Build and execute
  let fullCode;
  if (langKey === 'python') {
    fullCode = code + '\n' + buildPythonRunner(spec.methodName, runTests);
  } else {
    fullCode = code + '\n' + buildJSRunner(spec.methodName, runTests);
  }

  const result = await executeCode(language, fullCode);

  if (result.error) {
    return { error: result.error };
  }

  // Parse results
  const output = result.stdout || '';
  const lines = output.split('\n').filter(line => line.startsWith('__RESULT__') || line.startsWith('__ERROR__'));

  // Build formatted output like LeetCode
  let formattedOutput = '';
  
  for (let i = 0; i < runTests.length; i++) {
    const test = runTests[i];
    const line = lines[i] || '';
    
    // Format input display
    const inputParts = spec.paramNames.map((name, idx) => `${name} = ${formatValue(test.args[idx])}`);
    
    formattedOutput += `━━━ Test Case ${i + 1} ━━━\n`;
    formattedOutput += `Input:\n`;
    inputParts.forEach(part => {
      formattedOutput += `  ${part}\n`;
    });
    
    if (line.startsWith('__ERROR__')) {
      formattedOutput += `\n❌ Runtime Error:\n  ${line.replace('__ERROR__', '')}\n`;
    } else if (line.startsWith('__RESULT__')) {
      const actual = line.replace('__RESULT__', '');
      const actualNorm = actual.replace(/\s/g, '');  // Normalize actual output too
      const expectedNorm = normalize(test.expected);
      const passed = actualNorm === expectedNorm;
      
      formattedOutput += `\nExpected: ${formatValue(test.expected)}\n`;
      formattedOutput += `Output:   ${actual}\n`;
      formattedOutput += passed ? `\n✓ Passed\n` : `\n✗ Wrong Answer\n`;
    } else {
      formattedOutput += `\n⚠ No output received\n`;
    }
    
    formattedOutput += '\n';
  }

  // Check if all passed
  const allPassed = lines.every((line, i) => {
    if (!line.startsWith('__RESULT__')) return false;
    const actual = line.replace('__RESULT__', '').replace(/\s/g, '');
    return actual === normalize(runTests[i]?.expected);
  }) && lines.length === runTests.length;

  return {
    stdout: formattedOutput,
    code: allPassed ? 0 : 1,
    allPassed
  };
}

// ============================================
// JUDGE PROBLEM - For Submit evaluation
// Runs solution against ALL test cases
// ============================================
export async function judgeProblem(problemId, language, code) {
  const spec = PROBLEM_TEST_CASES[problemId];
  
  if (!spec) {
    return { status: 'unsupported', message: 'No test cases configured for this problem.' };
  }

  const langKey = language.toLowerCase().replace('++', 'pp');
  
  // Only support Python and JavaScript for now
  if (!['python', 'javascript'].includes(langKey)) {
    return { status: 'unsupported', message: `Language "${language}" is not supported for auto-evaluation yet.` };
  }

  // Build the full code with test runner
  let fullCode;
  if (langKey === 'python') {
    fullCode = code + '\n' + buildPythonRunner(spec.methodName, spec.tests);
  } else {
    fullCode = code + '\n' + buildJSRunner(spec.methodName, spec.tests);
  }

  // Execute the code
  const result = await executeCode(language, fullCode);

  if (result.error) {
    return { status: 'error', message: result.error };
  }

  // Parse output
  const output = result.stdout || '';
  const lines = output.split('\n').filter(line => line.startsWith('__RESULT__') || line.startsWith('__ERROR__'));

  if (lines.length === 0) {
    return { status: 'error', message: 'No output from test runner. Code may have crashed or timed out.' };
  }

  // Check for runtime errors
  const errorLine = lines.find(l => l.startsWith('__ERROR__'));
  if (errorLine) {
    return { status: 'wrong', message: 'Runtime error: ' + errorLine.replace('__ERROR__', '') };
  }

  // Compare results
  const results = lines.map(l => l.replace('__RESULT__', '').replace(/\s/g, ''));
  const expected = spec.tests.map(t => normalize(t.expected));

  let passed = 0;
  let failed = 0;
  const details = [];

  for (let i = 0; i < spec.tests.length; i++) {
    const got = results[i] || 'undefined';
    const exp = expected[i];
    const isCorrect = got === exp;
    
    if (isCorrect) {
      passed++;
    } else {
      failed++;
    }
    
    details.push({
      testCase: i + 1,
      input: spec.tests[i].args,
      expected: spec.tests[i].expected,
      got: got,
      passed: isCorrect
    });
  }

  if (failed === 0) {
    return { status: 'correct', passed, total: spec.tests.length, details };
  } else {
    return { status: 'wrong', passed, total: spec.tests.length, details, message: `${failed} test case(s) failed` };
  }
}

// Judge all problems in a session
export async function judgeSession(problems, answers) {
  const report = {};
  
  for (const problem of problems) {
    const answer = answers[problem.id];
    const langKey = (answer?.language || 'python').toLowerCase().replace('++', 'pp');
    const boilerplate = problem.boilerplates[langKey] || '';
    
    // Check if user actually wrote code (not just boilerplate)
    if (!answer?.code || answer.code.trim() === boilerplate.trim()) {
      report[problem.id] = { status: 'skipped', message: 'No solution submitted' };
      continue;
    }
    
    // Judge the problem
    report[problem.id] = await judgeProblem(problem.id, answer.language, answer.code);
  }
  
  return report;
}
