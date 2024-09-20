import { handleCodeExecution } from "../services/HandleCode.js";
import run from "../services/GeminiApi.js";
import validateCode from "../utils/CodeValidation.js";


const RunController = async (req, res) => {
    const { language, code } = req.body;

    if (!validateCode(language, code)) {
        return res.status(400).json({ error: 'Dangerous code detected' });
    }

    switch (language) {
        case 'c':
            await handleCodeExecution(
                req,
                res,
                'main.c',
                'gcc main.c -o program && ./program',
                'gcc main.c -o program && program.exe',
                ['main.c', 'program', 'program.exe']
            );
            break;

        case 'cpp':
            await handleCodeExecution(
                req,
                res,
                'main.cpp',
                'g++ main.cpp -o program && ./program',
                'g++ main.cpp -o program && program.exe',
                ['main.cpp', 'program', 'program.exe']
            );
            break;

        case 'java':
            await handleCodeExecution(
                req,
                res,
                'Main.java',
                'javac Main.java && java Main',
                'javac Main.java && java Main',
                ['Main.java', 'Main.class']
            );
            break;

        case 'javascript':
            await handleCodeExecution(
                req,
                res,
                'main.js',
                'node main.js',
                'node main.js',
                ['main.js']
            );
            break;

        case 'python':
            await handleCodeExecution(
                req,
                res,
                'main.py',
                'python3 main.py',
                'python main.py',
                ['main.py']
            );
            break;

        default:
            res.status(400).json({ error: 'Unsupported language' });
            break;
    }
}

const OptimiseController = async (req, res) => {
    const { code } = req.body;
    if (!code || typeof code !== 'string') {
        return res.status(400).json({ message: "Invalid or missing code", success: false });
    }
    try {
        const optCode = await run(`${code}\n\nOptimize the above code`);
        if (optCode) {
            return res.status(201).json({ response: optCode, success: true });
        } else {
            return res.status(500).json({ message: "Failed to optimize code", success: false });
        }
    } catch (error) {
        console.log("Gemini api error: ", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export { RunController, OptimiseController };