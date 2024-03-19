const mongoose = require('mongoose');


const RegistrationSchema = new mongoose.Schema({
    username:String,
    password:String
});


const AdminLoginSchema = new mongoose.Schema({
    username:String,
    password:String
});

const VoterRegistrationSchema = new mongoose.Schema({
    username:String,
    acc_address:String,
    aadhar_no:String
});




const register = mongoose.model("users",RegistrationSchema)

const adminLogin = mongoose.model("admin",AdminLoginSchema)

const voterReg =mongoose.model("voterAddresses",VoterRegistrationSchema)

module.exports = {register,adminLogin,voterReg}