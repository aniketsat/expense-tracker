import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;