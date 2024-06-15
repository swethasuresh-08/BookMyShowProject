const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:false,
        default:false
    }
})

//Model is a interface between code and database
//Name we give in model will create a collection in mongo db atlas
//Schema will always validate the information of whether we created right
const userModel=mongoose.model("users",userSchema)

module.exports=userModel
