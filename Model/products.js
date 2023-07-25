const mongoose = require('mongoose');

// const Cat = mongoose.model('Cat', { name: String });

// 1st version
// const postsModel = mongoose.model('Post', {
//     id: String,
//     user: String,
//     content: String
// });

//2nd version - more options added
// const postsModel = mongoose.model('Post', {
//     id: {type: String, required: true},
//     user: {type: String, required: true},
//     content: {type: String, required: true},
// });

//3rd version - Added schema
const postSchema =  mongoose.Schema({
    "title": {type:String},
    "description":{type:String},
    "price":{type:Number} ,
    "discountPercentage":{type:Number},
    "rating":{type:Number},
    "stock":{type:Number},
    "brand": {type:String},
    "category":{type:String},
    "thumbnail":{type:String},
    "images":[{type:String}],
});

const Product = mongoose.model('Product', postSchema);

module.exports = Product;