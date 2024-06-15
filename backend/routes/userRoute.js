const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../models/userModel')

const router=express.Router()

router.post("/register",async (req,res)=>{
   

   //Always put these kind of request in try & catch block
   try{
       
        
        //Wenever user registering for first tym, hash the password
       
        //Salt is a string of random value stored wid hash value to make it more secured
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword

       console.log(req.body)

       const requestBody=req.body

        //Schema will check for validation
        const newUser=new User(requestBody)
       
        //Commit the changes to db 
        await newUser.save()
        res.status(200).json({success:true,message:"User has been created"})

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
    res.status(200).json({message:"User Login is Success"})
})

module.exports=router