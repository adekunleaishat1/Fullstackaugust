const express = require('express')
const app = express()
const dbconnect = require('./Config/db.config')
require("dotenv").config()
const userrouter = require('./Routes/userRouter')
const productrouter = require('./Routes/productRouter')
const cors = require('cors')
const socket = require("socket.io")
const chatmodel = require("./Model/ChatModel")


app.use(express.json({extended:true, limit:"50mb"}))
app.use(cors({origin:"*"}))
app.use('/user', userrouter)
app.use('/product', productrouter)




dbconnect()
let port = process.env.PORT || 8004

const connection = app.listen(port,()=>{
   console.log(`app started at port ${port}`);
   
})


const io = socket(connection,{
   cors:{origin:"*"}
})

io.on("connection", async(socket)=>{
   console.log("a user connected successfuly");
   socket.on("chat", async(allmessage)=>{
      console.log(allmessage);
     const createdchat = await chatmodel.create({chat:message})
     if (createdchat) {
      const allchat = await chatmodel.find()
      socket.emit("receivemessage",allchat )
     }

   })
  
   const allchat = await chatmodel.find()
   socket.emit("receivemessage",allchat )
   
   
})