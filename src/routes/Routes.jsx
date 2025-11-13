import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Profile from "../pages/Profile/profile";
import Error from "../../Error";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import Protected from "../layouts/Protected";
import PrivateRoutes from "./PrivateRoute";
import ViewJobs from "../pages/ViewJobs";
import { Home } from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import AllResources from "../pages/LearningResources/AllResources";
import ResourceRecommendations from "../pages/LearningResources/ResourceRecommendations";
import JobRecommend from "../pages/JobRecommend";
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
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-resources",
        element: <AllResources></AllResources>,
      },

      {
        path: "/addjob",
        element: <AddJob></AddJob>,
      },
       {
  path: "/jobs/recommend/:id",  
  element: <JobRecommend></JobRecommend>,
}
     
    ],
  },
  {
    path: "v1",
    element: (
      <PrivateRoutes>
        <Protected></Protected>
      </PrivateRoutes>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "user-profile",
        element: <Profile></Profile>,
      },
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "viewjobs",
        element: <ViewJobs></ViewJobs>,
      },
      {
        path: "viewjobdetails/:id",
        element: <JobDetails></JobDetails>,
      },
      {
        path: "suitable-resources",
        element: <ResourceRecommendations></ResourceRecommendations>,
      },
      {
        path: "jobs/recommend/:id",
        element: <JobRecommend></JobRecommend>,
      },
    ],
  },
]);
