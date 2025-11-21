import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../components/ScrollToTop";
const MainLayout = () => {
  return (
    <div className='bg-[#f6f5f5]'>
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
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default MainLayout;
