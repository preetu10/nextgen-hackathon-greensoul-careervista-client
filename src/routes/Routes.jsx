import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import About from "../pages/About";
import Error from "../../Error";
import Profile from "../pages/Profile/profile";
import UpdateProfile from "../pages/Profile/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<Error></Error>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        
        path: "/about",
        element: <About></About>,
      },
      {
        path:"/user-profile",
        element:<Profile></Profile>
      },
      {
        path:"/update-profile",
        element:<UpdateProfile></UpdateProfile>
      }
    ],
  },
]);
