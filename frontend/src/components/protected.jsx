import { authenticated } from "../api/endpoint";
import { useState, useEffect } from "react";

const Protected = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const response = await authenticated();
                setAuth(response.authenticated);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setAuth(false);
            }
        };
        fetchAuth();
    }, []);

    return (
        <div>
            {auth ? children : <p>Credential required</p>}
        </div>
    );
};

export default Protected;
