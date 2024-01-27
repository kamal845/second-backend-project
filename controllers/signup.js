const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../help/keys");
// const __res = require("../help/response");
const signupModel = require("../models/signup-model");
module.exports = {
  create_token: async (id) => {
    try {
      const token = await jwt.sign({ _id: id }, keys.secret_jwt);
      return token;
    } catch (error) {
      console.error("Error creating token:", error);
      throw new Error("Failed to create token");
    }
  },
   signup: async (req, res) => {
      try {
         const { Firstname, Lastname, Phone, Email, Password } = req.body;
         console.log("Received data:", req.body);
        const existinguser = await signupModel.findOne({ Email });
         if (existinguser) {
          console.log("User already exists:", existinguser);
         return res.status(400).json({
         statusCode: 400,
         message: "User exists",
        });
 }
    //ye next line password hash karne ke liye jisme bcrypt ka use kia gya hai
       const hashedPassword = await bcrypt.hash(Password, 10);
       const user = new signupModel({
         Firstname,
         Lastname,
         Phone,
         Email,
         Password: hashedPassword,
       });
       await user.save();
       console.log("User saved:", user);
       return res.status(200).json({
         statusCode: 200,
         message: "Success",
         resultData: user,
       });
     } catch (error) {
      console.error("Unexpected error in signup route:", error);
      return res.status(500).json({
        statusCode: 500,
        resultData: null,
        error: "Internal server error",
      });
    
     }
   },
   signout: async (req, res) => {
     try {
      const{Firstname,Email}=req.body;
       const existinguser = await signupModel.findOne({ Firstname , Email });
       if (existinguser === null) {
         return res.status(400)({
           statusCode: 400,
           message: "user doesn't exist",
         });
       } else if (!Email || !Firstname) {
         return res.status(404).json({
           statusCode: 404,
           message: "invalid credential",
         });
       } else {
         return res.status(200).json({
           statusCode: 200,
           message: "successfully signout",
           data:existinguser
         });
       }
     } catch (error) {
       return res.status(500).json({
         statusCode: 500,
         message: "internal server error",
         data: "not found",
       });
     }
   }
};