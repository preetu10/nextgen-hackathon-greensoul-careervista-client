import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://nextgen-hackathon-greensoul-careerv.vercel.app/api/jobs`);
        const jobsArray = res.data.data || res.data;
        const foundJob = jobsArray.find((j) => j._id === id);
        console.log(jobsArray);
        setJob(foundJob);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f6f5f5" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#3bb4c1", borderTopColor: "transparent" }}
          ></div>
          <p className="text-lg font-medium" style={{ color: "#048998" }}>
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f6f5f5" }}
      >
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Job not found!</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200"
            style={{ background: "#3bb4c1", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#048998")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#3bb4c1")}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10 px-2 md:px-6 lg:px-20"
      style={{ background: "#f6f5f5" }}
    >
      <div className="max-w-5xl mx-auto">
        <button
          className="mb-6 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          style={{ background: "#e3e3e3", color: "#048998" }}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#3bb4c1";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#e3e3e3";
            e.currentTarget.style.color = "#048998";
          }}
        >
          <span>←</span> Back to Jobs
        </button>

        {job.image && (
          <div
            className="rounded-2xl overflow-hidden mb-8 relative h-80 bg-cover bg-center shadow-xl"
            style={{
              backgroundImage: `url(${job.image})`,
              backgroundColor: "#3bb4c1",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
                boxShadow: "inset 0 -120px 80px -50px rgba(0,0,0,0.7)",
              }}
            ></div>

            <div className="absolute bottom-8 left-8 right-8">
              <h1
                className="text-4xl lg:text-5xl font-bold text-white mb-3"
                style={{
                  textShadow:
                    "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)",
                }}
              >
                {job.title}
              </h1>
              <p
                className="text-xl text-white font-medium mb-2"
                style={{
                  textShadow:
                    "1px 1px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)",
                }}
              >
                {job.company}
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(59, 180, 193, 0.9)",
                    color: "white",
                  }}
                >
                  {job.location}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(4, 137, 152, 0.9)",
                    color: "white",
                  }}
                >
                  {job.mode}
                </span>
              </div>
            </div>
          </div>
        )}

        <div
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{ background: "#e3e3e3" }}
        >
          {!job.image && (
            <div
              className="p-8 rounded-t-2xl"
              style={{
                background: "linear-gradient(135deg, #3bb4c1 0%, #048998 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-white/90 font-medium">{job.company}</p>
            </div>
          )}

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div
                className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#f6f5f5" }}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#048998" }}
                >
                  {" "}
                  Location
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#048998" }}
                >
                  {job.location}
                </p>
              </div>

              <div
                className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#f6f5f5" }}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#048998" }}
                >
                  {" "}
                  Work Mode
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#048998" }}
                >
                  {job.mode}
                </p>
              </div>

              <div
                className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#f6f5f5" }}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#048998" }}
                >
                  {" "}
                  Job Type
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#048998" }}
                >
                  {job.jobType}
                </p>
              </div>

              <div
                className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#f6f5f5" }}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#048998" }}
                >
                  {" "}
                  Experience
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#048998" }}
                >
                  {job.experience}
                </p>
              </div>

              <div
                className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#f6f5f5" }}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#048998" }}
                >
                  {" "}
                  Level
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#048998" }}
                >
                  {job.experienceLevel}
                </p>
              </div>

              <div
                className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#f6f5f5" }}
              >
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#048998" }}
                >
                  {" "}
                  Salary
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#048998" }}
                >
                  {job.salary}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#048998" }}
              >
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200"
                    style={{
                      borderColor: "#3bb4c1",
                      color: "#048998",
                      background: "#f6f5f5",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#3bb4c1";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f6f5f5";
                      e.currentTarget.style.color = "#048998";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#048998" }}
              >
                Job Description
              </h2>
              <div
                className="p-6 rounded-xl leading-relaxed text-gray-700"
                style={{ background: "#f6f5f5" }}
              >
                {job.details}
              </div>
            </div>

            <div
              className="p-2 md:p-6 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #3bb4c1 0%, #048998 100%)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-3">
                Ready to Apply?
              </h2>
              <p className="text-white/90 mb-4">
                Send your application to the recruiter
              </p>
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl"></span>
                <a
                  href={`mailto:${job.recruiterEmail}`}
                  className="text-sm md:text-lg font-medium hover:underline"
                  style={{ color: "white" }}
                >
                  {job.recruiterEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() =>
              window.open(`mailto:${job.recruiterEmail}`, "_blank")
            }
            className="flex-1 min-w-[200px] px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg"
            style={{ background: "#3bb4c1", color: "white" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#048998";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3bb4c1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Apply Now →
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200"
            style={{ background: "#e3e3e3", color: "#048998" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f6f5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e3e3e3";
            }}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
