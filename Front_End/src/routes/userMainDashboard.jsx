import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/UserMainDash.css'
import Web3 from 'web3'
import Voting from '../components/Voting.json'
import {  motion } from 'framer-motion'
import { Button,  } from 'react-bootstrap';



//images import
import tutorial from "../assets/tutorial.png"
import votingarea from "../assets/votingarea.png"
import results from "../assets/results.png"
import user from '../assets/user.png';



// import bg from '../assets/bg.jpg'


const Variants={
  hidden:{
    opacity:0,
    x:-150,
    y:-150
  },
  visible:{
    opacity:1,
    x:50,
    y:50
  }
}

const UserMainDashboard = () => {
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

  sessionStorage.setItem("account_addr",accounts);

  

  return (
    <div className='userMain'>
    
    
    <p className='welcome-user'><img src={user} className='user-logo'></img>Welcome {sessionStorage.getItem("username")}</p>
      <div className='user-container'>
    
            {/* <motion.div className='tutorial'
              variants={Variants}
              initial="hidden"
              animate="visible"
              transition={{ duration:0.3 ,delay:0.5}}>
              <img src={tutorial} className='image'></img>
            <Button className='smallmid'>Tutorial</Button> 
            </motion.div> */}

            <motion.div className='tutorial'
              variants={Variants}
              initial="hidden"
              animate="visible"
              transition={{ duration:0.5 ,delay:0.2}}>
               <img src={tutorial} className='image'></img>
            <Link to="/VotersRegistration"><Button className='bigmid'>Voters Registration</Button></Link>
            </motion.div>

            <motion.div className='tutorial'
              variants={Variants}
              initial="hidden"
              animate="visible"
              transition={{ duration:0.5,   delay:0.8}}>    
              <img src={votingarea} className='image'></img>          
            <Link to="/MainVoting"><Button className='smallmid'>Voting Area</Button></Link>
            </motion.div>

            <motion.div className='tutorial'
            variants={Variants}
            initial="hidden"
            animate="visible"
            transition={{ duration:0.5,   delay:1.2}}>
            <img src={results} className='image'></img>
            <Link to={"/Result"}><Button className='smallmid'>Result</Button></Link>
            </motion.div>
          </div>   
    </div>
  )
}
export default UserMainDashboard  






