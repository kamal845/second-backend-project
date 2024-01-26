const express = require("express");
const bcrypt = require("bcrypt");
const __res = require("../help/response");
const signupModel = require("../models/signup-model");
module.exports = {
   signup: async (req, res) => {
     try {
        const { Firstname, Lastname, Phone, Email, Password } = req.body;
       console.log("Received data:", req.body);
       const existinguser = await signupModel.findOne({ Email });
        if (existinguser) {
         console.log("User already exists:", existinguser);
  return __res.out(res, {
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
      return __res.out(res, {
        statusCode: 200,
        message: "Success",
        resultData: user,
      });
    } catch (error) {
      return __res.out(res, {
        statusCode: 500,
        resultData: null,
        error: error.message,
      });
    }
  },
   signout: async (req, res) => {
     try {
      const{Firstname,Email}=req.body;
       const existinguser = await signupModel.findOne({ Firstname , Email });
       if (existinguser === null) {
         return __res.out(req, res, {
           statusCode: 400,
           message: "user doesn't exist",
         });
       } else if (!Email || !Firstname) {
         return __res.out(res, {
           statusCode: 404,
           message: "invalid credential",
         });
       } else {
         return __res.out(res, {
           statusCode: 200,
           message: "successfully signout",
           data:existinguser
         });
       }
     } catch (error) {
       return __res.out( res, {
         statusCode: 500,
         message: "internal server error",
         data: "not found",
       });
     }
   }
};