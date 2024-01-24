const express=require("express");
const router=express.Router();
const loginController=require("../controllers/login");
const signupController=require("../controllers/signup");
//signup signout
router.post('/signup',signupController.signup);
router.post('/signout',signupController.signout);
//login logout
router.get('/login',loginController.login);
router.get('./logout',loginController.logout);
module.exports=router;