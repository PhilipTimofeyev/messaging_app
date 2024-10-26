import { Navigate, Outlet } from "react-router-dom";
import { useRef } from 'react'

const PrivateRoute = ({ isAuthenticated, children }) => {
    return true ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;