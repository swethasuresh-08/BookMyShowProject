const express = require('express')

const userRoute=require('../backend/routes/userRoute')
const PORT=5000

//Always add the config file and den import db config
require("dotenv").config()
const dbConfig=require('./config/dbConfig')

const app=express()
app.use(express.json())

//Route Middleware
app.use("/api/users",userRoute)

//Start Server
app.listen(PORT,()=>{
    console.log("Server started successfully")
})