const mongoose = require('mongoose')
 
// const uri = process.env.URI

const dbconnect = async () =>{
    try {
      const connection = await  mongoose.connect(process.env.URI) 
      if (connection) {
        console.log("connected to database");
        
      }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = dbconnect