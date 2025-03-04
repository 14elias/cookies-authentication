import { logout } from "../api/endpoint"
import { useNavigate } from "react-router-dom"
const Logout =()=>{
    const nav=useNavigate()

    const handlelogout=async()=>{
        try{
            const response= await logout()
            console.log(response)
            if (response.success===true) nav('/login')
            else{return('logout failed')}
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