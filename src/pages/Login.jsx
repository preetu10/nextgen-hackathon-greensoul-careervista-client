import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signinUser, signinWithGoogle, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state || "/";

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  const onSubmit = async (data) => {
    try {
      const result = await signinUser(data.email, data.password);
      if (result && result.user) {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid email or password",
          text: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please try again later.",
      });
      console.error("Login Error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signinWithGoogle();
      if (result.user) {
        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-16 font-Lato min-h-screen">
      <div className="flex w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/Gfv3cPLV/office-6817959-1280.png')`,
          }}
        ></div>

        <div className="w-full lg:w-1/2 px-8 py-12">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Log in to continue exploring
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-3 mb-6 border rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-2" />
            <span className="font-medium text-gray-600">
              Sign in with Google
            </span>
          </button>

          <div className="flex items-center justify-center my-6">
            <span className="w-1/5 border-b border-gray-300"></span>
            <span className="text-xs text-gray-400 mx-2 uppercase">
              or login with email
            </span>
            <span className="w-1/5 border-b border-gray-300"></span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#3bb4c1]  hover:bg-[#048998] text-white font-semibold transition"
            >
              Log In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              New here?{" "}
              <Link
                to="/register"
                className="text-[#048998] font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
