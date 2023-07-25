// import {env} from 'node:process';
const  env  = require('node:process');

let username = env.USERNAME;
console.log(`Hello ${username}`);
