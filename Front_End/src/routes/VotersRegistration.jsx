import React, { useEffect, useState } from 'react'
import axios from'axios';
import '../CSS/VotersRegistration.css'
import Web3 from 'web3'
import Voting from '../components/Voting.json'
import voterreg from '../assets/voterregg.png'
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navcomp from '../components/navbar';


const VotersRegistration = () => {
  const [otp,setotp]=useState(false);
  const[sysotp,setsysotp]=useState();
  const[connect_acc,setconnect]=useState(false);
  const[state,setState]=useState({web3:null,contract:null});
  const [accounts,setAccounsts]=useState(); 

  useEffect(()=>{
    const web3 = new Web3(window.ethereum)
    async function template(){
      const network_id = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[network_id];
      
  
      //Instance of our Smart Contract
      const contract = new web3.eth.Contract(Voting.abi,deployedNetwork.address);
      setState({web3:web3,contract:contract});  
      
      // const temp=await window.ethereum.request({method : "eth_requestAccounts"}).
      //   then(res =>{
      //     setAccounsts(res)
      //   }
      //   )
      //   .catch(err =>{
      //     console.log(err);
      //   })    
      const selectedAccount = await window.ethereum.request({
        method: 'eth_requestAccounts'
    });
    setAccounsts(selectedAccount)
        return state;
    }
      template();
  },[]);


    const username=sessionStorage.getItem("username");
    function OtpGeneration(e){
      toast("otp is sent to registered email")
      axios.post("http://localhost:3000/otpgeneration",{username})
      .then(function(res){
        setsysotp(res.data)
        setotp(true);
        console.log(sysotp);
      })

    }

    const handleSubmit =  function(e){
        e.preventDefault()  
       const acc_address = sessionStorage.getItem("account_addr")
       const aadhar_no=e.target.aadhar_no.value
       const usrotp = e.target.otpfield.value
       const username = sessionStorage.getItem("username"); 
        axios.post("http://localhost:3000/voterRegistration",{username,usrotp,sysotp,acc_address,aadhar_no})
        .then(function(response){
          
          console.log(response)
          toast(response.data)
          if(response.data==="User Registered Succesfully"){
            vote_send();
          }
          
          
        
        
          }
        )
    }

    // console.log(sessionStorage.getItem("username"))
    // console.log(sessionStorage.getItem("account_addr"))
    
    async function vote_send(){
      const{contract}=state;
      await contract.methods.voterRegisteration(sessionStorage.getItem("account_addr")).send({from:accounts[0],gas:"1000000"})
    }
  

    return (
    <div className='Votersdiv'>
    <Navcomp></Navcomp>
          <div className='votermaindiv'>
         
            <img className='voterreg' src={voterreg}></img>
            <div className='formdiv'>
              <form onSubmit={handleSubmit}>
              <h1>Aadhar Registration</h1>
               
                <input type='number' name='aadhar_no' placeholder='Enter Aadhar Number' required ></input>
                <button className='otpbtn' onClick={OtpGeneration}>Send Otp</button><br/>
                  {otp && <input  name='otpfield' placeholder='Enter OTP'></input>}<br/>

            
                <motion.button 
                  type='submit'
                  className='finalsub'
                   whileHover={{
                       scale: 1.2,
                       transition: { duration: 0.5 },
                    }}
                    >submit</motion.button>
                    {
                      connect_acc && <button className='conn_acc' onClick={conn_acc}>Connect Account</button>
                    }

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition: Bounce
          />
       
              </form>
              </div>
          </div>
    </div>
  )
}

export default VotersRegistration
