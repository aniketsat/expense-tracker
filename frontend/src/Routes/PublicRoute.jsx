import {Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute() {
    const user = useSelector(state => state.user.user);
    return user ? <Navigate to='/' replace={true} /> : <Outlet />;
}

export default PublicRoute;