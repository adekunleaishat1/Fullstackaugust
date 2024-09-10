const express = require("express")

const userrouter = express.Router()

const {Usersignup, userLogin, verifytoken, uploadProfile} = require('../Controller/userController')


userrouter.post('/signup', Usersignup)
userrouter.post('/login', userLogin)
userrouter.get('/verify', verifytoken)
userrouter.post('/upload', uploadProfile)


module.exports = userrouter