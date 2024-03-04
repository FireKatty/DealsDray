import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    const auth = localStorage.getItem('user')
    useEffect(()=>{
        if(auth){
            navigate("/")
        }
    })
    const login=async()=>{
        console.log(email,password)
        let result = await fetch('http://localhost:3000/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{'content-Type':"application/json"}
        })
        result = await result.json()
        console.warn(result)
        // localStorage.setItem('user',JSON.stringify(result.user));
        navigate("/")
        // if (result.auth){
        //     localStorage.setItem('user',JSON.stringify(result.user));
        //     localStorage.setItem('token',JSON.stringify(result.auth))
        //     navigate("/")
        // }else{
        //     alert('Please Enter correct Details')
        // }

    }
    return(
        <div className="login">
        <input className="inputbox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        <input className="inputbox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
        <button className="submitbutton" onClick={login}  type="button">Login</button>
        </div>
        
    )
}
export default Login;