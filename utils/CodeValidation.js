const dangerousPatterns = {
    c: [/system\(/g, /exec\(/g],
    cpp: [/system\(/g, /exec\(/g],
    java: [/Runtime\.getRuntime\(/g, /ProcessBuilder/g],
    javascript: [/eval\(/g, /require\(['"]child_process['"]\)/g],
    python: [/os\.system\(/g, /subprocess\.call/g],
};

const validateCode = (language, code) => {
    const patterns = dangerousPatterns[language];
    if (patterns) {
        for (const pattern of patterns) {
            if (pattern.test(code)) {
                return false; // Unsafe code detected
            }
        }
    }
    return true; // Code is safe
};

export default validateCode;