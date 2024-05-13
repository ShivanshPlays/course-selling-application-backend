const {secret}=require("../jwt _secret");
const jwt=require("jsonwebtoken");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authorization=req.headers.authorization;
    const myarr=authorization.split(" ");
    const token=myarr[1];

    try{
        const response=jwt.verify(token,secret);
        // console.log(response);
        if(response){
            req.username=response;
            next();
        }
    }catch(err){
        res.status(401).json({
            msg:"unauthorised"
        })
    }
    
    
}

module.exports = userMiddleware;