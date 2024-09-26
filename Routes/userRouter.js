const express = require("express")

const userrouter = express.Router()
const {uservalidation} = require("../middleware/userValidation")
const {validator} = require("../middleware/Validator")

const {Usersignup, userLogin, verifytoken, uploadProfile} = require('../Controller/userController')


userrouter.post('/signup',validator(uservalidation),Usersignup)
userrouter.post('/login', userLogin)
userrouter.get('/verify', verifytoken)
userrouter.post('/upload', uploadProfile)


module.exports = userrouter