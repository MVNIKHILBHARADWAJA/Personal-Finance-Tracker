import User from "../models/UserModel.js";
import ExpressError from "../utils/ExpressError.js";
import { tokenGeneration } from "../utils/jwt.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcrypt from "bcrypt";

export const signUp=wrapAsync(async(req,res,next)=>{
    const {email,password,username}=req.body;
    let user=await User.findOne({email:email});
    if(user)
    {
        return next(new ExpressError(400,"user already exist with mail"));
    }
    const hashedPassword=await bcrypt.hash(password,10);

     user=new User({email,password:hashedPassword,username});
    await user.save();

    const token=tokenGeneration({id:user._id});

    res.status(201).json({token,message:"user created succesfully"});

});
export const signIn=wrapAsync(async(req,res,next)=>{
 const {email,password}=req.body;
  
 const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = tokenGeneration({ id: user._id });
    res.status(200).json({ message: "Login successful", token });

});




