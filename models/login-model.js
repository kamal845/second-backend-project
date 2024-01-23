const mongoose=require("mongoose");
const loginschema=mongoose.Schema({
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
    minlength:3
}
})
module.exports=mongoose.model('login',loginschema);