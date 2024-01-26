const express=require("express");
const mongoose = require("mongoose");
const newConnection = require("./database/connectDB");
const middleware=require("./middleware/middleware");
const app=express();
// bodyparser
app.use(express.json());
//middleware
app.use('/', middleware);

//  const port = process.env.PORT || 3000;
// require("./help/config.env").config;
const port=4000;
app.listen(port,()=>{
    try {
    console.log("Server is running on the port" , newConnection());
    } catch (error) {
    console.log(error)
    }
})
