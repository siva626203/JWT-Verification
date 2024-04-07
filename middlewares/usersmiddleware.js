const jwt=require('jsonwebtoken')
module.exports.UserMiddleware=(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ");
            jwt.verify(token[1], process.env.JWT_SECRET);
            next();
        }else{
            res.send(`Token not entered`,)
        }
    } catch (error) {
        res.send(error)
    }
}