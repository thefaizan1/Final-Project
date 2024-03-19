import React, { useEffect, useState } from 'react'
import Web3, { TransactionMissingReceiptOrBlockHashError } from 'web3'
import Voting from '../components/Voting.json'
import '../CSS/AddCandidates.css'


const AddCandidates = () => {


  const[state,setState]=useState({web3:null,contract:null});
  const [accounts,setAccounsts]=useState();  
  const [checked,setchecked]=useState(false);
  // const [temp,settemp]=useState();
  const array = [];
  const[myarr,setmyarr]=useState()
  const[timepass,settimepass]=useState(false)
  const[show,setshow]=useState("Show Added Candidate ")
 
  useEffect(()=>{
    
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
  },[]);
  

    async function Contestant_Registration(e){
      const {contract}=state;
       e.preventDefault()
      const name = String(e.target.name.value)
      const party =String(e.target.party.value)
      const age = String(e.target.age.value)
      const qualification=String(e.target.qualification.value)
      contract.methods.addContestant(name,party,age,qualification).send({from:accounts[0],gas: '1000000'});
    }
    async function handletoggle(e){
      const {contract}=state;
      setchecked(!checked)
      if(checked==false){
         const contestant_count= await contract.methods.contestantsCount().call()
        console.log(contestant_count);
        for(var i=1;i<=contestant_count;i++){
          array.push(await contract.methods.contestants(i).call())
          setmyarr(array)
          
        }
        settimepass(true)
        setshow("Hide Added Candidates")
      }
      else{
        // settemp("");
        settimepass(false)
        setshow("Show Added Candidates")

      }
      
    }
  
    
  return (
    
    <div className='AddCandidates'>
    
      <div className='addCandidatesform'>
        <form onSubmit={Contestant_Registration}>
        <h1>Enter candidate details</h1>
          <div className="form-row">
            <div className="input-data">
               <input name='name' type="text" required/>
               <div className="underline"></div>
               <label >Name</label>
            </div>
            <div className="input-data">
               <input type="text" name='party' required/>
               <div className="underline"></div>
               <label >Party Name</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="number" name='age' required/>
               <div className="underline"></div>
               <label >Age</label>
            </div>
            <div className="input-data">
               <input type="text" name='qualification' required/>
               <div className="underline"></div>
               <label >Qualification</label>
            </div>
         </div>
         <button type='submit' className='submit-btn'>Submit</button>
         
        </form>
        </div>
        <div className='showcand'>
        <span><p>{show}</p></span>
        <label className="switch">
         <input type="checkbox" checked={checked} onChange={handletoggle}/>
          <span className="slider round"></span>
        </label>
        </div>
      <p></p>
    
      <br></br>
      {timepass &&
        <div  className='ctable-container'>
        <table className='ctable'>
        <thead>
        <tr>
          <th >Name</th>
          <th>Party</th>
          <th>Age</th>
          <th  className='cHeadings'>Qualification</th>
          </tr>
        </thead>
        <tbody>
          { myarr.map(item=>
          <tr key={item.id}>
            
            <td>{item.name}</td>
            <td>{item.party}</td>
            <td>{item.age}</td>
            <td>{item.qualification}</td>

           
           </tr>
           )
              
          }
        </tbody>
      </table> 
      </div>
      }
      

    </div>
  )
  }
export default AddCandidates


