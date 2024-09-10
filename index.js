const express = require('express')
const app = express()
const dbconnect = require('./Config/db.config')
require("dotenv").config()
const userrouter = require('./Routes/userRouter')
const cors = require('cors')


app.use(express.json({extended:true}))
app.use(cors({origin:"*"}))
app.use('/user', userrouter)




dbconnect()
let port = process.env.PORT || 8004

app.listen(port,()=>{
   console.log(`app started at port ${port}`);
   
})