const express=require("express");
const app=express();
const route= require("../routes/route");

app.use('/signup',route);
app.use('/signout',route);
app.use('/login',route);
app.use('/logout',route);
module.exports=app;