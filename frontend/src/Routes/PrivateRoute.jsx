import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
    const user = useSelector(state => state.user.user);
    return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
}

export default PrivateRoute;