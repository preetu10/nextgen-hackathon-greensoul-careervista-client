import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<Error></Error>,
    children: [
     
         
        {

            path: '/login',
          element:<Login/>
          },
                  
        {

            path: '/register',
          element:<Register/>
          },
    ],
  },
]);
