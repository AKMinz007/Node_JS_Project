const express = require('express')
const mongoose = require("mongoose");
const app = express()
const bodyParser = require("body-parser");
const studentRouter = require("./router");
require("dotenv").config();
const port = 8080
app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
app.use(express.json());

mongoose.connect(process.env.MONGO_DATABASE_URL)
    .then((response) => {
        console.log("Connected to mongo DB successfully !!!!!");
    })
    .catch(error => {
        console.log("falied to Connect mongo DB!!!!", error);
    })

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// your code goes here

app.use("/api",studentRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   