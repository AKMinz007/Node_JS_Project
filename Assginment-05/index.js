const express = require("express");
const server = express();


server.get("/welcome", (req, res) => {
    res.setHeader("Content-Type","text/plain");
    res.status(200).send("Welcome to Domino!")
});

server.get("/contact", (req, res) => {

    const Contact = {
        phone: '18602100000',
        email: 'guestcaredominos@jublfood.com'
    }
    res.setHeader("Content-Type","text/plain");
    res.status(200).send(Contact);
});

server.use("/", (req, res) => {
    console.log("welcome to our servrer");
    res.status(404).send("Not Found");
});

server.listen(8081);