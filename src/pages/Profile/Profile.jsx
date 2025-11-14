import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaGraduationCap,
  FaBook,
  FaBriefcase,
  FaRoad,
  FaTools,
  FaProjectDiagram,
  FaFilePdf,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: userPro = {} } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg text-[#048998]"></span>
      </div>
    );
  }

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
      <div className="shrink-0 w-10 h-10 bg-[#048998] text-white rounded-full flex items-center justify-center mt-0.5">
        <Icon className="text-lg" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-700 text-sm mb-1">{label}</p>
        <p className="text-gray-900">{value || "Not provided"}</p>
      </div>
    </div>
  );

   // Render Skills
  const renderSkills = (skills) => {
    let skillsArray = [];
    if (Array.isArray(skills)) skillsArray = skills;
    else if (typeof skills === "string") {
      try {
        skillsArray = JSON.parse(skills);
      } catch {
        skillsArray = [];
      }
    }

    if (skillsArray.length === 0) return <p className="text-gray-500">No skills added</p>;

    return (
      <div className="flex flex-wrap gap-2">
        {skillsArray.map((skill, idx) => (
          <span
            key={idx}
            className="bg-linear-to-r from-[#048998] to-[#026873] text-white px-3 py-1 rounded-full text-sm font-medium shadow"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  // Render Projects
  const renderProjects = (projects) => {
    let projectsArray = [];
    if (Array.isArray(projects)) projectsArray = projects;
    else if (typeof projects === "string") {
      try {
        projectsArray = JSON.parse(projects);
      } catch {
        projectsArray = [];
      }
    }

    if (projectsArray.length === 0) return <p className="text-gray-500">No projects added</p>;

    return (
      <div className="grid md:grid-cols-2 gap-4">
        {projectsArray.map((project, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-shadow bg-white flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{project.title}</h3>
              {project.description && (
                <p className="text-gray-600 mb-3 text-sm">{project.description}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#048998] hover:text-[#026873] font-medium"
                >
                  <FaExternalLinkAlt /> Live
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#048998] hover:text-[#026873] font-medium"
                >
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f5f5] py-4 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#048998] to-[#026873] h-32 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"}
                  alt="User"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-20 pb-6 px-6">
            {/* Name & Email */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user?.displayName}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            {/* Grid Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <InfoItem icon={FaGraduationCap} label="Education Level" value={userPro?.education} />
              <InfoItem icon={FaBook} label="Department / Major" value={userPro?.department} />
              <InfoItem icon={FaBriefcase} label="Experience Level" value={userPro?.experience} />
              <InfoItem icon={FaRoad} label="Career Track" value={userPro?.careerTrack} />
            </div>

            {/* Skills */}
            <div className="mb-6">
              <p className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                <FaTools className="text-[#048998]" /> Skills
              </p>
              {renderSkills(userPro?.skills)}
            </div>
             {/* tools */}
            <div className="mb-6">
              <p className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                <FaTools className="text-[#048998]" /> Tools/ Technologies
              </p>
              {renderSkills(userPro?.tools)}
            </div>

            {/* Work Experience */}
            <InfoItem icon={FaBriefcase} label="Work Experience" value={userPro?.job_experience} />

            {/* Projects */}
            <div className="mt-6 mb-6">
              <p className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                <FaProjectDiagram className="text-[#048998]" /> Projects
              </p>
              {renderProjects(userPro?.projects)}
            </div>

            {/* CV / Resume */}
            {userPro?.cvPath && (
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="shrink-0 w-10 h-10 bg-[#048998] text-white rounded-full flex items-center justify-center mt-0.5">
                  <FaFilePdf className="text-lg" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700 text-sm mb-1">CV / Resume</p>
                  <Link
                    to={userPro.cvPath}
                    target="_blank"
                    className="text-[#048998] hover:text-[#026873] underline font-medium flex items-center gap-1"
                  >
                    View CV
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-center pt-6">
              <Link to="/v1/update-profile">
                <button className="px-8 py-3 bg-linear-to-r from-[#048998] to-[#026873] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Update Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}