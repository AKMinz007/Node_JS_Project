const express = require('express');
const router = express.Router();
const Post = require('../Model/post');
const authMiddleware = require('../middleWare/auth');

  
router.post('/createPost',authMiddleware,(req,res)=>{
       const body = req.body;
    const post = new Post({
        userId:req.userId,
        title:body.title,
        content:body.content
    });
    // console.log(req.body);
    post.save().then(response=>{
        res.status(201).json({
            message:'Post created successfully',
            data:response
        });
    })
    .catch(err=>{
        res.status(500).json({
           errorDesc:"Something went wrong",
            error:err
        });
    })
});

router.get('/getPost/:id',authMiddleware,(req,res)=>{
       const postId = req.params.id;
       const filter = {_id:postId};
    Post.find(filter).then(response=>{
        res.status(200).json({
            message:"post found successful",
            data:response
        });
    })
    .catch(err=>{
        res.status(404).json({
            message:"Not found",
            data:err 
        });
    })
});

router.put('/updatePost/:id',authMiddleware,(req,res)=>{
       const postId = req.params.id;
       const filter = {_id:postId,userId:req.userId};
       const updateContent = req.body;
 if(postId){
    Post.findOneAndUpdate(filter,updateContent).then(response=>{
        if(!response){
           return  res.status(401).json({
                errorDesc: "Permission denied!"
            })
        }
        else{
           return res.status(200).json({
                message:"post updated successful",
                data:response
            });
        }
        
    })
    .catch(err=>{
        res.status(500).json({
            message:"failed to update post",
            data:err 
        });
    })
 }
   
});

router.delete('/deletePost/:id',authMiddleware,(req,res)=>{
       const postId = req.params.id;
       const filter = {_id:postId};
    Post.findOneAnddelete(filter).then(response=>{
        res.status(200).json({
            message:"post delete successful",
            data:response
        });
    })
    .catch(err=>{
        res.status(404).json({
            message:"Not found",
            data:err 
        });
    })
});

module.exports = router;