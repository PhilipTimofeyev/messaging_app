import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children }) => {
    const storedToken = localStorage.getItem('token')

    if (isAuthenticated || storedToken) return children
    
    return <Navigate to="/signin" />;
}

export default PrivateRoute;