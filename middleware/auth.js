//token ko verify karna authenticate karna
const express = require("express");
const bcrypt = require("bcrypt");
const __res = require("../help/response");
const loginModel = require("../models/login-model");
const signupModel = require("../models/signup-model");
const keys = require("../help/keys");
const jwt = require("jsonwebtoken");
const { create_token } = require("../controllers/signup");

module.exports={
verifyToken:async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
res.status(200).send({
    success:false,
    message:"A token is required for authentication"});
}
try {
   const decode=jwt.verify(token,keys.secret_jwt);
   req.user=decode; 
} catch (error) {
    res.status(400).send("invalid token");
}
return next();
}
}