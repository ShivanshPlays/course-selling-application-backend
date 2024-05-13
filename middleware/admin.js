// Middleware for handling auth
const {secret}=require("../jwt _secret");
const jwt=require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authorization=req.headers.authorization;
    const myarr=authorization.split(" ");
    const token=myarr[1];
    try{
        const response=jwt.verify(token,secret);
        if(response){
            next();
        }
    }catch(err){
        res.status(401).json({
            msg:"unauthorised"
        })
    }


}

module.exports = adminMiddleware;