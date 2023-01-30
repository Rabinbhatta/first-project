import  Jwt  from "jsonwebtoken";

export const verifyToken = async (req, res , next) =>{
    try {
        const token = req.header("Authorization")
        if(!token){
            res.status(404).json({message : "Acess denied"})
        }
        if(token.startsWith("Bearer")){
            token = token.slice(7,token.length).trimLeft();
        }
        const verified = Jwt.verify(token, Jwt_Secret);
        req.user = verified;
        next()
    } catch (err) {
        res.status(404).json({message : err.message})
    }
} 