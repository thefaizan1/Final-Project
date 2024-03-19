import user from '../assets/user.png';
import { Link } from 'react-router-dom'

const Navcomp = () => {
  return (
    <div className='navbar'>
     <p><img src={user} className='user-logo'></img>{sessionStorage.getItem("username")}</p> 
     </div>
  )
}

export default Navcomp
