const express = require("express");
const app = express();
const userRouter = require("./Router.js/userRouter");
const postRouter = require("./Router.js/postRouter");

app.use(express.json());

mongoose.connect(process.env.MONGO_DATABASE_URL)
    .then((response) => {
        console.log("Connected to mongo DB successfully !!!!!");
    })
    .catch(error => {
        console.log("falied to Connect mongo DB!!!!", error);
    })
    
app.use("/user",userRouter);
app.use("/post",postRouter);

app.listen(8080);