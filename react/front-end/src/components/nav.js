import React from 'react'
import {Link,useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.clear();
        navigate('/signup');
    }

    return(
        <div>

                        
            {
                <ul className='nav-ul'><>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Employee List</Link></li>
                <li className='nav-right'><Link onClick={logout} to="/signup">Logout </Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
                </></ul>
            }
            
          
        </div>
    ) 
}
export default Nav;