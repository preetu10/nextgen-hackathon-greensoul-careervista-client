import { NavLink } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: userPro = {} } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });
  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );
  // console.log(userPro?.role);

  return (
    <div className="md:min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col items-start justify-left">
          <label
            htmlFor="my-drawer-2"
            className="btn m-4 drawer-button lg:hidden text-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul
            className="menu py-8 px-6 w-80 min-h-screen text-base-content"
            style={{ backgroundColor: "#f6f5f5" }}
          >
            {/* common links */}
            <li>
              <NavLink
                to="/"
                className="text-base"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "semibold" : "",
                    color: isActive ? "white" : "#048998",
                    backgroundColor: isActive ? "#048998" : "",
                  };
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-base"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "semibold" : "",
                    color: isActive ? "white" : "#048998",
                    backgroundColor: isActive ? "#048998" : "",
                  };
                }}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-resources"
                className="text-base"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "semibold" : "",
                    color: isActive ? "white" : "#048998",
                    backgroundColor: isActive ? "#048998" : "",
                  };
                }}
              >
                Learning Resources
              </NavLink>
            </li>
            <hr className="my-4 border-2 bg-[#3bb4c1] " />
            {/* for user role */}
            {userPro?.role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/v1/viewjobs"
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/v1/jobs/recommend/${userPro?._id}`}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Find Suitable Job
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/v1/suitable-resources"
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Find Relevant Resource
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/v1/get-career-roadmap"
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Get Career Roadmap
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/v1/cv-analysis"
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    CV / Resume Analysis
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/v1/cv-assistant"
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    CV Assistant
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/v1/careerbot"
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Chat with Careerbot
                  </NavLink>
                </li>
              </>
            )}

            {/* for admin role */}
            {userPro?.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={"/admin/adminviewresources"}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Manage Learning Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/admin/adminview"}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Manage Job Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/admin/addjob"}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    Add Job Post
                  </NavLink>
                </li>
                
              </>
            )}
             <hr className="my-4 border-2 bg-[#3bb4c1] " />
                  <li>
                  <NavLink
                    to={"/v1/user-profile"}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    My Profile
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to={userPro?.role==="user"?"/v1/dashboard":"/admin/dashboard"}
                    className="text-base"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "semibold" : "",
                        color: isActive ? "white" : "#048998",
                        backgroundColor: isActive ? "#048998" : "",
                      };
                    }}
                  >
                    My Dashboard
                  </NavLink>
                </li>
                 
          </ul>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Sidebar;
