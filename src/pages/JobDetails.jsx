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
        const res = await axios.get(`http://localhost:5000/api/jobs`);
        const foundJob = res.data.find((j) => j._id === id);
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
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Job not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-6 lg:px-40">
      <button
        className="btn btn-sm btn-outline mb-6"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-primary mb-4">{job.title}</h1>
      <p className="text-gray-600 font-medium mb-2">{job.company}</p>
      <p className="text-sm mb-2">
        📍 {job.location} | 🏢 {job.mode} | 💼 {job.jobType}
      </p>
      <p className="text-sm mb-2">🕓 Experience: {job.experience}</p>
      <p className="text-sm mb-2">🎯 Level: {job.experienceLevel}</p>
      <p className="text-sm mb-2">💰 Salary: {job.salary}</p>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-1">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="badge badge-outline badge-primary text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">{job.details}</p>
      </div>

      <p className="text-sm text-gray-500">
        📧 Recruiter Email: <span className="font-medium">{job.recruiterEmail}</span>
      </p>
    </div>
  );
};

export default JobDetails;
