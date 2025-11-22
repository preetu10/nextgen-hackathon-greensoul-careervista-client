import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
   baseURL:'https://nextgen-hackathon-greensoul-careerv.vercel.app'
});

const useAxiosSecure = () => {
  const navigate = useNavigate();


  axiosSecure.interceptors.request.use(function(config) {

    const token = localStorage.getItem('access-token');

   // console.log(user,token);
   // console.log("inside axiosSecure",token);

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }


    return config;
  }, function(error) {
    return Promise.reject(error);
  });

  // Interceptors for 401 and 403
  axiosSecure.interceptors.response.use(function(response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
   // console.log("Response error:", error, status);
    if (status === 401 || status === 403) {
      // await logout();
       navigate("/");
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;