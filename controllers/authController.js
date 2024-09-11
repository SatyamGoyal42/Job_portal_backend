import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name) {
    next("Please Provide Name");
  }
  if (!password) {
    next("Please Provide Password");
  }
  if (!email) {
    next("Please Provide Email");
  }
  const existing = await userModel.findOne({ email });
  if (existing) {
    next("Email already registered, Sign In");
  }

  const user = await userModel.create({ name, email, password });
  const token = user.createJWT() // the function which was created in userModel

  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user,
    token
  });
};

export const loginController = async(req,res,next)=>{
    const {email,password} = req.body

    //validation
    if(!email || !password){
        next("Please Provide all Fields")
    }
    const user = await userModel.findOne({email})
    if(!user){
        next("Invalid Credentials")
    } 

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next("Invalid UserName or Password")
    }  
    const token = user.createJWT()
    res.status(200).json({
        success:"true",
        message:"login successful",
        user,
        token
    })
}
