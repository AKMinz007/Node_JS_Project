const fs = require('fs');
const express = require('express');
const app = express();
const data = JSON.parse(fs.readFileSync('data.json', () => { }));
const products = data.products;
// CRUD opreation 


app.use(express.json());

app.listen(8080,()=>{
    console.log('server started');
});