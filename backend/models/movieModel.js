const mongoose=require('mongoose')

//Schema provides validation to MongoDB
const moviesSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    poster:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("movies",moviesSchema)
