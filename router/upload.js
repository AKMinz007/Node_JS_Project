const express = require("express");
const multer = require("multer");
const upload = multer({dest:'uploads/'});

const uploadRouter = express.Router();

uploadRouter.post('/upload',upload.single('pic'),(req,res)=>{

    res.status(201).json({
        message:"file uploaded successfully"
    })
});

module.exports = uploadRouter;