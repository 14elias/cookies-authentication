import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/useAuth";
import { useEffect } from "react";

const Protected = ({ children }) => {
    const {isauthenticated,loading} = UseAuth();
    const nav=useNavigate()

    if(loading){
        return <p>loading...</p>
    }
    if (isauthenticated){
        return children
    }
    else{
        nav('/login') 
    }
};

export default Protected;
