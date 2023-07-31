const express = require("express");
const router = express.Router();
const Student = require("./schema");

router.post("/student",(req,res)=>{
     
    const student = new Student(req.body);
    student.save().then(response=>{
        res.status(201).set({'content-type':'application/x-www-form-urlencoded'}).json({
            status:"success",
            message:"student id created",
            data:response
        });
    })
    .catch(err=>{
        res.status(400).json({
            status:"failed",
            errorDesc:"failed to create student id",
            error:err
        });
    })
});

router.get("/student",(req,res)=>{
    
    Student.find({}).then(response=>{
        res.status(200).json({
            status:"success",
            message:"successful fetched data",
            data:response
        });
    })
    .catch(err=>{
        res.status(404).json({
            status:"Not Found",
            errorDesc:"failed to fetched data",
            error:err
        });
    })
});
 
router.get("/student/:id",(req,res)=>{
    const studentId = req.params.id;
    let filter = {$last:{$sortArray:{input:"Student",$sortBy:studentId}}}
    
    Student.findOne({id:studentId}).then(response=>{
        if(response==null){
            return res.status(404).json({
                status:"failed",
                errorDesc:"Not Found"
            })
        }
        res.status(200).json({
            status:"success",
            message:"successful fetched  data",
            data:response
        });
    })
    .catch(err=>{
        res.status(404).json({
            status:"Not Found",
            errorDesc:"failed to fetch data",
            error:err
        });
    })
});

router.put("/student/:id",(req,res)=>{
    const studentId = req.params.id;

    Student.updateOne({id:studentId}).then(response=>{
        res.status(201).set({'content-type':'application/x-www-form-urlencoded'}).json({
            status:"success",
            message:"successful updated data",
            data:response
        });
    })
    .catch(err=>{
        res.status(400).json({
            status:"failed",
            errorDesc:"failed to update data",
            error:err
        });
    })
});

router.delete("/student/:id",(req,res)=>{
    const studentId = req.params.id;

    Student.deleteOne({id:studentId}).then(response=>{
        res.status(201).json({
            status:"success",
            message:"successful deleted data",
            data:response
        });
    })
    .catch(err=>{
        res.status(404).json({
            status:"Not Found",
            errorDesc:"failed to delete data",
            error:err
        });
    })
});


module.exports = router;
