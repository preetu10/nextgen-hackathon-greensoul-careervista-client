import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Brain, Loader2, RefreshCw } from "lucide-react";
import SkillGapAnalysis from "../components/SkillGapAnalysis";
import { jobAPI } from "../services/apiService";

const getIconForType = (title) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("frontend") || titleLower.includes("react"))
    return Briefcase;
  if (titleLower.includes("backend") || titleLower.includes("node"))
    return Briefcase;
  if (titleLower.includes("design") || titleLower.includes("ui/ux"))
    return Briefcase;
  return Briefcase;
};

export default function JobRecommend() {
  const { userId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSkillGap, setShowSkillGap] = useState(false);
  const [skillGapData, setSkillGapData] = useState(null);
  const [loadingSkillGap, setLoadingSkillGap] = useState(false);

  console.log("userId from URL params:", userId);

  useEffect(() => {
    if (!userId) {
      setError("User not logged in. Please log in to see job recommendations.");
      setLoading(false);
      return;
    }
    fetchRecommendedJobs();
  }, [userId]);

  const fetchRecommendedJobs = async () => {
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("Fetching jobs for userId:", userId);
      const data = await jobAPI.getRecommendedJobs(userId);

      if (data.success) {
        setJobs(data.data);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Error fetching recommended jobs:", err);
      setError(
        err.message || "Failed to load recommended jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkillGapAnalysis = async (job) => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      setLoadingSkillGap(true);
      setSelectedJob(job);

      const data = await jobAPI.getSkillGapAnalysis(userId, job._id);

      if (data.success) {
        setSkillGapData(data.data.analysis);
        setShowSkillGap(true);
      } else {
        alert(data.message || "Failed to generate skill gap analysis");
        setSelectedJob(null);
      }
    } catch (err) {
      console.error("Error fetching skill gap analysis:", err);
      alert(
        err.message ||
          "Failed to generate skill gap analysis. Please try again."
      );
      setSelectedJob(null);
    } finally {
      setLoadingSkillGap(false);
    }
  };

  const closeSkillGap = () => {
    setShowSkillGap(false);
    setSelectedJob(null);
    setSkillGapData(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2
            className="h-16 w-16 animate-spin mx-auto mb-4"
            style={{ color: "#048998" }}
          />
          <p className="text-gray-600 text-lg font-medium">
            Loading recommended jobs...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Finding the best matches for your skills
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto px-4">
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "#fee2e2" }}
          >
            <Briefcase className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Unable to Load Jobs
          </h3>
          <p className="text-red-600 mb-6">{error}</p>
          {userId ? (
            <button
              onClick={fetchRecommendedJobs}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:shadow-lg hover:bg-[#3bb4c1]"
              style={{ background: "#048998" }}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:shadow-lg hover:bg-[#3bb4c1]"
              style={{ background: "#048998" }}
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressBar {
          from {
            width: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Top Matches {jobs.length > 0 && `(${jobs.length})`}
          </h2>
          <button
            onClick={fetchRecommendedJobs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:shadow-md"
            style={{ background: "#E3F2F7", color: "#048998" }}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div
              className="h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "#E3F2F7" }}
            >
              <Briefcase className="h-12 w-12" style={{ color: "#048998" }} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No matching jobs found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any jobs matching your current skills. Try
              updating your profile or check back later for new opportunities.
            </p>
            <button
              onClick={fetchRecommendedJobs}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:shadow-lg"
              style={{ background: "#048998" }}
            >
              <RefreshCw className="h-4 w-4" />
              Check Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => {
              const Icon = getIconForType(job.title);
              const isPartialMatch = job.matchPercentage < 80;

              return (
                <div
                  key={job._id}
                  className="group relative h-full overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  style={{
                    background: "#ffffff",
                    opacity: 0,
                    transform: "translateY(20px)",
                    animation: `fadeInUp 0.6s ease-out ${
                      index * 0.1
                    }s forwards`,
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
                          <img
                            src={job.image}
                            alt={job.company}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/100?text=" +
                                job.company.charAt(0);
                            }}
                          />
                        </div>
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:rotate-6"
                          style={{ background: "#E3F2F7" }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: "#048998" }}
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-xl font-semibold">
                      {job.title}
                    </h3>

                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        {job.company}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-gray-600">Match Score</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#048998" }}
                        >
                          {job.matchPercentage}%
                        </span>
                      </div>
                      <div
                        className="h-2 w-full overflow-hidden rounded-full"
                        style={{ background: "#e3e3e3" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, #048998 0%, #3bb4c1 100%)",
                            width: `${job.matchPercentage}%`,
                            animation: `progressBar 0.8s ease-out ${
                              index * 0.1 + 0.3
                            }s forwards`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-sm text-gray-600">
                        Matched Skills:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.matchedSkills && job.matchedSkills.length > 0 ? (
                          <>
                            {job.matchedSkills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{
                                  background: "#E3F2F7",
                                  color: "#048998",
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                            {job.matchedSkills.length > 3 && (
                              <span
                                className="rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{
                                  background: "#E3F2F7",
                                  color: "#048998",
                                }}
                              >
                                +{job.matchedSkills.length - 3}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-gray-500">
                            No matched skills
                          </span>
                        )}
                      </div>
                    </div>

                    {isPartialMatch && (
                      <button
                        className="mt-4 w-full rounded-xl px-4 py-2 font-medium transition-all hover:shadow-md flex items-center justify-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background:
                            loadingSkillGap && selectedJob?._id === job._id
                              ? "#fef3c7"
                              : "#fef3c7",
                          color: "#92400e",
                          borderColor: "#fbbf24",
                        }}
                        onClick={() => handleSkillGapAnalysis(job)}
                        disabled={
                          loadingSkillGap && selectedJob?._id === job._id
                        }
                      >
                        {loadingSkillGap && selectedJob?._id === job._id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4" />
                            Analyze Skill Gaps
                          </>
                        )}
                      </button>
                    )}

                    <button
                      className="mt-3 w-full rounded-xl px-4 py-2 font-medium text-white transition-all hover:bg-[#3bb4c1] hover:shadow-lg"
                      style={{
                        background: "#048998",
                      }}
                      onClick={() => {
                        window.location.href = `/jobs/${job._id}`;
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showSkillGap && skillGapData && selectedJob && (
        <SkillGapAnalysis
          job={selectedJob}
          analysis={skillGapData}
          onClose={closeSkillGap}
        />
      )}
    </div>
  );
}
