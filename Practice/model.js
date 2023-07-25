const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
//     {
//     task:[{
//         id:Number,
//         title:String,
//         is_completed:Boolean,
//     }]
// }
{
    name:String,
    email:String,
    phone:{type:Number}
}
)

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;