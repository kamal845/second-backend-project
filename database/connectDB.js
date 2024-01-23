const mongoose=require("mongoose");
const mongodbURL="mongodb://127.0.0.1:27017/secondproject";
const newConnection=async ()=>{
    try {
       await mongoose.connect(mongodbURL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true
});
console.log("congratulations.... database connected");
    } catch (error) {
        console.error("database is not connected");
    }
};
module.exports= newConnection;