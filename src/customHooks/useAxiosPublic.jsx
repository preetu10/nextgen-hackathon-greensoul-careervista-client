import axios from "axios";


const axiosPublic=axios.create({
    baseURL:'https://nextgen-hackathon-greensoul-careerv.vercel.app'
})

const useAxiosPublic = () => {
       return axiosPublic;
};

export default useAxiosPublic;