import {  useNavigate, Outlet } from "react-router-dom";
import { useEffect } from 'react'
import { checkAuth } from "../helpers/apiCalls.js";

const PrivateRoute = ({ setUser,  user }) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        const authenticateUser = async () => {
            const response = await checkAuth();
            console.log("HERE Response------", response)
            console.log("HERE STATUS CODE------", response.status > 200)
            const statusCode = response.status
            if (statusCode >= 200 && statusCode < 300) {
                setUser(response.data)
            } else {
                console.log("success???")
                navigate("/signin", { error: response })
            }
        }
        if (!user) authenticateUser()
            .catch(console.error);
    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
}


export default PrivateRoute;