const userModel = require('../model/login')
const jwt = require("jsonwebtoken")

let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.length === 0) return false;
    return true;
}

let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    return emailRegex.test(email);
}

const login = async function(req,res){
    try {
     let data = req.body

    if (!isValid(data.email)) return res.status(400).send({ status: false, msg: "email is a mandatory field" })
    if (!isValidEmail(data.email)) return res.status(400).send({ status: false, msg: `${data.email} is not valid` })
    if(!isValid(data.password))return res.status(400).send({status:false, message: `Password is required`})
           
  //==finding user==//      
  const user = await userModel.findOne({ email:data.email });
  
  if (!user) {
    return res.status(404).send({ status: false, message: data.email + " is not registered"});
  }
  //==creating token==//   
  let token = jwt.sign(
    {
        adminId:  user._id.toString(),
        
    },
    "Leewayhertz"
  );
  
  //==sending and setting token==// 
       res.header('authorization',token);
       res.status(200).send({status:true, message:`User login successfully`, data:{token}});
       
   } catch (error) {
      return res.status(500).send({status:false, message:error.message});
   }
  }

  module.exports = {login}