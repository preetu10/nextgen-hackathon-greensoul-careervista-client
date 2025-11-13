import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Profile from "../pages/Profile/profile";
import Error from "../../Error";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import Protected from "../layouts/Protected"
import PrivateRoutes from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error></Error>,
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
        path: "/register",
        element: <Register />,
      },
     
    ],
  },{
     path: "v1",
    element: <PrivateRoutes><Protected></Protected></PrivateRoutes>,
    errorElement: <Error></Error>,
    children: [
 {
        path:"user-profile",
        element:<Profile></Profile>
      },{
        path:"update-profile",
        element:<UpdateProfile></UpdateProfile>
      }
    ]
  }
]);
