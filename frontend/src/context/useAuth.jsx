import { createContext,useContext,useState,useEffect } from "react";
import { authenticated, login } from "../api/endpoint";
import { useLocation, useNavigate } from "react-router-dom";
const authcontext=createContext('')

export const AuthProvider=({children})=>{
    const [isauthenticated,setIsAuthenticated]=useState(false)
    const [loading,setLoading]=useState(true)
    const location=useLocation()
    const nav=useNavigate()
    const fetchdata=async()=>{
        try{
            const success = await authenticated() 
            setIsAuthenticated(success)
        }catch(error){
            setIsAuthenticated(false)
        }finally{
            setLoading(false)
        }
    }

    const login_user=async(username,password)=>{
        const success=await login(username,password)
        if(success){
            setIsAuthenticated(true)
            nav('/')
        }
    }

    useEffect(()=>{
        fetchdata()
    },[location.pathname])

    return(
        <authcontext.Provider value={{isauthenticated,loading,login_user}}>
            {children}
        </authcontext.Provider>
    )
}

export const UseAuth=()=>{
    return useContext(authcontext)
}