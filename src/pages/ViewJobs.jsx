import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Filter, MapPin, Briefcase, Search, X } from "lucide-react";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    title: "",
    location: "",
    jobType: "",
  });

  const jobsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);


  const fetchJobs = async (filterParams = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterParams.title) params.append("title", filterParams.title);
      if (filterParams.location) params.append("location", filterParams.location);
      if (filterParams.jobType) params.append("jobType", filterParams.jobType);

      const res = await axios.get(`http://localhost:5000/api/jobs?${params.toString()}`);
      const allJobs = res.data.data || res.data;
      setJobs(allJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchJobs();
  }, []);

 
  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    fetchJobs(filters);
  };

  
  const handleClearFilters = () => {
    const emptyFilters = { title: "", location: "", jobType: "" };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
    fetchJobs();
  };

 
  const hasActiveFilters = filters.title || filters.location || filters.jobType;

  // Pagination
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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f6f5f5" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: "#3bb4c1",
              borderTopColor: "transparent",
            }}
          ></div>
          <p
            className="text-lg font-medium"
            style={{ color: "#048998" }}
          >
            Loading opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10" style={{ background: "#f6f5f5" }}>
     
      <h1
        className="text-4xl font-semibold text-center mb-10"
        style={{ color: "#048998" }}
        data-aos="fade-down"
      >
        Explore <span style={{ color: "#3bb4c1" }}>Career Opportunities</span>
      </h1>

     
      <div
        className="bg-white shadow-md rounded-xl mx-6 lg:mx-20 mb-10 p-6"
        data-aos="fade-up"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#048998]" />
          <h3 className="font-semibold text-[#048998]">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Job Title</label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#3bb4c1]">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="e.g., Frontend Developer"
                value={filters.title}
                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                className="w-full focus:outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Location</label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#3bb4c1]">
              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="e.g., Remote / Dhaka"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full focus:outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Job Type</label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#3bb4c1]">
              <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
              <select
                value={filters.jobType}
                onChange={(e) =>
                  setFilters({ ...filters, jobType: e.target.value })
                }
                className="w-full focus:outline-none text-sm bg-transparent"
              >
                <option value="">All</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="flex gap-3">
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg flex items-center gap-2"
            style={{
              background: "#3bb4c1",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#048998";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3bb4c1";
            }}
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              style={{
                background: "#e3e3e3",
                color: "#048998",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d0d0d0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#e3e3e3";
              }}
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

       
        {(appliedFilters.title || appliedFilters.location || appliedFilters.jobType) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {appliedFilters.title && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3bb4c1] text-white">
                Title: {appliedFilters.title}
              </span>
            )}
            {appliedFilters.location && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3bb4c1] text-white">
                Location: {appliedFilters.location}
              </span>
            )}
            {appliedFilters.jobType && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3bb4c1] text-white">
                Type: {appliedFilters.jobType}
              </span>
            )}
          </div>
        )}
      </div>

    
      {jobs.length === 0 ? (
        <div className="text-center text-gray-500" data-aos="fade-up">
          <p className="text-xl">No jobs match your filters.</p>
          <p className="text-sm mt-2">Try adjusting your filters!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 lg:px-20">
            {currentJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer overflow-hidden"
                style={{ background: "#e3e3e3" }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
             
                {job.image && (
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${job.image})`,
                      backgroundColor: "#3bb4c1",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {job.title}
                      </h2>
                      <p className="text-white font-medium">{job.company}</p>
                    </div>
                  </div>
                )}

             
                <div className="p-6">
                  {!job.image && (
                    <>
                      <h2
                        className="text-2xl font-bold mb-2"
                        style={{ color: "#048998" }}
                      >
                        {job.title}
                      </h2>
                      <p className="text-gray-700 font-medium mb-4">
                        {job.company}
                      </p>
                    </>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "#f6f5f5",
                        color: "#048998",
                      }}
                    >
                       {job.location}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "#f6f5f5",
                        color: "#048998",
                      }}
                    >
                       {job.jobType}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "#f6f5f5",
                        color: "#048998",
                      }}
                    >
                       {job.experience}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills &&
                      job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-medium border-2 transition-colors duration-200 hover:text-white"
                          style={{
                            borderColor: "#3bb4c1",
                            color: "#048998",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#3bb4c1";
                            e.currentTarget.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#048998";
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                  </div>

                  <button
                    onClick={() => navigate(`/v1/viewjobdetails/${job._id}`)}
                    className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                    style={{
                      background: "#3bb4c1",
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#048998";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#3bb4c1";
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10" data-aos="fade-up">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: currentPage === 1 ? "#e3e3e3" : "#3bb4c1",
                    color: currentPage === 1 ? "#888" : "white",
                  }}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  « Previous
                </button>
                <div
                  className="px-6 py-2 rounded-lg font-medium"
                  style={{ background: "#e3e3e3", color: "#048998" }}
                >
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background:
                      currentPage === totalPages ? "#e3e3e3" : "#3bb4c1",
                    color: currentPage === totalPages ? "#888" : "white",
                  }}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewJobs;