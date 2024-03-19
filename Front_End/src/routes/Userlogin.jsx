import React from 'react'
import { useEffect, useState } from 'react' 
import axios from'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Form.css'
import { ToastContainer,toast } from 'react-toastify';
const UserLogin = () => {
  
    const [username, setUsername] = useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate()
   
    const handleSubmit = function(e){
      e.preventDefault()

      axios.post("http://localhost:3000/userlogin",{username,password})
      .then(function(response){
        
        console.log(response.data)
          if(response.data==username){
              sessionStorage.setItem("username",response.data);
              console.log(sessionStorage);
              navigate('/userMainDashboard')
            }
          else{
              toast(response.data)
            }

      }
      )
      .catch(function(err)
      { 
        alert(err.message);
      });

    }

  
  
return (
    <div className='form-container sign-in'>
    
      <form onSubmit={handleSubmit} >
        <input 
        type='text' 
        name='user' 
        placeholder='username'
        onChange={function(e){
          setUsername(e.target.value)
        }}
         />
        <input type='text' name='pass' placeholder='password'
        onChange={function(e){
          setPassword(e.target.value)
        }}/>
        <button type='submit'>submit</button>
      </form>
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

     
    </div>
  )
}

export default UserLogin
