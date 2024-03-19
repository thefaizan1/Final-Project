import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import Voting from '../components/Voting.json'
import '../CSS/Result.css'
import candidate from '../assets/candidates.png'

const Result = () => {
  const [result, setresult] = useState([]);
  const [state, setState] = useState({ web3: null, contract: null });
  const [accounts, setAccounsts] = useState();
  const [strings, setString] = useState([]);
  const arr = [];
  const [temp, settemp] = useState(null);
  const [highestVoteCount, setHighestVoteCount] = useState(0);
  const [nameWithHighestVotes, setNameWithHighestVotes] = useState('');
  var highestVote = 0;
  var name = "";

  useEffect(() => {


    const web3 = new Web3(window.ethereum)
    async function template() {
      const network_id = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[network_id];


      //Instance of our Smart Contract
      const contract = new web3.eth.Contract(Voting.abi, deployedNetwork.address);
      setState({ web3: web3, contract: contract });

      const temp = await window.ethereum.request({ method: "eth_requestAccounts" }).
        then(res => {
          setAccounsts(res)
        }
        )
        .catch(err => {
          console.log(err);
        })
      return state;
    }
    template();
  }, []);

  useEffect(() => {
    const { contract } = state;
    async function fetchData() {
      var i;

      const data = await contract.methods.contestantsCount().call();
      const state = await contract.methods.state().call();
      settemp(state)

      for (i = 1; i <= data; i++) {
        arr.push(await contract.methods.contestants(i).call());
      }
      const stringArray = arr.map(obj => ({
        ...obj,
        voteCount: String(obj.voteCount)
      }));

      setresult(stringArray);
    }
    contract && fetchData();
  }, [state]);

  // console.log(result)
  console.log(temp)


  return (
    <div>
      <h1>hii</h1>
      {
        temp == 1 ?
          <h1>Result will be Displayed Once Election is over</h1>
          : result.map(i =>
            <div className='main_inner_div' key={i.id}>
              <img style={{ float: 'left' }} src={candidate} className='candimg'></img>
              <p className='cand_info'>Name :{i.name}</p>
              <p className='cand_info'>Party Name:{i.party}</p>
              <p className='cand_info'>Vote Count :{i.voteCount}</p>
            </div>


          )
      }
      {
      
        result.map(i=>{

          if(i.voteCount>highestVote){
            highestVote=i.voteCount
            name=i.party
          }

        })
      }
    </div>
  )
}

export default Result
