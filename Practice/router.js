const Task = require('./model');
const express = require('express');
const router = express.Router();



router.post('/v1/tasks',(req,res)=>{
     
    const task = new Task(req.body);
    
    task.save().then(response=>{
        res.status(201).json({
            message:"posted successfully",
            data:response
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"Something went wrong",
            error:err
        });
    })
});

router.delete('/v1/delete',(req,res)=>{
    const deleteTaskId = req.query.id;
    // const taskdata = req.body;
    // console.log(Task.task);
    const filter = {task:{$gt:`${deleteTaskId}`,$lt:`${deleteTaskId}`}};
     Task.task.deleteMany(filter).then(response=>{
         res.status(200).json({
            message:"delete successful",
            data:response
         });
     })
     .catch(err=>{
        res.status(500).json({
            message:"Something went wrong",
            data:err
        });
     })

});

module.exports = router;