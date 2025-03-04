import axios from "axios"
const BASE_URL='http://127.0.0.1:8000/'

export const login=async(username,password)=>{
    try{
        const response= await axios.post(`${BASE_URL}api/token/`,{username,password},
            {withCredentials:true,}
        )
        return response.data
    }catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error;
    }
}
export const logout=async()=>{
    try{
        const response= await axios.post(`${BASE_URL}api/logout/`,{}, {withCredentials:true,})
        return response.data
    }catch (error) {
        console.error("Logout failed:", error.response ? error.response.data : error.message);
        throw error;
    }
    
}