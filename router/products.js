const express = require('express');
const productRouter = express.Router();
const Product = require('../Model/products')



productRouter.post('/createPost', (req, res) => {
    const product = new Product(req.body);
    // console.log(product);
    product.save()
        .then((record) => {
            res.status(201).json({
                message: "Post created successfully",
                data: record
            });
        }).catch(err => {
            res.status(500).json({
                errorDesc: "Failed to create a post!",
                error: err
            })
        });
});

productRouter.get('/getPost', (req, res) => {
     const productBody = req.body;
    let filter = {title:productBody.title};
    const productRequest = Product.find(filter);
    productRequest.then(response => {
        console.log(response);
        res.status(200).json({
            message: 'data fetched successfully',
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            message: 'failed to fetch data',
            data: err
        });
    })
});

productRouter.put('/updatePost/:id', (req, res) => {
    const PostId = req.params.id;
    // console.log(PostId);
    const updatedContent = req.body;
    // console.log(updatedContent);
    let filter = { _id: PostId };
    Product.findOneAndUpdate(filter, updatedContent).then(response => {
              res.status(200).json({
            message: 'successfully updated data',
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            message: 'failed to update data',
            error: err
        });
    })
});

productRouter.delete('/deletePost/:id', (req, res) => {
    const PostId = req.params.id;
    let filter = { _id: `${PostId}` };
    const deleteRequest = Product.deleteOne(filter);
    deleteRequest.then(response => {

        if (response.deletedCount == 0) {
            res.status(404).json({
                message: 'Not found data for delete',
            })
        }
        res.status(200).json({
            message: 'delete successfully',
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            message: 'failed to delete data',
            data: err
        });
    })
})

module.exports = productRouter;