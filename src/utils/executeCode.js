export const executeCode = async (language, sourceCode) => {
    // Piston API V1
    const languageMap = {
        'Python': 'python3',
        'JavaScript': 'javascript',
        'Java': 'java',
        'C++': 'cpp'
    };

    const runLang = languageMap[language];
    if (!runLang) {
        return { error: `Language ${language} is not supported.` };
    }

    try {
        const response = await fetch('https://emkc.org/api/v1/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: runLang,
                source: sourceCode
            })
        });

        if (!response.ok) {
            return { error: `HTTP Error: ${response.status} ${response.statusText}` };
        }

        const data = await response.json();

        return {
            stdout: data.output,
            stderr: '', // Piston V1 puts everything in 'output', error or stdout
            code: data.ran ? 0 : 1 // if it ran, call it 0. For real exit codes need V2.
        };

    } catch (error) {
        return { error: `Execution request failed: ${error.message}` };
    }
};
