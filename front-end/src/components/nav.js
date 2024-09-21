
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user'); // Assume 'user' has the user's data as JSON
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };


    const user = auth ? JSON.parse(auth) : null;
    // console.log(user.result.fullName)

    return (
        <div>
            {auth ? (
                <ul className='nav-ul'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add">Employee List</Link></li>
                    <div className="nav-right">
                        <li>{user?.result.fullName}<span>-</span></li> 
                        <li ><Link onClick={logout} to="/signup">Logout   </Link></li>
                    </div>
                </ul>
            ) : (
                <ul className='nav-ul'>
                    <div className='nav-right'>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    </div>
                </ul>
            )}
        </div>
    );
};

export default Nav;