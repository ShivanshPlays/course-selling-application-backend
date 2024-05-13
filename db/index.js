const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivanshsaxena2910:Shivansh%402910@cluster0.6mkogsf.mongodb.net/course_selling_appwithJWTauth');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    course :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    }]
});

const CourseSchema = new mongoose.Schema({
   title:String,
   description:String,
   price:Number,
   imageLink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}