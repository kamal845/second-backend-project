const express = require("express");
const bcrypt = require("bcrypt");
const __res = require("../help/response");
const loginModel = require("../models/login-model");
const keys = require("../help/keys");
const jwt = require("jsonwebtoken");
module.exports = {
  create_token: async (id) => {
    try {
      const token= await jwt.sign({_id:id},keys.secret_jwt);
      return token;
    } catch (error) {
        return __res.out(req, res, {
            statusCode: 404,
            message: "failed",
            data: nil
          });
    }
  },
  securePassword: async (password) => {
    try {
      const passwordHashed = await bcrypt.hash(password, 10);
      return passwordHashed;
    } catch (error) {
      return __res.out(req, res, {
        statusCode: 400,
        message: "not done",
      });
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.Email;
      const password = req.body.Password;
      const username = req.body.Username;
      const logedin = await loginModel.find({ email: Email });
      if (logedin) {
        //ye password ko compare karne ke liye hai.
        const passwordMatch = await bcrypt.compare(password, logedin.Password);
        if (passwordMatch) {
const tokenData=await create_token(logedin._id);
          const logedResult = {
            _id: logedin._id,
            name: logedin.Username,
            email: logedin.Email,
            password: logedin.Password,
            token: tokenData
          };
        }
        const response = {
          msg: "loged in",
          data: logedin,
        };
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
  logout: async (req, res) => {
    try {
    } catch (error) {}
  },
};
