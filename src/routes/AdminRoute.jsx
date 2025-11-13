import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../customHooks/useAdmin";
import useAuth from "../customHooks/useAuth";

const AdminRoute = ({children}) => {
    const {user,loading}=useAuth();
    const [isAdmin,isAdminLoading]=useAdmin();
    const location=useLocation();
    console.log(isAdmin);

    if(loading||isAdminLoading){
        return (
        <div className='text-center'>
        <span className="loading loading-spinner loading-lg"></span>
        </div>
        )
    }

    if(user && isAdmin) {
        return children;
    }
   
        return <Navigate state={{from:location}} to="/" replace></Navigate>
    
};

export default AdminRoute;