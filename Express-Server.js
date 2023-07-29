const express = require("express");
const app = express();
const mongoose = require('mongoose');
// const body_parser = require('body-parser');
const productRouter = require('./router/products');
const userRouter = require('./router/user');
const taskRouter = require('./Practice/validateUser');
const postRouter = require('./router/post');
const uploadRoute = require('./router/upload');
require("dotenv").config();



app.use(express.json());

mongoose.connect(process.env.MONGO_DATABASE_URL)
    .then((response) => {
        console.log("Connected to mongo DB successfully !!!!!");
    })
    .catch(error => {
        console.log("falied to Connect mongo DB!!!!", error);
    })


app.use('/product',productRouter);
app.use('/task',taskRouter);
app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/files',uploadRoute);



app.listen(8080);

module.exports = app;
