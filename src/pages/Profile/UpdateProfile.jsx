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
    educationalInstitute: "",
    passing_year: "",
    experience: "",
    careerTrack: "",
    address: "",
    contact: "",
    skills: [],
    cocurricular_activities: [],
    job_experience: "",
    cvPath: "",
    github_link: "",
    linkedin_link: "",
    portfolio_link: "",
  });

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    liveLink: "",
    githubLink: "",
    description: "",
  });
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (userPro) {
      const parsedSkills = safeJsonParse(userPro.skills, []);
      const parsedActivities = safeJsonParse(
        userPro.cocurricular_activities,
        []
      );
      const parsedProjects = safeJsonParse(userPro.projects, []);

      setFormData({
        education: userPro.education || "",
        department: userPro.department || "",
        educationalInstitute: userPro.educationalInstitute || "",
        passing_year: userPro.passing_year || "",
        experience: userPro.experience || "",
        careerTrack: userPro.careerTrack || "",
        address: userPro.address || "",
        contact: userPro.contact || "",
        skills: parsedSkills,
        cocurricular_activities: parsedActivities,
        job_experience: userPro.job_experience || "",

        cvPath: userPro.cvPath || userPro.cv_url || "",
        github_link: userPro.github_link || "",
        linkedin_link: userPro.linkedin_link || "",
        portfolio_link: userPro.portfolio_link || "",
      });

      setProjects(parsedProjects);
    }
  }, [userPro]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!formData.careerTrack) return;
      try {
        const res = await axiosSecure.get(
          `/api/get-relevant-skills/${formData.careerTrack}`
        );
        setAvailableSkills(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, [formData.careerTrack, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setShowSkillsDropdown(false);
  };

  const handleCoCurricularAdd = () => {
    setShowActivityForm(true);
    setNewActivity("");
  };

  const handleSaveActivity = () => {
    if (!newActivity.trim()) {
      toast.error("Please write an activity.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      cocurricular_activities: [...prev.cocurricular_activities, newActivity],
    }));

    setShowActivityForm(false);
    setNewActivity("");
    toast.success("Activity added!");
  };

  const handleActivityRemove = (activityToRemove) => {
    setFormData((prev) => ({
      ...prev,
      cocurricular_activities: prev.cocurricular_activities.filter(
        (a) => a !== activityToRemove
      ),
    }));
    toast.info("Activity removed");
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
    setCurrentProject({
      title: "",
      liveLink: "",
      githubLink: "",
      description: "",
    });
  };

  const handleSaveProject = () => {
    if (!currentProject.title.trim()) {
      toast.error("Project title is required!");
      return;
    }
    setProjects((prev) => [...prev, currentProject]);
    setShowProjectForm(false);
    setCurrentProject({
      title: "",
      liveLink: "",
      githubLink: "",
      description: "",
    });
    toast.success("Project added successfully!");
  };

  const handleDeleteProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
    toast.info("Project removed");
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.careerTrack) {
      toast.error("Please select a career track!");
      return;
    }

    if (formData.skills.length === 0) {
      toast.error("Please select at least one skill!");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        education: formData.education,
        department: formData.department,
        educationalInstitute: formData.educationalInstitute,
        passing_year: formData.passing_year,
        experience: formData.experience,
        careerTrack: formData.careerTrack,
        address: formData.address,
        contact: formData.contact,
        job_experience: formData.job_experience,

        skills: JSON.stringify(formData.skills),
        cocurricular_activities: JSON.stringify(
          formData.cocurricular_activities
        ),
        projects: JSON.stringify(projects),

        cv_url: formData.cvPath,
        github_link: formData.github_link,
        linkedin_link: formData.linkedin_link,
        portfolio_link: formData.portfolio_link,
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

  const unselectedSkills = availableSkills.filter(
    (s) => !formData.skills.includes(s)
  );

  return (
    <div className="min-h-screen bg-[#f6f5f5] py-4 md:px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-[#048998] mb-4">
          Update Profile
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"
            }
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-[#048998] object-cover"
          />
          <div>
            <p className="text-lg font-bold">{user?.displayName}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <InputField
          label="Educational Institution"
          name="educationalInstitute"
          value={formData.educationalInstitute}
          onChange={handleChange}
          placeholder="e.g., University of Chittagong"
        />
        <InputField
          label="Education Level"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="e.g., BSc (Engineering), Bachelor's, Master's"
        />

        <InputField
          label="Department / Major"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="e.g., Department of Computer Science and Engineering"
        />

        <InputField
          label="Passing Year"
          name="passing_year"
          value={formData.passing_year}
          onChange={handleChange}
          placeholder="e.g., 2025"
        />

        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Your current address"
        />

        <InputField
          label="Contact Number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="e.g., +8801XXXXXXXXX"
        />

        <InputField
          label="GitHub Profile Link"
          name="github_link"
          value={formData.github_link}
          onChange={handleChange}
          placeholder="https://github.com/your-profile"
        />

        <InputField
          label="LinkedIn Profile Link"
          name="linkedin_link"
          value={formData.linkedin_link}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/your-profile"
        />

        <InputField
          label="Portfolio / Website Link"
          name="portfolio_link"
          value={formData.portfolio_link}
          onChange={handleChange}
          placeholder="https://yourportfolio.com"
        />

        <InputField
          label="Experience Level"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g., Fresher, Entry Level, Mid Level"
        />

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Career Track <span className="text-red-500">*</span>
          </label>
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

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">
            Skills <span className="text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-[#048998] text-white px-3 py-1 rounded-full flex items-center gap-1"
              >
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
              className="px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
            >
              {showSkillsDropdown ? "Close" : "Add Skills"}
            </button>

            {showSkillsDropdown && unselectedSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-1 border rounded-lg bg-white shadow-lg max-h-40 overflow-y-auto">
                {unselectedSkills.map((skill, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-[#048998] hover:text-white text-sm"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}

            {showSkillsDropdown && unselectedSkills.length === 0 && (
              <div className="absolute z-10 w-full mt-1 border rounded-lg bg-white shadow-lg p-3 text-sm text-gray-500">
                No more skills available. All skills added!
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold text-gray-700">
              Co-curricular Activities
            </label>
            <button
              type="button"
              onClick={handleCoCurricularAdd}
              className="px-3 py-1 bg-[#048998] text-white rounded hover:bg-[#037382]"
            >
              Add Activity
            </button>
          </div>

          {formData.cocurricular_activities.map((act, i) => (
            <div
              key={i}
              className="border border-gray-300 p-3 rounded-lg mt-2 flex justify-between items-center"
            >
              <p className="text-gray-700">{act}</p>
              <button
                type="button"
                onClick={() => handleActivityRemove(act)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {showActivityForm && (
            <div className="bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
              <label className="block font-semibold mb-2 text-gray-700">
                Add Co-Curricular Activity
              </label>

              <textarea
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:border-[#048998] focus:outline-none"
                placeholder="e.g., Volunteering in xyz organization"
                rows="2"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowActivityForm(false)}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveActivity}
                  className="px-4 py-2 bg-[#048998] text-white rounded-lg hover:bg-[#037382]"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

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
          placeholder="Enter Google Drive or PDF link"
        />

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold text-gray-700">Projects</label>
            <button
              type="button"
              onClick={handleAddProject}
              className="px-3 py-1 bg-[#048998] text-white rounded hover:bg-[#037382]"
            >
              Add Project
            </button>
          </div>

          {projects.map((p, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 rounded-lg mt-2 flex justify-between items-start"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{p.title}</p>
                {p.description && (
                  <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                )}
                <div className="flex gap-3 mt-2">
                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#048998] text-sm hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#048998] text-sm hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteProject(i)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {showProjectForm && (
            <div className="bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
              <InputField
                name="title"
                label="Project Title"
                value={currentProject.title}
                onChange={handleProjectChange}
                placeholder="e.g., BuildAura"
              />
              <InputField
                name="liveLink"
                label="Live Link"
                value={currentProject.liveLink}
                onChange={handleProjectChange}
                placeholder="https://your-project.web.app/"
              />
              <InputField
                name="githubLink"
                label="GitHub Link"
                value={currentProject.githubLink}
                onChange={handleProjectChange}
                placeholder="https://github.com/username/project"
              />
              <InputField
                name="description"
                label="Description"
                value={currentProject.description}
                onChange={handleProjectChange}
                multiline
                placeholder="Brief description of your project..."
              />

              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowProjectForm(false)}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProject}
                  className="px-4 py-2 bg-[#048998] text-white rounded-lg hover:bg-[#037382]"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate("/v1/user-profile")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#048998] text-white rounded-lg hover:bg-[#037382] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
