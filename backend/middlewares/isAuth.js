import jwt from "jsonwebtoken";
const isAuth = (req,res,next) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"token not found"})
            
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(401).json({message:"token not verify"})
        }      
        req.userId=decodeToken.userId
        next()
    } catch (error) {
        console.log("isAuth error",error.message);
        
         return res.status(401).json({message:"Invalid or expired token"})
    }
};

export default isAuth;