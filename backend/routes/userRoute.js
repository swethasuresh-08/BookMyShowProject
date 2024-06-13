const express=require('express')

const router=express.Router()

router.post("/register",(req,res)=>{
    res.status(200).json({message:"User Register API is called"})
})

router.post("/login",(req,res)=>{
    res.status(200).json({message:"User Login API is called"})
})

module.exports=router