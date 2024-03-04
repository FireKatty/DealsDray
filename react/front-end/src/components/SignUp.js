import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";



const SignUp = ()=>{
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    useEffect(()=>{
        if (auth){
            navigate("/")
        }
    })
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
   
    
    const datacollect = async () => {
        try {
            console.log(name, email, password);
            let result = await fetch("http://localhost:3000/signup", {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" }
            });
            result = await result.json();
            console.log(result);
            localStorage.setItem("user",JSON.stringify(result.result));
        
            navigate("/");

           

        } catch (error) {
            console.error('Fetch error:', error);
        }
        
    }
    
    
    return(
        <div className="SignUp">
            <h1>Register</h1>
        
            <input className="inputbox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
        
    
            <input className="inputbox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        
    
            <input className="inputbox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
            <button className="submitbutton" onClick={datacollect} type="button">SignUp</button>
        </div>
    )
}
export default SignUp;