import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaFileAlt,
  FaEdit,
  FaExternalLinkAlt,
  FaTrophy,
} from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: userPro } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  const safeJsonParse = (data, fallback = []) => {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return fallback;
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg text-[#048998]"></span>
      </div>
    );
  }

  const skills = safeJsonParse(userPro?.skills, []);
  const projects = safeJsonParse(userPro?.projects, []);
  const cocurricular = safeJsonParse(userPro?.cocurricular_activities, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#048998] opacity-5 rounded-full -mr-32 -mt-32"></div>

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={
                user?.photoURL || "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"
              }
              alt={userPro?.fullName}
              className="w-32 h-32 rounded-full border-4 border-[#048998] shadow-lg object-cover"
            />

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {userPro?.fullName}
                  </h1>
                  <p className="text-xl text-[#048998] font-semibold">
                    {userPro?.careerTrack}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/v1/update-profile")}
                  className="bg-[#048998] hover:bg-[#037382] text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-gray-600">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <FaEnvelope className="text-[#048998]" />
                  <span className="text-sm md:text-base">{userPro?.email}</span>
                </div>
                {userPro?.contact && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <FaPhone className="text-[#048998]" />
                    <span className="text-sm md:text-base">
                      {userPro?.contact}
                    </span>
                  </div>
                )}
                {userPro?.address && (
                  <div className="flex items-center gap-2 md:col-span-2 justify-center md:justify-start">
                    <FaMapMarkerAlt className="text-[#048998] flex-shrink-0" />
                    <span className="text-sm">{userPro?.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-[#048998]" />
                Education
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Degree</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {userPro?.education || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Department</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {userPro?.department || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Institution</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {userPro?.educationalInstitute || "Not specified"}
                  </p>
                </div>
                {userPro?.passing_year && (
                  <div>
                    <p className="text-gray-600 text-sm">Passing Year</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {userPro?.passing_year}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBriefcase className="text-[#048998]" />
                Experience
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Level</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {userPro?.experience || "Not specified"}
                  </p>
                </div>
                {userPro?.job_experience && (
                  <div>
                    <p className="text-gray-600 text-sm mb-2">
                      Work Experience
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {userPro?.job_experience}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {projects.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#048998] hover:text-[#037382] flex items-center gap-1 text-sm font-medium"
                          >
                            <FaExternalLinkAlt size={12} /> Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#048998] hover:text-[#037382] flex items-center gap-1 text-sm font-medium"
                          >
                            <FaGithub size={14} /> View Code
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cocurricular.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaTrophy className="text-[#048998]" />
                  Co-curricular Activities
                </h2>
                <ul className="space-y-2">
                  {cocurricular.map((activity, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-[#048998] mt-1">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#048998] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Links</h2>
              <div className="space-y-3">
                {(userPro?.cvPath || userPro?.cv_url) && (
                  <a
                    href={userPro?.cvPath || userPro?.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaFileAlt className="text-[#048998] text-xl" />
                    <span className="text-gray-700 font-medium">Resume/CV</span>
                  </a>
                )}
                {userPro?.github_link && (
                  <a
                    href={userPro.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaGithub className="text-[#048998] text-xl" />
                    <span className="text-gray-700 font-medium">GitHub</span>
                  </a>
                )}
                {userPro?.linkedin_link && (
                  <a
                    href={userPro.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaLinkedin className="text-[#048998] text-xl" />
                    <span className="text-gray-700 font-medium">LinkedIn</span>
                  </a>
                )}
                {userPro?.portfolio_link && (
                  <a
                    href={userPro.portfolio_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaGlobe className="text-[#048998] text-xl" />
                    <span className="text-gray-700 font-medium">Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
