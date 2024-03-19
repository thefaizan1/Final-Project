import React from 'react'
import { useEffect, useState } from 'react' 
import axios from'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Form.css'



const Form = () => {
    
    const [username, setUsername] = useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate()
   
    const handleSubmit = function(e){
      e.preventDefault()

      axios.post("http://localhost:3000/register",{username,password})
      .then(function(response){
        if(response.data === "User Already Existed"){
          alert("User Already Exist");
          console.log(response)
        }
        else{ 
        alert("Thank you for Registering,Please Log in ");
        }
      }
      )
      .catch(function(err)
      { 
        alert(err.message);
      });  
  }
  
  return (
    
     <div className="form-container sign-up">
            <form onSubmit={handleSubmit} >
              <input 
              type='email' 
              name='password' 
              placeholder='email'
              onChange={function(e){
                setUsername(e.target.value)
              }}
              /><br></br>
              <input type='password' name='pass' placeholder='password'
              onChange={function(e){
                setPassword(e.target.value)
              }}/><br></br>
              <button type='submit'>submit</button>
            </form>
      </div>
    
  )
}

export default Form
