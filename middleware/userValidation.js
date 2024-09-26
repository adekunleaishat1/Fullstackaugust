const yup = require("yup")
 
const usernameregex =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,16}/

const uservalidation = yup.object().shape({
    username:yup.string().trim().matches(usernameregex, "username must be 6 to 16 character, a number and special characters").required("username is required"),
    email:yup.string().email("must be a valid email").trim().required("email is required"),
    password:yup.string().trim().required("password is required")
})


module.exports = {uservalidation}