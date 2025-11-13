
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import InputField from "./InputField";

export default function UpdateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const careerOptions = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "AI / ML",
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

  // Fetch user profile
  const { isPending, data: userPro } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    education: "",
    department: "",
    experience: "",
    careerTrack: "",
    skills: [],
    job_experience: "",
    cvPath: "",
  });

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({ title: "", liveLink: "", githubLink: "", description: "" });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data
  useEffect(() => {
    if (userPro) {
      const parsedSkills = userPro.skills
        ? Array.isArray(userPro.skills)
          ? userPro.skills
          : JSON.parse(userPro.skills)
        : [];
      const parsedProjects = userPro.projects
        ? Array.isArray(userPro.projects)
          ? userPro.projects
          : JSON.parse(userPro.projects)
        : [];
      setFormData({
        education: userPro.education || "",
        department: userPro.department || "",
        experience: userPro.experience || "",
        careerTrack: userPro.careerTrack || "",
        skills: parsedSkills,
        job_experience: userPro.job_experience || "",
        cvPath: userPro.cvPath || "",
      });
      setProjects(parsedProjects);
    }
  }, [userPro]);

  // Fetch skills for career track
  useEffect(() => {
    const fetchSkills = async () => {
      if (!formData.careerTrack) return;
      try {
        const res = await axiosSecure.get(`/api/get-relevant-skills/${formData.careerTrack}`);
        setAvailableSkills(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, [formData.careerTrack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setShowSkillsDropdown(false);
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    setShowProjectForm(true);
    setCurrentProject({ title: "", liveLink: "", githubLink: "", description: "" });
  };

  const handleSaveProject = () => {
    if (!currentProject.title.trim()) {
      toast.error("Project title is required!");
      return;
    }
    setProjects((prev) => [...prev, currentProject]);
    setShowProjectForm(false);
    setCurrentProject({ title: "", liveLink: "", githubLink: "", description: "" });
    toast.success("Project added successfully!");
  };

  const handleDeleteProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
    toast.info("Project removed");
  };

  const handleSubmit = async () => {
    if (formData.skills.length === 0) {
      toast.error("Please select at least one skill!");
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        skills: JSON.stringify(formData.skills),
        projects: JSON.stringify(projects),
      };
      await axiosSecure.patch(`/api/user-update/${user?.email}`, dataToSubmit);
      toast.success("Profile updated successfully!");
      navigate("/v1/user-profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg text-[#048998]"></span>
      </div>
    );
  }

  const unselectedSkills = availableSkills.filter((s) => !formData.skills.includes(s));

  return (
    <div className="min-h-screen bg-[#f6f5f5] py-4 md:px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-[#048998] mb-4">Update Profile</h1>

        {/* Basic Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"}
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-[#048998]"
          />
          <div>
            <p className="text-lg font-bold">{user?.displayName}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Inputs */}
        <InputField
          label="Education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="e.g., Bachelor's, Master's"
        />
        <InputField
          label="Department / Major"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="e.g., Computer Science"
        />
        <InputField
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g., Entry Level"
        />

        {/* Career Track */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Career Track</label>
          <select
            name="careerTrack"
            value={formData.careerTrack}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#048998] focus:outline-none"
          >
            <option value="">Select your track</option>
            {careerOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill, i) => (
              <span key={i} className="bg-[#048998] text-white px-3 py-1 rounded-full flex items-center gap-1">
                {skill}
                <button type="button" onClick={() => handleSkillRemove(skill)}>
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
              className="px-2 py-1 border border-gray-300 rounded-lg text-sm"
            >
              {showSkillsDropdown ? "Close" : "Add Skills"}
            </button>
            {showSkillsDropdown && unselectedSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {unselectedSkills.map((skill, i) => (
                  <button
                    key={i}
                    onClick={() => handleSkillSelect(skill)}
                    className="w-full text-left px-3 py-1 hover:bg-[#048998] hover:text-white text-sm"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Work & CV */}
        <InputField
          label="Work Experience"
          name="job_experience"
          value={formData.job_experience}
          onChange={handleChange}
          placeholder="Describe your work experience..."
          multiline
        />
        <InputField
          label="CV / Resume URL"
          name="cvPath"
          value={formData.cvPath}
          onChange={handleChange}
          placeholder="Enter your CV link"
        />

        {/* Projects */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-700">Projects</p>
            <button onClick={handleAddProject} className="bg-[#048998] text-white px-3 py-1 rounded">
              Add Project
            </button>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="border border-gray-300 p-3 rounded mb-2 flex justify-between items-start">
              <div>
                <p className="font-semibold">{p.title}</p>
                {p.description && <p className="text-sm">{p.description}</p>}
                <div className="flex gap-2 text-sm mt-1">
                  {p.liveLink && (
                    <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="text-[#048998]">
                      Live
                    </a>
                  )}
                  {p.githubLink && (
                    <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-[#048998]">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <button onClick={() => handleDeleteProject(i)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          ))}

          {showProjectForm && (
            <div className="border p-4 rounded mb-2 bg-gray-50">
              <InputField name="title" label="Project Title" value={currentProject.title} onChange={handleProjectChange} />
              <InputField name="liveLink" label="Live Link" value={currentProject.liveLink} onChange={handleProjectChange} />
              <InputField name="githubLink" label="GitHub Link" value={currentProject.githubLink} onChange={handleProjectChange} />
              <InputField name="description" label="Description" value={currentProject.description} onChange={handleProjectChange} multiline />
              <div className="flex gap-2 mt-2">
                <button onClick={() => setShowProjectForm(false)} className="px-3 py-1 border rounded">
                  Cancel
                </button>
                <button onClick={handleSaveProject} className="px-3 py-1 bg-[#048998] text-white rounded">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <button onClick={() => navigate("/v1/user-profile")} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#048998] text-white rounded">
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

