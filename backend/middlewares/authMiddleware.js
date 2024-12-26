const jwt = require("jsonwebtoken");
async function loginCheck(req,res,next) {
    try {
       const token = req.cookies.token;
       if(!token) {
           return res.status(401).json({
               success: false,
               message: "Token is missing",
           });
       } 
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        })
       }
       req.user = decoded;
       next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });  
    }
}

module.exports = loginCheck;