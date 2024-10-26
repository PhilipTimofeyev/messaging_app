import { Navigate, Outlet } from "react-router-dom";
import { useRef } from 'react'

const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;