import { writeFileSync, unlinkSync, existsSync } from "fs";
import { exec, execSync } from "child_process";


const runCommand = (command, input, cwd = process.cwd()) => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd, input }, (error, stdout, stderr) => {
            if (error) {
                reject({ error: error.message, stderr: stderr ? stderr.toString() : '' });
            } else {
                resolve(stdout.toString());
            }
        });
    });
};

const handleCodeExecution = async (req, res, fileName, execCommandUnix, execCommandWin, cleanupFiles = []) => {
    const { code, input } = req.body;

    writeFileSync(fileName, code);

    try {
        const isWin = process.platform === 'win32';
        const execCommand = isWin ? execCommandWin : execCommandUnix;

        const output = execSync(execCommand, { input: input }).toString();
        res.json({ output });
    } catch (err) {
        res.json({
            error: err.message,
            stderr: err.stderr ? err.stderr.toString() : ''
        });
    } finally {
        cleanupFiles.forEach(file => {
            if (existsSync(file)) {
                try {
                    unlinkSync(file);
                } catch (unlinkErr) {
                    console.error(`Failed to delete file ${file}:`, unlinkErr.message);
                }
            }
        });
    }
};

export { runCommand, handleCodeExecution };