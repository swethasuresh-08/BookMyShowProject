const router=require("express").Router()
const Show=require("../models/showModel")
const authMiddleware=require('../middleware/authMiddleware')

router.get("/get-all-shows-by-theatre-id/:theatreId", authMiddleware, async (req, res) => {
    try {
        const shows = await Show.find({theatre:req.params.theatreId}).populate("movie").populate("theatre")
        console.log(req.params.theatreId)
        
        res.status(200).send({
            success: true,
            message: "shows fetched",
            shows
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was some issue in fetching shows for user.",
        })
    }
})

router.get("/get-show-by-id/:showId",authMiddleware,async(req,res)=>{
    try {
        const show = await Show.findById(req.params.showId).populate("movie").populate("theatre")
        console.log(req.params.theatreId)
        
        res.status(200).send({
            success: true,
            message: "show fetched",
            show
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "There was some issue in fetching shows for user.",
        })
    }
})
// router.get("/get-all-theatres", async (req, res) => {
//     try {
//         const theatres = await Theatre.find().populate("owner","-password")

//         res.status(200).send({
//             success: true,
//             message: "Theatres fetched",
//             theatres
//         })
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "There was some issue in fetching theatres for user.",
//         })
//     }
// })

router.post("/add-show",async (req,res)=>{
    try{
        const newShow=new Show(req.body)
        await newShow.save()

        res.status(200).json({success:true,message:"New show has been created"})

    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"There was some error in adding shows"
        })
    }
})

// router.get("/get-theatre",authMiddleware,async (req,res)=>{
//     try{
//         const theatres=await Theatre.find()
//         res.status(200).json({
//             success:true,
//             message:"Theatres Fetched",
//             theatres
//         })
//     }catch(error)
//     {
//         res.status(500).json({
//             success:false,
//             message:"There was error fetching movies"
//         })
//     }
// })

// router.post("/update-theatre",authMiddleware,async (req,res)=>{
//     try{
//        await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
//         res.send({
//             success:true,
//             message:"Theatre has been found by id and updated"
//         })

//     }
//     catch(error)
//     {
//         res.send({
//             success:false,
//             error:"Something went wrong"
//         })
//     }
// })

router.post("/delete-show",authMiddleware,async (req,res)=>{
    try{
        await Show.findByIdAndDelete(req.body.showId)
        res.send({
            success:true,
            message:"Show Deleted successfully"
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