import { Navigate, Outlet } from "react-router-dom";
import { useRef } from 'react'

const PrivateRoute = ({ isAuthenticated }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;