import axios from "axios"
const BASE_URL='http://127.0.0.1:8000/'

export const login=async(username,password)=>{
    try{
        const response= await axios.post(`${BASE_URL}api/token/`,{username,password},
            {withCredentials:true,}
        )
        return response.data.success
    }catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error;
    }
}
export const logout=async()=>{
    try{
        const response=await axios.post(`${BASE_URL}api/logout`,{}, {withCredentials:true,})
        return response.data.success
    }catch (error) {
        console.error("Logout failed:", error.response ? error.response.data : error.message);
    }
    
}

export const register=async(username,password,email)=>{
    try{
        const response= await axios.post(`${BASE_URL}api/register/`,{username,password,email})
        return response.data
    }catch (error) {
        console.error("registration failed:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const authenticated = async () => {
    try {
        const response = await axios.get(`${BASE_URL}api/authenticated/`, { withCredentials: true });
        return response.data.Authenticated;  
    } catch (error) {
        console.error("Authentication check failed:", error.response ? error.response.data : error.message);
        return false; 
    }
};
