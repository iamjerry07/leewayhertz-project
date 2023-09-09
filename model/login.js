const mongoose= require('mongoose')

const login = new mongoose.Schema({
email:{
    type:String,
    required:true
},
password:{
    type:Number,
    required:true
}
}
,{timestamps:true})

module.exports = mongoose.model("login", login);