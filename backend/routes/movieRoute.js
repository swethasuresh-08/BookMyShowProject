const router=require("express").Router()
const Movie=require("../models/movieModel")

router.post("/add-movie",async (req,res)=>{
    try{
        const newMovie=new Movie(req.body)
        await newMovie.save()

        res.status(200).json({success:true,message:"Movie has been created"})

    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"There was some error in adding movies"
        })
    }
})

router.get("/get-movie",async (req,res)=>{
    try{
        const movies=await Movie.find()
        res.status(200).json({
            success:true,
            message:"Movies Fetched",
            movies
        })
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:"There was error fetching movies"
        })
    }
})

router.post("/update-movie",async (req,res)=>{
    try{
       await Movie.findByIdAndUpdate(req.body.movieId,req.body)
        res.send({
            success:true,
            message:"Movie has been found by id and updated"
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
module.exports=router