const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {secret}=require("../jwt _secret");
const jwt=require("jsonwebtoken");
const {Admin,Course}=require("../db/index");
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    await Admin.create({
        username:req.body.username,
        password:req.body.password
    });
    res.json({
        msg:"admin signed up successfully"
    });

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    // console.log("control is reaching here");
    const response = await Admin.findOne({
        username:req.body.username
    });
    // console.log(secret);
    // console.log(response);
    if(response){
        const token=jwt.sign(response.username,secret);
        res.json({
            yourSignInToken:token
        });
    }else{
        res.json({
            msg:"admin doesn't exist, please signup!"
        })
    }
    
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;
    const response=await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    });
    // console.log(response);
    if(response){
        res.json({
            msg:"course created successfully",
            courseid:response._id
        })
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response=await Course.find({});
    res.json({
        AllCourses:response
    })
});

module.exports = router;