const router=require("express").Router()
const Theatre=require("../models/theatreModel")
const authMiddleware=require('../middleware/authMiddleware')

router.get("/get-all-theatres-by-user-id", authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find({ owner: req.body.userId })

        res.status(200).send({
            success: true,
            message: "Theatres fetched",
            theatres
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was some issue in fetching theatres for user.",
        })
    }
})

router.get("/get-all-theatres", async (req, res) => {
    try {
        const theatres = await Theatre.find().populate("owner","-password")

        res.status(200).send({
            success: true,
            message: "Theatres fetched",
            theatres
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was some issue in fetching theatres for user.",
        })
    }
})

router.post("/add-theatre",async (req,res)=>{
    try{
        const newTheatre=new Theatre(req.body)
        await newTheatre.save()

        res.status(200).json({success:true,message:"Theatre has been created"})

    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"There was some error in adding movies"
        })
    }
})

router.get("/get-theatre",authMiddleware,async (req,res)=>{
    try{
        const theatres=await Theatre.find()
        res.status(200).json({
            success:true,
            message:"Theatres Fetched",
            theatres
        })
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:"There was error fetching movies"
        })
    }
})

router.post("/update-theatre",authMiddleware,async (req,res)=>{
    try{
       await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
        res.send({
            success:true,
            message:"Theatre has been found by id and updated"
        })

    }
    catch(error)
    {
        res.send({
            success:false,
            error:"Something went wrong"
        })
    }
})

router.post("/delete-theatre",authMiddleware,async (req,res)=>{
    try{
        await Theatre.findByIdAndDelete(req.body.theatreId)
        res.send({
            success:true,
            message:"Theatre Deleted successfully"
        })
    }
    catch(error)
    {
        res.send({
            success:false,
            message:"Something went wrong"
        })
    }
})
module.exports=router