const mongoose = require("mongoose")


const chatschema = mongoose.Schema({
    chat:{type:String, required:true, trim:true}
},{timestamps:true})

const chatmodel = mongoose.model("chat_collection", chatschema)

module.exports = chatmodel