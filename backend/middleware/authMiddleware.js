const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1]
        
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        
        req.body.userId=decodedToken.userId
        
        //Next middleware moves to watever next in flow
        next()
         
    }catch(error)
    {
        res.status(401).json({
            success:false,
            message:"Login Failed"
        })
    }
}