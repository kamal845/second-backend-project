const express = require("express");
const bcrypt = require("bcrypt");
const __res = require("../help/response");
const loginModel = require("../models/login-model");
const signupModel = require("../models/signup-model");
const keys = require("../help/keys");
const jwt = require("jsonwebtoken");
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
  }  
};
