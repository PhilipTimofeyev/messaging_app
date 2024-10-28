import {  useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { checkAuth } from "../helpers/apiCalls.js";

const PrivateRoute = ({ setUserAuth, children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const callAPI = async () => {
            const response = await checkAuth();
            const statusCode = response.status
            if (statusCode >= 200 && statusCode < 300) {
                setUserAuth(response.data)
            } else {
                navigate("/signin", { error: response })
            }
        }
        callAPI()
            .catch(console.error);
    }, [])

    return children
}


export default PrivateRoute;