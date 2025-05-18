const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")
const User=require("../models/user")
const userverify=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    console.log("token",token)
    const playLoad=jwt.verify(token,"my-very-secure-secret")
    console.log("playLoad",playLoad)
    const user=await User.findById(playLoad.id)
    if(!user){
        return res.status(400).send({message:"user not found"})
    }
    req.user=user
    next()
}
router.use(userverify)
router.post("/",async(req,res)=>{
  console.log("user",req.user)  
    res.send({user:req.user})
})

module.exports=router