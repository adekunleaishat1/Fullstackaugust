const mongoose = require("mongoose")

const userSchma = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,unique:true, required:true},
    password:{type:String, required:true},
    profileImage:{type:String}
},{timestamps:true})


const usermodel =  mongoose.model("users_collection", userSchma)


module.exports = usermodel