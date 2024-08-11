import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator";

// login user

const loginUser =async(req,res)=>{
    const {email,password}=req.body;
    try {
       const user=await userModel.findOne({email})
       if(!user){
         return res.json({success:false,message:"User doesn't exist"})
       }
       const isMatch=await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.json({success:false,message:"Password not matching"})
       }

       const token= createToken(user._id);
       res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:`${error}`})
    }
}

const createToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user 

const registerUser =async(req,res)=>{
  const {name,password,email}=req.body;
  try {
    //checking email already taken
    const exists=await userModel.findOne({email});
    if(exists)
    {
        return res.json({success:false,message:"User Already Exist"})
    }
    //validating email format and string password

    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter valid Email"})
    }
    if(password.length<5){
        return res.json({success:false,message:"Password should have atleast 5 characters"})
    }

    // hashing user password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser= new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user= await newUser.save()
    const token=createToken(user._id)
    res.json({success:true,token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:`${error}`});
  }
}

export {loginUser,registerUser}