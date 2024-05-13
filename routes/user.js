const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {secret}=require("../jwt _secret");
const jwt=require("jsonwebtoken");
const {User,Course}=require("../db/index");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    await User.create({
        username:req.body.username,
        password:req.body.password
    });
    res.json({
        msg:"user signed up successfully"
    });
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const response = await User.findOne({
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

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response=await Course.find({});
    res.json({
        AllCourses:response
    })

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    // const authorization=req.headers.authorization;
    // const myarr=authorization.split(" ");
    // const token=myarr[1];
    // const decoded_jwt=jwt.decode(token);

    const courseid=req.params.courseId;
    // console.log(decoded_jwt);
    // console.log(courseid);
    const response = await User.updateOne({
        username:req.username //sent from userMiddleware 
    },{
        "$push":{
            course:courseid
        }
    });
    // res.json({
    //     msg:"purchase complete"
    // });
    // console.log(response);
    if(response){
        res.json({
            msg:"course purchased successfully"
        })
    }else{
        res.json({
            msg:"some internal error"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    // const authorization=req.headers.authorization;
    // const myarr=authorization.split(" ");
    // const token=myarr[1];
    // const decoded_jwt=jwt.decode(token);

    const response=await User.findOne({
        // username:decoded_jwt
        username:req.username
    })
    // console.log(response);
    res.json({
        UserPurchasedCourses:response.course
    })

});

module.exports = router