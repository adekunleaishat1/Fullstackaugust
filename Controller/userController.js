const usermodel = require("../Model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const cloudinary = require("../utils/cloudinary")


let secretkey = "yeesha"

const Usersignup = async (req, res) =>{
    try {
        console.log(req.body);
        const {email, username , password} = req.body
        if (!email || !username || !password) {
          res.status(400).send({message:"all fields are mandatory", status:false})
        }else{
           const hashedpassword =  await bcrypt.hash(password, 10)
           console.log(hashedpassword);
           
           const user = await usermodel.create({
            username,
            email,
            password:hashedpassword
           })
           if (!user) {
            res.status(402).send({message:"error creating user", status:false}) 
           }else{
            return res.status(200).send({message:"user signup successful", status: true})
           }

        }
    } catch (error) {
        res.status(500).send({message:`internal server error ${error.message}`, status:false})
    }
 
   
}

const userLogin = async (req , res) =>{
    try {
        console.log(req.body);
        const {email, password} = req.body
      const existuser =  await usermodel.findOne({email:email})
      console.log(existuser);
        if (!existuser) {
            res.status(400).send({message:"You are not a registered user , please sign up", status:false})
        }else{
         const correctpassword =  await bcrypt.compare(password, existuser.password)
         console.log(correctpassword);
            if(!correctpassword){
                res.status(402).send({message:"Incorrect password", status:false}) 
            }else{
               const token = await jwt.sign({email}, secretkey , {expiresIn:"1day"})
               console.log(token);
               
                return res.status(200).send({message:"user login successful", status: true, token}) 
            }
        }
        
    } catch (error) {
        res.status(500).send({message:`internal server error ${error.message}`, status:false})
    }
}

const verifytoken = async (req, res)=>{
try {
    let token = req.headers.authorization.split(" ")[1]
    if (!token) {
        res.status(400).send({message:"invalid token", status:false}) 
    }
    const user = jwt.verify(token, secretkey )
    console.log(user);
      const currentuser =   await usermodel.findOne({email:user.email})
    if (!user) {
       res.status(402).send({message:"jwt malformed", status:false}) 
    }else{
       return res.status(200).send({message:"token verified", status:true, currentuser})
    }
} catch (error) {
    console.log(error);
    if (error.message == "jwt malformed") {
        res.status(501).send({message:"Incorrect token", status:false})
    }
    res.status(500).send({message:`internal server error ${error.message}`, status:false})
}
 
}

const uploadProfile = async (req, res)=>{
    try {
        const {image } = req.body
        let token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token, secretkey )
        console.log(user.email);
       const uploadimage = await cloudinary.uploader.upload(image)
       if (!uploadimage) {

        res.status(400).send({message:"unable to upload image", status: false})
        
       }else{
         const uploadsuccessful =  await usermodel.findOneAndUpdate(
            {email: user.email},
            {$set:{profileImage:uploadimage.secure_url} })
    
    
            if (!uploadsuccessful) {
                res.status(400).send({message:"error occur while uploading image", status: false})
            }else{
                return res.status(200).send({message:"profile upload successful", status:true})
            }
       }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`internal server error ${error.message}`, status:false})
    }
 
}


module.exports = {Usersignup, userLogin, verifytoken, uploadProfile}