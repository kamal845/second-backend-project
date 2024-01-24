const express = require("express");
const bcrypt = require("bcrypt");
const __res = require("../help/response");
const signupModel = require("../models/signup-model");
module.exports = {
  signup: async (req, res) => {
    try {
      const { Firstname, Lastname, Phone, Email, Password } = req.body;
      const existinguser = await signupModel.findOne({ Email });
      if (existinguser) {
        return __res.out(req, res, {
          statusCode: 400,
          message: "user exist",
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
      return __res.out(req, res, {
        statusCode: 200,
        message: "success",
        data: user,
      });
    } catch (error) {
      return __res.out(req, res, {
        statusCode: 500,
        message: "internal server error or invalid data",
        data: null,
      });
    }
  },
  signout: async (req, res) => {
    try {
      const existinguser = await signupModel.find({ Email, Firstname });
      if (existinguser === null) {
        return __res.out(req, res, {
          statusCode: 400,
          message: "user doesn't exist",
        });
      } else if (!Email || !Firstname) {
        return __res.out(req, res, {
          statusCode: 404,
          message: "invalid credential",
        });
      } else {
        return __res.out(req, res, {
          statusCode: 200,
          message: "successfully signout",
          data:null
        });
      }
    } catch (error) {
      return __res.out(req, res, {
        statusCode: 500,
        message: "internal server error",
        data: null,
      });
    }
  },
};
