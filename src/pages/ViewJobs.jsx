import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data.data || res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <h1
        className="text-4xl font-semibold text-center mb-10 text-primary"
        data-aos="fade-down"
      >
        Explore <span className="text-secondary">Career Opportunities</span>
      </h1>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500" data-aos="fade-up">
          <p className="text-xl">No jobs available at the moment.</p>
          <p className="text-sm mt-2">Please check back later!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 lg:px-20">
            {currentJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="bg-base-200 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-600 font-medium mb-2">{job.company}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-primary text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/job/${job._id}`)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10" data-aos="fade-up">
            <div className="join">
              <button
                className="join-item btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button className="join-item btn">
                Page {currentPage} of {totalPages}
              </button>
              <button
                className="join-item btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewJobs;
