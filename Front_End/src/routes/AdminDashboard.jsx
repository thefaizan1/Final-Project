import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Voting from '../components/Voting.json'
import { Link } from 'react-router-dom'
import '../CSS/AdminDash.css'
import { motion } from 'framer-motion'
import candidates from '../assets/candidates.png'

import { Button } from 'react-bootstrap'

const Variants={
  hidden:{
    opacity:0,
    x:-150,
    y:-150
  },
  visible:{
    opacity:1,
    x:0,
    y:0
  }
}
function AdminDashboard(){

const[state,setState]=useState({web3:null,contract:null});
const [accounts,setAccounsts]=useState();
const[data,setData]=useState('null');

useEffect(()=>{
  
  const web3 = new Web3(window.ethereum)
  async function template(){
    const network_id = await web3.eth.net.getId();
    const deployedNetwork = Voting.networks[network_id];
    

    //Instance of  Smart Contract
    const contract = new web3.eth.Contract(Voting.abi,deployedNetwork.address);
    setState({web3:web3,contract:contract});  
    
    const temp=await window.ethereum.request({method : "eth_requestAccounts"}).
      then(res =>{
        setAccounsts(res)
      }
      )
      .catch(err =>{
        console.log(err);
      })    
      return state;
  }
    template();
},[]);


useEffect(()=>{
  const {contract}=state;
  
  async function readData(){
   const data = await contract.methods.state().call();
   const state = Number(data);
   if(state==0){
    setData("Registration Phase");
   }
   else if(state==1){
    setData("Voting Phase");
   }
   else{
    setData("Election is now Over");
   }

  }

  
  contract && readData();
},[state][data]);

  async function changeData(){
    const {contract}=state;
    await contract.methods.changeState(1).send({from:accounts[0]});
    window.location.reload();
    
    
  }
  async function EndElection(){
    const {contract}=state;
    await contract.methods.changeState(2).send({from:accounts[0]});
    window.location.reload();
  
    
  }
  
 


  return (
    <div className='AdminDashdiv'>
      <h1>Current State: {data}</h1>
      <Button variant='success' onClick={changeData}  style={{position:'relative',left:50}}>Change Data</Button>
      <Button variant='danger' className='endelection' onClick={EndElection} >End Election</Button>
      
      <div>
      <motion.div className='addcandidates'
         variants={Variants}
         initial="hidden"
         animate="visible"
         transition={{ duration:0.5 ,delay:0.5}}>
        <img className='candimg' src={candidates}></img>
      <Link to="/AddCandidates" ><Button className='addcandbutton'>Add Candidates for Election</Button></Link>
      </motion.div>

      {/* <motion.div className='addvoters'
      variants={Variants}
         initial="hidden"
         animate="visible"
         transition={{ duration:0.5 ,delay:1.0}}> 
      <img className='candimg' src={voters}></img>
      <Link to="/AddVoters" ><Button className='addvoterbutton'>Voters Section</Button></Link>
      </motion.div> */}
      </div>
      

      


    
    </div>
  )
}

export default AdminDashboard