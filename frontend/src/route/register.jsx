import { useState } from "react"
import { register } from "../api/endpoint"
import { useNavigate } from "react-router-dom"
const Register=()=>{

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const nav=useNavigate()
    const handleregister=async()=>{
        try{
            const response= await register(username,password,email)
            if (response.success===true){ nav('/login')}
            else{alert('registration failed')}
        }catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert('Registration failed: ' + (error.response?.data?.error || error.message));
        }
    }

        return(
            <>
                <div>
                    <h1>Register</h1>
                </div>
                <div>
                    <input type="text" value={username} placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                </div> <br/>
                <div>
                    <input type="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div><br/>
                <div>
                    <input type="email" value={email} placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div><br/>
                <button onClick={handleregister}>register</button>
            </>
        
    )
}

export default Register