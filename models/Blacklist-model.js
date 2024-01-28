const mongoose=require("mongoose");
const blacklistSchema=new mongoose.Schema({
token:{
    type:String
},
},
{ timestamps:true});
module.exports=mongoose.model('Blacklist',blacklistSchema);