
const validator  = (schema) => async (req, res, next) =>{
    const body = req.body
    try {
        const uservalidate = await schema.validate(body)
        if (uservalidate) {
           console.log("validation successful");
           next()
        }
    } catch (error) {
        console.log(error);
        
        res.status(409).send({message:`validation error ${error.message}`, status:false})
    }
}


module.exports = {validator}