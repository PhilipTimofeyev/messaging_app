import { Navigate, Outlet } from "react-router-dom";
import { useRef } from 'react'

const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;