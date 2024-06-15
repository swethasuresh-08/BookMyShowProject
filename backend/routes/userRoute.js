const express=require('express')
const User=require('../models/userModel')

const router=express.Router()

router.post("/register",async (req,res)=>{
   const requestBody=req.body

   //Always put these kind of request in try & catch block
   try{
        //Schema will check for validation
        const newUser=new User(requestBody)
        
        //Commit the changes to db 
        await newUser.save()
        res.status(200).json({success:true,message:"User has been created"})

   }
   catch(e)
   {
        res.status(500).json({success:false,message:"Internal Server Error"})
   }
})

router.post("/login",(req,res)=>{
    res.status(200).json({message:"User Login API is called"})
})

module.exports=router