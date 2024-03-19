import React, { useEffect } from 'react'
import axios from'axios';
import { useState } from 'react';
import Web3 from 'web3';
import Voting from '../components/Voting.json'

const AddVoters = () => {
    const [voters,setvoters]=useState([]);
    const[state,setState]=useState({web3:null,contract:null});
    const [accounts,setAccounsts]=useState();
    useEffect(()=>{
   
    
    //contract instance
    
    const web3 = new Web3(window.ethereum)
    async function template(){
      const network_id = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[network_id];
      
  
      //Instance of our Smart Contract
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
},[])

    async function SendVoters(){
      const {contract}=state;
     
      
    
      contract.methods.voterRegisteration("0x6dcdE89fD4265a88fe408D68B7626aa1e2D6038b").send({from:accounts[0],gas: '1000000'});

      

    }
  
   


  return (
    <div>
      <h1>Hello</h1>
      { 
       <button onClick={SendVoters}>Add voter</button> 
       
       }
      
       
    </div>
  )
}

export default AddVoters
