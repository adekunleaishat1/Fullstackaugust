const productmodel = require("../Model/ProductModel")
const cloudinary = require('../utils/cloudinary')


const createProduct = async (req, res) =>{
    try {
        console.log(req.body);
        const {productname, productdescription,productprice, productimage} = req.body
        if (!productname || !productdescription|| !productprice || !productimage) {
          res.status(400).send({message:"all fields are mandatory", status:false})
        }else{
          const uploadimage = await cloudinary.uploader.upload(productimage)
          console.log(uploadimage);
          if (!uploadimage) {
            res.status(400).send({message:"unable to upload image", status:false})
          }else{
           const created =  await productmodel.create({
                productname,
                productdescription,
                productprice,
                productimage:uploadimage.secure_url
            })

            if (created) {
               return   res.status(200).send({message:"product uploaded successfully", status:true})
            }else{
                res.status(406).send({message:"unable to upload product", status:false})
            }
          }
          
        }
    } catch (error) {
        console.log(error.message);
        
        res.status(500).send({message:` ${error.message}`, status:false})
    }
     
}





module.exports = {createProduct}