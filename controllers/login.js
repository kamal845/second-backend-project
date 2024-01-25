const express=require("express");
const bcrypt=require("bcrypt");
const __res=require("../help/response");
const loginModel=require("../models/login-model");
// const jwt = require("jwt");
module.exports={
    securePassword:async(password)=>{
try {
    const passwordHashed = await bcrypt.hash(password, 10);
  return  passwordHashed;
} catch (error) {
    return __res.out(req, res, {
        statusCode: 400,
        message: "not done",
      });
}
    },

    login:async(req,res)=>{  
    try {
        const email=req.body.Email;
        const password=req.body.Password;
        const username=req.body.Username;
        const logedin=await loginModel.find({email:Email});
        if (logedin) {
            //ye password ko compare karne ke liye hai.
         const passwordMatch= await bcrypt.compare(password,logedin.Password);
         if(passwordMatch){
            const logedResult={
                name:logedin.Username,
                email:logedin.Email,
                password:logedin.Password
            }
         }
         const response={
            msg:"loged in",
            data:logedin
         }
         return __res.out(req, res, {
            statusCode: 200,
            message: "success",
            data: response,
          });
        } else {
            return __res.out(req, res, {
                statusCode: 404,
                message: "invaled credential",
              });  
        }
    } catch (error) {
        return __res.out(req, res, {
            statusCode: 500,
            message: "internal server error",
          });
    }
    },
    logout:async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
    }
    }