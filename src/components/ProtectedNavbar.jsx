import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";

const NavBar = () => {
  const { logOut, user } = useContext(AuthContext);

  return (
   
    <div className="navbar bg-[#f6f5f5] ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
         
        </div>
       <div className="flex items-center justify-center">
         <img
          src={logo}
          alt="Logo"
          className="w-12 h-12  lg:w-20 lg:h-20"
        />
        <a href="/" className="font-bold text-xl md:text-xl lg:text-2xl"><span className='text-[#048998]'>Career</span><span className='text-[#3bb4c1]'>Vista</span></a>
       </div>
      </div>
      <div className="navbar-center hidden lg:flex">
      
      </div>
      {user ? (
        <div className="navbar-end">
            <div className="dropdown dropdown-end z-50">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div title={user?.displayName} className="w-12 rounded-full">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile"
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/dashboard" className="hover:text-[#048998]">Dashboard</Link>
            </li>
             <li>
              <Link to="/v1/user-profile" className="mt-2 hover:text-[#048998]">My Profile</Link>
            </li>
            <li className="mt-2">
              <button
                onClick={logOut}
                className="bg-[#f6f5f5] hover:text-[#048998] w-full text-black"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        </div>
      ) : (
        <div className="navbar-end ">
          <a
            href="/login"
            className="btn mr-1 bg-[#f6f5f5] text-[#048998] font-semibold text-lg border-0 rounded-md"
          >
            Log In
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
