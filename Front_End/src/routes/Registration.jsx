import React, { useState } from 'react'
import Form from '../components/Form'
import { Link } from 'react-router-dom'
import '../CSS/Registration.css'
import '../CSS/Form.css'
import UserLogin from './Userlogin'

const Registration = () => {

  const[state,setstate]=useState('false');

 function handlebutton(e){
  if(e.target.id=='register')
  setstate('active');
  else if(e.target.id=='login'){
    setstate("")
  }
 }





  
  return (
    <div className='regi'>
        <div className={`container ${state}` } id="container">
              
              <Form></Form>
             
              {/* <Link to="/Userlogin" ><br/><button>Login</button></Link> */}
              <UserLogin></UserLogin>
              <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login" onClick={handlebutton}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome User</h1>
                    <p>Register with your personal details </p>
                    <button className="hidden" id="register" onClick={handlebutton}  >Sign Up</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
