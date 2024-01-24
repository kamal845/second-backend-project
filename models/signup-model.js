const mongoose = require("mongoose");
const signupschema=mongoose.Schema({
Firstname:{
    type:String,
    required:true
},
Lastname:{
    type:String,
    required:true
},
Phone:{
    type:Number,
    required:true
},
Email:{
    type:String,
    require:true,
    unique: true
},
Password:{
    type:String,
    required:true
}
})

module.exports=mongoose.model('signup',signupschema);