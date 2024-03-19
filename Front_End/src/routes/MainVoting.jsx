import React ,{ useEffect, useState } from 'react'
import Web3 from 'web3'
import Voting from '../components/Voting.json'
import '../CSS/Mainvoting.css'
import candidate from '../assets/candidates.png'
import { delay, motion } from 'framer-motion'
import Navcomp from '../components/navbar'



const MainVoting = () => {
  
    const[state,setState]=useState({web3:null,contract:null});
    const [accounts,setAccounsts]=useState();  
    const[candidates,setcandidates]=useState([]);
    const arr=[];
    
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


    useEffect(()=>{  
        const {contract}=state;  
        async function fetchData(){
        var i;
        
        const data = await contract.methods.contestantsCount().call();
        console.log(data);
        for(i=1;i<=data;i++){
          arr.push(await contract.methods.contestants(i).call());
        }   
        // console.log(arr);
        setcandidates(arr);
      
    }
        contract&&fetchData();
    },[state]);


    
    async function Vote(e){
      const{contract}=state;
        console.log(e);
              await contract.methods.vote(e).send({from:accounts[0],gas:"1000000"})
 }

 async function isregistered(){
  const {contract}=state; 
     const temp= await contract.methods.voters(accounts[0]).call({from:accounts[0],gas: '10000000'});
      console.log(temp)
}

    return (
    <div className='Voter_root'>
    <Navcomp></Navcomp>
      { 
        candidates==0  ? 
        <div className='Blank'> <h1 className='Heading'>Voting Phase is not started yet.</h1>
        <h2>Meanwhile you can do the following things</h2>
        <ul>
          <li>Register yourself if you havent already in order to be eligible to vote</li>
          <li>If you are Registered already. Kindly wait for the Voting Phase</li>
        </ul>
          
         </div>  :
        candidates.map(elements=>
        <motion.div className='main_inner_div'
        whileHover={{ scale: [null, 1.0, 1.1] }}
        transition={{ duration: 0.1 }}>
        <img style={{float:'left'}} src={candidate} className='candimg'></img>
        <p className='cand_info'>Name : {elements.name}</p>
        <p className='cand_info'>Party Name : {elements.party}</p>
        <p className='cand_info'>Age : {elements.age}</p>
        <p className='cand_info'>Qualification : {elements.qualification}</p>
        
        <button className='Vote_btn' onClick={() => Vote(elements.id)}>Vote</button>
        
        </motion.div>
        )
      }
    </div>
  )
}

export default MainVoting