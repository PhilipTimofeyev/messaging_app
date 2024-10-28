import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from "axios";

const PrivateRoute = ({ setUserAuth, children }) => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('accessToken')
    
    const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + accessToken
        }
    });
    
    useEffect(() => {
        axiosInstance.get('/users/tokens/info')
        .then (response => setUserAuth(response.data))
        .catch(error => {
            navigate("/signin")
        })
    }, [])

    return children
}


export default PrivateRoute;