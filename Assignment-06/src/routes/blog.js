const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here
 
router.post('/blogPost',(req,res)=>{
     const blogData = req.body;
     let date = new Date();
    let blog = new Blog({
        topic:blogData.topic,
        description:blogData.description,
        posted_at:date,
        posted_by:blogData.posted_by
    })
    
    blog.markModified('posted_at');
    console.log(req.body);
    blog.save().then(response=>{
        res.status(201).json({
            message:'Blog is created successfully',
            data:response
        });
    })  
    .catch(err=>{
        res.status(500).json({
            message:'Something went wrong !!',
            data:err
        })
    })
});


router.get('/blog',(req,res)=>{
    const blogId = req.query.id;
    const search = req.query.search;
    const filter = {id:blogId,topic:{'$regex':`${search}`,'$options':`i`}};
    
    Blog.find(filter).then(response=>{
        res.status(200).json({
            message:'Data successfully found',
            data:response
        });
    })
    .catch(err=>{
        res.status(400).json({
            message:"Not Found",
            error:err
        })
    })
});

router.put('/updateblog/:id',(req,res)=>{
       const blogId = req.params.id;
       const filter = {id:blogId};

       Blog.findOneAndUpdate(filter).then(response=>{
        res.status(201).json({
            message:"Blog updated successfully",
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

router.delete('/deletePost/:id',(req,res)=>{
        const blogId = req.params.id;
        const filter = {id:blogId};
        Blog.deleteOne(filter).then(response=>{
            res.status(200).json({
                message:"delete successful",
                data:response
            });
        })
        .catch(err=>{
            res.status(500).json({
                message:"Something went wrong",
                error:err
            })
        })
})


module.exports = router;