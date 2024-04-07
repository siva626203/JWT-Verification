const mongoose=require('mongoose')
const User=require('../schema/users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports.Create =async (req, res) => {
  try {
    console.log(req.body)
    const user=new User(req.body)
    await user.save();
    res.send({user:user,message:"User Created"}) 
  } catch (error) {
    if (error?.errorResponse?.errmsg){ 
        res.send({message:"Email already exists"})
    }
    else{
        res.send(error);
    }
    
  }
};
module.exports.Login=async (req,res)=>{
    try {
        const login = await User.findOne({ email: req.query .email});
        if (login){

        
          if (bcrypt.compareSync(req.query.password, login.password)) {
            const token = jwt.sign(
              { data: login.address },
              process.env.JWT_SECRET,{
                expiresIn:'24h'
              }
            );
            res.send({message: "Login success" ,token:token});
          } else {
            res.send({ message: "Incorrect password" });
          }
        }else{
            res.send({message:"User not registered"})
        }
        
    } catch (error) {
        res.send(error);
    }
}
module.exports.Update=async(req,res)=>{
    try {
        const update=await User.updateOne({email:req.body.email},req.body)
        res.send({data:update,message:"modify success",})
    } catch (error) {
        res.send(error)
    }
}
module.exports.Delete = async (req, res) => {
  try {
    const update = await User.deleteOne({ email: req.body.email });
    res.send({ data: update, message: "delete success" });
  } catch (error) {
    res.send(error);
  }
};