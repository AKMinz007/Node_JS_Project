const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    topic:{type:String},
    description:{type:String},
    posted_at:{type:Date},
    posted_by:{type:String}
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;