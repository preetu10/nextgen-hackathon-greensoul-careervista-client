import React, { useEffect, useState } from "react";

export default function AdminJobsView() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/");
      const data = await res.json();
      setJobs(data.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 min-h-screen" style={{ background: "#f6f5f5" }}>
      {" "}
      {/* first-color */}
      <h1 className="text-3xl font-bold mb-4" style={{ color: "#048998" }}>
        All Jobs (Admin)
      </h1>{" "}
      {/* fourth-color */}
      {loading ? (
        <span
          className="loading loading-spinner loading-lg"
          style={{ color: "#3bb4c1" }}
        ></span>
      ) : (
        <div
          className="overflow-x-auto shadow-lg rounded-lg p-4"
          style={{ background: "#e3e3e3" }}
        >
          <table className="table table-zebra w-full">
            <thead style={{ background: "#048998", color: "#fff" }}>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Salary</th>
                <th>Recruiter Email</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="font-semibold">{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.jobType}</td>
                  <td>{job.experience || job.experienceLevel}</td>
                  <td className="max-w-[180px]">
                    <div className="flex flex-wrap gap-1">
                      {job.skills?.map((s, i) => (
                        <span
                          key={i}
                          className="badge badge-outline badge-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{job.salary}</td>
                  <td>{job.recruiterEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
