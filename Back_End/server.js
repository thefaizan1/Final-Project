//Package imports for project
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const{register,adminLogin,voterReg} = require('./models/registration')
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')


//Bootstrap code for project running
const app= express();
 app.use(cors());
 app.use(express.json());
 

 mongoose.connect("mongodb://127.0.0.1:27017/Registration");
 

 //User Registration 
 app.post('/register',function(req,res){
  
  const{email,password}=req.body;

  const usernamee= req.body.username;
  
  register.findOne({username:usernamee})
  .then(function(user){
    if(user){
      res.json("User Already Existed");
    }
    else{
    register.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))     
    }
  }

  )

  //  register.create(req.body)
  //  .then(users => res.json(users))
  //  .catch(err => res.json(err))

 });


 //User Login
 app.post('/userlogin',function(req,res){
  const {username,password}=req.body;
   register.findOne({username:username})
   .then(user => {
    if(user){
      if(user.password===password){
        res.json(username);
      }
      else {
        res.json("incorrect password");
      }
    }
    else{
      res.json("user not registered kindly register")
    }
   })

 })



 //Admin Login
 app.post('/adminlogin',function(req,res){
  adminLogin.findOne({username:req.body.username})
  .then(admin =>{
    if(admin){
      if(admin.password===req.body.password){
        console.log("admin verified");

        res.json("valid");
        
      }
    }
    else{
      res.json("invalid");
    }
  })
 })



//Voters Registration
 app.post('/voterRegistration',function(req,res){
  const {username,usrotp,sysotp,acc_address,aadhar_no}=req.body
  // console.log(sysotp,usrotp);
  voterReg.findOne({aadhar_no})
  .then(found_aadhar=>{
    if(found_aadhar){
      res.send("Aadhar Number is already registered");
    }
    else{
      if(usrotp==sysotp){
      voterReg.create({username:username,
        acc_address:acc_address,
        aadhar_no:aadhar_no})
        res.send("User Registered Succesfully")
      }
      else{
        res.send("Otp does not match");
      }
    }
  })

  
  
 })

 
 //Admin Add Voters

app.get("/getVoters",function(req,resp){

   voterReg.find()
   .then(voters=>resp.json(voters))
    
    .catch(err=>resp.json(err))
   })


//OTP Generation
 
app.post('/otpGeneration',function(req,res){
  const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  res.json(otp);  
  const {username}=req.body
  
  
  
  
  //mail sending logic
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "votterportal@gmail.com",
      pass: "azbrptwszwklongr",
    },
  });
const mailOptions={
    from:"votterportal@gmail.com",
    to:username,
    subject:"OTP Verification",
    text:otp
}
transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err)
    }
});
 })






 app.listen(3000,function(){
    console.log("server started on port 3000");
 })