import React from 'react'
import axios from'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react' 
import '../CSS/adminlogin.css'
import { motion } from 'framer-motion';

import adminbg from '../assets/adminlogin.png'

const AdminLogin = () => {
  


    const [username, setUsername] = useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate()
   
    const handleSubmit = function(e){
      e.preventDefault()

      axios.post("http://localhost:3000/adminlogin",{username,password})
      .then(function(response){
        if(response.data === "invalid"){
            alert("invalid credentials");
        }
        else{
            navigate('/AdminDashboard');
        }
      }
      )
    }


    return (
    <div className='admindiv'>
        <img className='adminimg' src={adminbg}></img>
        
        <div className='adminformdiv'>
        
          <form onSubmit={handleSubmit} >
          <input 
          type='text' 
          name='user' 
          placeholder='username'
          onChange={function(e){
            setUsername(e.target.value)
          }}
          /><br></br>
          <input type='text' name='pass' placeholder='password'
          onChange={function(e){
            setPassword(e.target.value)
          }}/><br></br>
          <motion.button 
          type='submit'
          whileHover={{
              scale: 1.2,
              transition: { duration: 0.5 },
             }}
          >
          submit
          </motion.button>
        </form>
      </div>


    </div>
  )
}

export default AdminLogin
