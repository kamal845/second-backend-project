const express = require("express");
const bcrypt = require("bcrypt");
const __res = require("../help/response");
const loginModel = require("../models/login-model");
const signupModel = require("../models/signup-model");
const keys = require("../help/keys");
const jwt = require("jsonwebtoken");
const Blacklist=require("../models/Blacklist-model");
const { create_token } = require("../controllers/signup");
module.exports = {
  securePassword: async (password) => {
    try {
      const passwordHashed = await bcrypt.hash(password, 10);
      return passwordHashed;
    } catch (error) {
      throw new Error("Password hashing failed");
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.Email;
      const password = req.body.Password;
      const user = await signupModel.findOne({ Email: email });
      if (user) {
        // Compare the raw password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.Password);
console.log("Password Match:", passwordMatch);
        if (passwordMatch) {
          if (user._id) {
            // const tokenData = await create_token(user._id);
            const tokenData = await create_token(user._id);
            console.log("Generated Token:", tokenData);
          const logedResult = await loginModel.create({
            _id: user._id,
            Firstname: user.Firstname,
            Email: user.Email,
            Password: user.Password,  
            token: tokenData,
          });
return res.status(200).json({
  statusCode: 200,
  message: "successfull!",
   data: {
    _id: user._id,
    name: user.Firstname,
    email: user.Email,
    token: tokenData,
  },
 });
        } else {
          return __res.out(res, {
            statusCode: 401, // Unauthorized
            message: "Invalid credentials",
          });
        }
      } else {
        console.log("User not found:", email);
        return __res.out(res, {
          statusCode: 401, // Unauthorized
          message: "Invalid credentials",
        });
      }
    }
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("User:", user);

    }  catch (error) {
    console.error("Error in login:", error);
    console.error("Error in login: User ID is not defined");
      
    return __res.out(res, {
      statusCode: 500,
      message: "Internal server error",
      error: error.message, // Log the error message
    });
  } 
  },
  //verify token
  verifyToken: async (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      return res.status(403).json({
        success: false,
        msg: "this session is expired please try again",
      });
    }
    try {
        const bearer=token.split(' ');
        const bearerToken= bearer[1];
        const blacklistedToken=await Blacklist.findOne({token:bearerToken});
        const decodedData=jwt.verify(bearerToken,keys.secret_jwt);
        req.user=decodedData
    } 
catch (error) {
        return res.status(400).json({
            success:false,
            msg:"invalid token"
        })
    }
   return next(); 
  },
  //logout
  logout: async (req, res) => {
    try {
      const token = req.body.token || req.query.token || req.headers['authorization'];
      console.log("Original Token:", token);
      const bearer = token.split(' ');
      const bearerToken = bearer[1];
      console.log("Token blacklisted successfully:", bearerToken);
  
      // Use a different name for the instance, e.g., blacklistInstance
      const blacklistInstance = new Blacklist({
        token: bearerToken
      });
  
      await blacklistInstance.save();
  
      // res.setHeader('Clear-Site-Data','"cookies","storage"');
      return res.status(200).json({
        success: true,
        msg: "successfully logged out",
        blacklistedToken: bearerToken
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        msg: "not done successfully"
      });
    }
  }
};
