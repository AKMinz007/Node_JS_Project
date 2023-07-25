const express = require('express');
const userRouter = express.Router();
const User = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



userRouter.post('/register', (req, res) => {

    const userdata = req.body;
    // console.log(User);
    bcrypt.hash(userdata.password, 10).then(encryptpassword => {

        const userPost = new User({
            email: req.body.email,
            name: req.body.name,
            password: encryptpassword
        });
        userPost.save()
            .then(response => {
                res.status(201).json({
                    message: 'User registered successfully',
                    data: response
                });
            }).catch(err => {
                res.status(500).json({
                    errorDesc: 'data uploading failed',
                    error: err
                })
            })
    }).catch(err => {
        res.status(500).json({
            errorDesc: "Internal server error",
            error: err
        })
    })

});


userRouter.post('/login', (req, res) => {
    const logindata = req.body;

    User.findOne({ email: logindata.email }).then(user => {
        if (user) {
            bcrypt.compare(logindata.password, user.password).then(authStatus => {
                if (authStatus) {

                    const jwtToken = jwt.sign({
                        email: user.email,
                        name: user.name,
                        id: user._id
                    },
                        "10xAcademySecret",
                        {
                            expiresIn: '1h'
                        },
                        // (err,token)=>{
                        //     if(err){
                        //     }
                        //     else{
                        //         return token
                        //     }
                        // }
                    );
                    // console.log(jwtToken);
                    res.status(200).json({
                        message: 'Authenticate successful!',
                        data: jwtToken
                    })
                }
                else {
                    res.status(403).json({
                        errorDesc: "Email or password does not match"
                    })
                }
            }).catch(err=>{
                res.status(500).json({
                    errorDesc:"Internal server error",
                    error:err
                })
            })
        } else {
            res.status(404).json({
                errorDesc: "your email is not registered",
               
            })
        }
    }).catch(err => {
        res.status(500).json({
            errorDesc: "Something went wrong",
            error: err
        })
    })
})


module.exports = userRouter;