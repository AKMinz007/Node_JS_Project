import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const name = await rl.question('Please enter your name');

console.log(`Hello ${name}`);

rl.close();