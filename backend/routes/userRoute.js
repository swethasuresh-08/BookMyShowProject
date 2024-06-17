const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const router=express.Router()

router.post("/register",async (req,res)=>{
   

   //Always put these kind of request in try & catch block
   try{
       
        
        //Wenever user registering for first tym, hash the password
       
        //Salt is a string of random value stored wid hash value to make it more secured
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword

//       console.log(req.body)

       const requestBody=req.body

        //Schema will check for validation
        const newUser=new User(requestBody)
        const user = await User.findOne({email:req.body.email})
        if(!user)
            {
                await newUser.save()
                //Commit the changes to db 
                res.status(200).json({success:true,message:"User has been created"})
            }
        else
        {
            res.status(400).json({success:false,message:"User Already Registered"})    
        }
        
   }
   catch(e)
   {
        console.log(e)
        res.status(500).json({success:false,message:"Internal Server Error"})
   }
})

router.post("/login",async (req,res)=>{
    //Validate User
    const user = await User.findOne({email:req.body.email})
    if(!user)
        {
            return res.send({
                success:false,
                message:"User Not Found"
            })
        }
    //Validate Password
    const isPassword= await bcrypt.compare(req.body.password,user.password)
    if(!isPassword)
        {
            return res.send({
                success:false,
                message:"Password is Invalid"
            })
        }
        const token=jwt.sign({userId:user._id,randomKey:"randomValue"},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).json({success:true,message:"User Login is Success",jwtToken:token})
})

module.exports=router