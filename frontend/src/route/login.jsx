import { useState } from "react"
import { login } from "../api/endpoint"
import { useNavigate } from "react-router-dom"
const Login=()=>{
    const nav=useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const handlelogin=async()=>{
        try{
            const response= await login(username,password)
            if (response.success===true){ nav('/')}
            else{alert('login failed')}
        }catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
    return(
    <div>
        <h1>Login</h1>
        <input value={username} type="text" onChange={(e)=>setUsername(e.target.value)}/> <br/><br/>
        <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
        <button onClick={handlelogin}>login</button>
    </div>
    )
}

export default Login