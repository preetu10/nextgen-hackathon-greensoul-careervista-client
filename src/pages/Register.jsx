import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../customHooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPublic = useAxiosPublic();
  const careerOptions = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Artificial Intelligence / Machine Learning",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Software Engineering",
    "Cybersecurity",
    "Cloud Computing",
    "Business Analysis",
    "DevOps / System Administration",
    "Finance & Accounting",
    "Human Resources (HR)",
    "Education & Training",
  ];

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  const onSubmit = (data) => {
    setRegisterError("");
    setSuccess("");

    const { email, password, fullName, image } = data;
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegisterError("Please enter a valid email!");
      return;
    }
    // Password validation
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setRegisterError(
        "Password should have at least one uppercase and one lowercase letter."
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(fullName, image)
          .then(async () => {
            const userData = {
              fullName,
              email,
              image,
              careerTrack: data.careerTrack,
              contact:data.contact,
              educationalInstitute:data.educationalInstitute,
              address:data.address,
              education: data.education,
              department: data.department,
              experience: data.experience,
            };
            console.log("from register userdata: ", userData);
            axiosPublic.post("/api/user", userData).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                setSuccess("Registration successful!");
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "You have successfully registered.",
                }).then(() => {
                  navigate(from);
                });
              }
            });
          })
          .catch((err) => setRegisterError(err.message));
      })
      .catch((err) => {
        setRegisterError(err.message);
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: err.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen mb-4 ">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/Gfv3cPLV/office-6817959-1280.png')`,
          }}
        ></div> */}

        {/* Form */}
        <div className="w-full  px-10 py-12">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign up to start building your career roadmap
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                <div className="form-control">
                  <label className="label">Full Name</label>
                  <input
                    {...formRegister("fullName", { required: true })}
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="form-control relative">
                  <label className="label">Password</label>
                  <input
                    {...formRegister("password", { required: true })}
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full h-12 px-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      This field is required
                    </span>
                  )}
                  {registerError && (
                    <p className="text-red-500 text-sm mt-1">{registerError}</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Name of Educational Institute</label>
                  <input
                    {...formRegister("educationalInstitute", {
                      required: true,
                    })}
                    type="text"
                    placeholder="e.g. University of Chittagong"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.educationalInstitute && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Address</label>
                  <input
                    {...formRegister("address", { required: true })}
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.educationalInstitute && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Preferred Career Track</label>
                  <select
                    {...formRegister("careerTrack", { required: true })}
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  >
                    <option value="">Select your track</option>
                    {careerOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.careerTrack && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column  */}
              <div className="space-y-5">
                <div className="form-control">
                  <label className="label">Email</label>
                  <input
                    {...formRegister("email", { required: true })}
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">Education Level</label>
                  <input
                    {...formRegister("education", { required: true })}
                    type="text"
                    placeholder="e.g. BSc in Engineering, BBA"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.education && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Department / Major Subject</label>
                  <input
                    {...formRegister("department", { required: true })}
                    type="text"
                    placeholder="e.g. Computer Science and Engineering, Marketing"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.department && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Contact Number</label>
                  <input
                    {...formRegister("contact", { required: true })}
                    type="text"
                    placeholder="e.g. +8801*********"
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  />
                  {errors.contact && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Experience Level</label>
                  <select
                    {...formRegister("experience", { required: true })}
                    className="input input-bordered w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1b963]"
                  >
                    <option value="">Select experience level</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                  </select>
                  {errors.experience && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-[#048998] text-white w-full py-3 rounded-lg hover:bg-[#3bb4c1] transition">
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#048998] font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
