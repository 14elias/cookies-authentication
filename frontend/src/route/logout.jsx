import { logout } from "../api/endpoint"
import { useNavigate } from "react-router-dom"
const Logout =()=>{
    const nav=useNavigate()

    const handlelogout=async()=>{
        try{
            const response= await logout()
             nav('/login')
        }catch (error) {
            console.error("Logout failed:", error.response ? error.response.data : error.message);
            throw error;
        }
        
    }
    return(
    <div>
        <button onClick={handlelogout}>Logout</button>
    </div>
)
}

export default Logout