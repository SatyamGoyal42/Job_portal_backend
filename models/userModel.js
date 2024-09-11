import mongoose, { mongo, MongooseError } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    location: {
      type: String,
      default: "India",
    },
  },

  { timestamps: true }
);
userSchema.pre('save',async function(){
      if(!this.isModified) return;
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password,salt);
})

// JWT middleware
userSchema.methods.createJWT =  function(){
      return JWT.sign({userId : this._id},process.env.JWT_KEY,{expiresIn : '1d'})
}
// Compare Password
userSchema.methods.comparePassword = async function(userPassword){
  const isMatch = bcrypt.compare(userPassword,this.password);
  return isMatch;   
}

export default mongoose.model("User", userSchema);
