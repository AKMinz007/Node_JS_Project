const Task = require('./model');
const express = require('express');
const router = express.Router();

router.post('/createPost',(req,res)=>{
       
    const task = new Task(req.body);
    task.save().then(response=>{
        res.status(201).json({
            message:"successful created",
            data:response
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something went wrong",
            data:err
        });
    })
});

router.get('/getPost',(req,res)=>{
    const taskBody = req.body;
    const filter = {$or:[{email:taskBody.email},{phone:taskBody.phone}]};
       
         
    Task.find(filter).then(response=>{
        
       if(response[0].email==taskBody.email && response[0].phone == taskBody.phone){
        res.status(200).json({
            message:"validation successful, Email and phone are valid"
        });
       }
       else if(response[0].email!==taskBody.email){
        res.status(200).json({
            message:"email not valid,provide valid email address"
        });
       }
       else if(response[0].phone!==taskBody.phone){
        res.status(200).json({
            message:"phone number is not valid, provide valid phone number"
        });
       }
      
        })
        .catch(err=>{
            res.status(404).json({
                message:"Email and phone number are not valid, provide valid email and phone number",
                error:err
            });
        })
   
})


module.exports = router;