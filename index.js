const express=require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const newConnection = require("./database/connectDB");
const app=express();
app.use(express.json());
 const port = process.env.PORT || 3000;
require("./help/config.env").config;

app.listen((port)=>{
    try {
    // console.log(`Server is running on the port ${PORT}, Database is connected`);
    // console.log(newConnection());
    console.log(`Server is running on the port ${PORT}`, newConnection());
    } catch (error) {
    console.log(error)
    }
})