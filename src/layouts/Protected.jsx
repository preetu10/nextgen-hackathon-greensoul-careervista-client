import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "../index.css"
import ProtectedNavbar from "../components/ProtectedNavbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
const Protected = () => {
    return (
        <>
    {/* <div className='bg-[#f6f5f5]'>
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="">
          <NavBar />
        </div>
        <div className=" mx-auto container min-h-[calc(100vh-246px)]">
          <Outlet />
        </div>

      </div>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div> */}
    <div className='bg-[#f6f5f5] min-h-screen'>
         <div className="max-w-7xl mx-auto">
          <ProtectedNavbar></ProtectedNavbar>
        </div>
    
     <div className="flex flex-col md:flex-row  ">
            <div className="w-1/5 md:pl-6 ">
            <Sidebar></Sidebar>
            </div>
            <div className="flex-1 md:w-3/5 px-4 md:pl-16">
                <Outlet></Outlet>
            </div>   
        </div>
        </div>
        <Footer></Footer>
 
        </>
    );
};

export default Protected;