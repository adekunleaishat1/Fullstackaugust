const cloudinary = require("cloudinary").v2



cloudinary.config({
    cloud_name: 'daniyfc28', 
    api_key: process.env.APIKEY,
    api_secret: process.env.API_SECERET
})



module.exports = cloudinary