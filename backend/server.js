const express = require('express')
const cors=require('cors')
const userRoute=require('../backend/routes/userRoute')
const movieRoute=require('./routes/movieRoute')
const theatreRoute=require('./routes/theatreRoute')
const showRoute=require('./routes/showRoute')

const PORT=5000

//Always add the config file and den import db config
require("dotenv").config()
const dbConfig=require('./config/dbConfig')


const app=express()
app.use(express.json())
app.use(cors())
//Route Middleware
app.use("/api/users",userRoute)
app.use("/api/movies",movieRoute)
app.use("/api/theatres",theatreRoute)
app.use("/api/shows",showRoute)
//Start Server
app.listen(PORT,()=>{
    console.log("Server started successfully")
})