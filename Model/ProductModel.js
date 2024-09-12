const mongoose = require("mongoose")

const productschme  = mongoose.Schema({
    productname:{type:String,  required:true, trim:true},
    productdescription:{type:String,  required:true, trim:true},
    productprice:{type:Number, required:true },
    productrating:{type:Number, default:0},
    productdiscount:{type:Number, default:0},
    productimage:{type:String, required:true, trim:true}
})

const productmodel = mongoose.model("product_collection", productschme)


module.exports = productmodel