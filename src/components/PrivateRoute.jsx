import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;