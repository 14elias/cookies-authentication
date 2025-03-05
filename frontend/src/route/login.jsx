import { useState } from "react"
import { login } from "../api/endpoint"
import { UseAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
const Login=()=>{
    const nav=useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const {login_user}=UseAuth()
    const handlelogin=async()=>{
        login_user(username,password)
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