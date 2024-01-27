const express=require("express");
const router=express.Router();
const loginController=require("../controllers/login");
const signupController=require("../controllers/signup");
const auth=require("../middleware/auth");
//signup signout
router.post('/signup',signupController.signup);
router.post('/signout',signupController.signout);
//login logout
router.get('/login',loginController.login);

// router.get('/logout',loginController.logout);
//verify token
router.post('/login/token', auth.verifyToken, function (req, res) {
    res.status(200).send({ success: true, msg: "authenticated successfully" });
});
module.exports=router;