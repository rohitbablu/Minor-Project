const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    "name":{type:String , required:true},
    "course":{type:String , required:true},
    "age":{type:String , required:true},
    "city":{type:String , required:true},
},
{timestamps:true}
)

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);


module.exports = {
    Student,
}