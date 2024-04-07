const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const encode=(value)=>{
    return bcrypt.hashSync(value,10)
    
}
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, set: encode },
  phone: { type: Number, length: 10, required: true },
  address: { type: String, required: true },
  dob: { type: String, required: true },
});
var User;
try {
    User=mongoose.model("users",UserSchema)
} catch (error) {
    User = mongoose.model("users");
}
module.exports=User