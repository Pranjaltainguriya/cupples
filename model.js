
const mongoose=require("mongoose")
const newSchema=new mongoose.Schema({
    name:{
        type:String,
require:true
    },
    message:{
        type:String,
require:true
    } 
})
  const User=mongoose.model("User",newSchema)
  module.exports=User