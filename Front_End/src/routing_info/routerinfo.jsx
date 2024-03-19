import React from 'react'
import Home from "../routes/Home"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Registration from '../routes/Registration';
import UserLogin from '../routes/Userlogin'
import UserMainDashboard from '../routes/userMainDashboard';
import AdminLogin from '../routes/AdminLogin';
import AdminDashboard from '../routes/AdminDashboard';
import AddCandidates from '../routes/addCandidates';
import VotersRegistration from '../routes/VotersRegistration';
import AddVoters from '../routes/AddVoters';
import MainVoting from '../routes/MainVoting';
import Result from '../routes/Result';


const Routerinfo = () => {
    return (
        <Router>
        <Routes>
        <Route exact path='/' element={<Home></Home>} />
        <Route path='/registration' element={<Registration></Registration>} />
        <Route path='/userlogin' element={<UserLogin></UserLogin>} />
        <Route path='/userMainDashboard' element={<UserMainDashboard></UserMainDashboard>} />
        <Route path='/adminLogin' element={<AdminLogin></AdminLogin>} />
        <Route path='/adminDashboard' element={<AdminDashboard></AdminDashboard>} />
        <Route path='/AddCandidates' element={<AddCandidates></AddCandidates>}/>
        <Route path="/VotersRegistration" element={<VotersRegistration></VotersRegistration>}/>
        <Route path="/AddVoters" element={<AddVoters></AddVoters>}/>
        <Route path="/MainVoting" element={<MainVoting  ></MainVoting>}/>
        <Route path='/Result' element={<Result></Result>}/>
        </Routes>
        </Router>
  )
}

export default Routerinfo
