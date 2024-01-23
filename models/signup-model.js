const mongoose = require("mongoose");
const signupschema=mongoose.Schema({
firstname:{
    type:String,
    required:true
},
lastname:{
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
}
})

module.exports=mongoose.model('signup',signupschema);