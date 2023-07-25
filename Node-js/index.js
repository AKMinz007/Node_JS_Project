// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

// const rl = readline.createInterface({ input, output });

// const name = await rl.question('');

// console.log(`Hello ${name}`);

// rl.close();

// import {argv} from 'node:process';
// // const  env  = require('node:process');

// let username = env.USERNAME;
// console.log(`Hello ${username}`);

let argument = process.argv;
// console.log(argument.length);
console.log(`Hello ${argument[2]}`);