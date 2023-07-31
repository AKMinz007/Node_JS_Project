const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    name:{type:String,required:true},
    currentClass:{type:Number,required:true},
    division:{type:String,required:true}
})

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;