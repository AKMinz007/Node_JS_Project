const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));



app.use(bodyParser.json());

app.get('/products',(req,res)=>{
    const postId = req.query.id;
    console.log(postId);
    let querydata = data.products;

    if(postId){
        querydata = querydata.filter(post=>{
           if(post.id == postId){
            return querydata;
           }   
        })
    }
 
    res.status(200).json({
       "message":"post fetched successfully",
       "data":querydata,
    })

});

app.post('/createPost',(req,res)=>{
    // console.log(req.body);
    data.products.push(req.body);
    res.status(201).json({
        "message":"post created successfully",
       "data":data.products,
    });
});

app.put('/updatePost',(req,res)=>{
    const postId = req.params.id;
    console.log(postId);
    let updatedContent = req.body;

    if(postId){
        const matchingPost = data.products.find(post=>{
            return post.id===postId
        })
        updatedContent={...updatedContent,...matchingPost}
    }
   

    res.status(200).json({
        "message":"post updated successfully",
       "data":updatedContent,
    })
});

app.delete("/deletePost",(req,res)=>{
    const postId = req.params.id;
    // console.log(postId);
    const foundAt = data.products.indexAt(post=>{
        post.id = postId
    })
    const result = data.products.splice(foundAt,1);
    res.status(200).json({
        "message":"post deleted successfully",
       "data":result,
    })
});

app.get("/",(req,res)=>{
    console.log("server start");
    res.send(data.products);
});

app.listen(8080);











// router.put('/:id', async (req, res) => {
//     try {
//       await ListItem.findByIdAndUpdate(req.params.id, {
//           itemname: req.body.itemname,
//           category: req.body.category
//       });
//       // Send response in here
//       res.send('Item Updated!');

//     } catch(err) {
//         console.error(err.message);
//         res.send(400).send('Server Error');
//     }
// });