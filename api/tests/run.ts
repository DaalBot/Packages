import fs from 'fs';

const testFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.test.ts'));

const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;
const originalConsoleDebug = console.debug;

console.log = (...args: any[]) => originalConsoleLog(`\u001b[32m`, ...args, `\u001b[0m`);
console.error = (...args: any[]) => originalConsoleError(`\u001b[31m`, ...args, `\u001b[0m`);
console.warn = (...args: any[]) => originalConsoleWarn(`\u001b[33m`, ...args, `\u001b[0m`);
console.info = (...args: any[]) => originalConsoleInfo(`\u001b[34m`, ...args, `\u001b[0m`);
console.debug = (...args: any[]) => originalConsoleDebug(`\u001b[35m`, ...args, `\u001b[0m`);

(async() => {
    for (const file of testFiles) {
        try {
            const { default: test } = await import(`${__dirname}/${file}`);
            console.info(`Running ${file}...`);
            await test();
            console.log(`Finished ${file}`);
            console.info(`\n`);
        } catch (error) {
            console.error(`Error in ${file}:`, error);
            console.info(`\n`);
        }
    }
    console.log(`All tests completed.`);
})()