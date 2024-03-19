import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Home.css'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../assets/logo.png'
import sideimg from '../assets/sideimg.jpg'
import Typewriter from 'typewriter-effect';



const Home = () => {


  return (
    <div className="maindiv">

      <img src={logo} className='logo'></img>
      <Link to="/adminLogin" ><Button className='adminbutton' size='lg' >Admin </Button></Link>
      <div className='seconddiv'>
      
        <img className='sideimg' src={sideimg}></img>

        <div className='writer'>
        <Typewriter 
          options={{
            strings: ['Block-Elect'],
            autoStart: true,
            loop: true,
            wrapperClassName:'Temp ',         
          }}
         />
        <div className='tag'><p className='tag'>The Future of Voting.</p>
         <Link to="/registration" ><Button className='user-button' >Get Started </Button></Link>
         <p className='revo'>Click on "Get Started" and become the part of Revolution.</p>
        </div>
        </div>
       
   
      </div>
    </div>


  )
}

export default Home


// style="color:red; font-family:serif"