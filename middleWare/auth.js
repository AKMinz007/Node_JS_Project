const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{

    try{
        const token = req.headers.authorization.split(" ")[1];
        const userInfo = jwt.verify(token,"10xAcademySecret");
        req.userId = userInfo.id;
        next();
    }
    catch(err){
        res.status(401).json({
            message:"Authentication failed",
            error:err
        })
        // next();
    }

    
}