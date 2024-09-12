const express = require('express')
const app = express()
const dbconnect = require('./Config/db.config')
require("dotenv").config()
const userrouter = require('./Routes/userRouter')
const productrouter = require('./Routes/productRouter')
const cors = require('cors')


app.use(express.json({extended:true, limit:"50mb"}))
app.use(cors({origin:"*"}))
app.use('/user', userrouter)
app.use('/product', productrouter)




dbconnect()
let port = process.env.PORT || 8004

app.listen(port,()=>{
   console.log(`app started at port ${port}`);
   
})