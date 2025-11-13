
import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../FirebaseProvider/FirebaseProvider';

const PrivateRoutes = ({children}) => {
const {user,loading} =useContext(AuthContext);
const location=useLocation();

if(user){
    return children;
}
if(loading){
    return (
    <div className='text-center'>
    <span className="loading loading-spinner loading-lg"></span>
    </div>
    )
}
    return <Navigate state={{from:location}} to="/login" replace></Navigate>
};

export default PrivateRoutes;