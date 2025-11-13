// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../customHooks/useAuth";
// import useAxiosSecure from "../../customHooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import {
//   FaGraduationCap,
//   FaBook,
//   FaBriefcase,
//   FaRoad,
//   FaTools,
//   FaProjectDiagram,
//   FaFilePdf,
//   FaSave,
//   FaPlus,
//   FaTrash,
//   FaCheck,
//   FaTimes,
// } from "react-icons/fa";

// export default function UpdateProfile() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const careerOptions = [
//     "Web Development",
//     "Mobile App Development",
//     "Data Science",
//     "Artificial Intelligence / Machine Learning",
//     "UI/UX Design",
//     "Graphic Design",
//     "Digital Marketing",
//     "Content Writing",
//     "Software Engineering",
//     "Cybersecurity",
//     "Cloud Computing",
//     "Business Analysis",
//     "DevOps / System Administration",
//     "Finance & Accounting",
//     "Human Resources (HR)",
//     "Education & Training",
//   ];

//   // Fetch user profile
//   const { isPending, data: userPro = {} } = useQuery({
//     queryKey: ["userPro", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/api/user/${user?.email}`);
//       return res.data;
//     },
//   });

//   // Form data state
//   const [formData, setFormData] = useState({
//     education: "",
//     department: "",
//     experience: "",
//     careerTrack: "",
//     skills: [],
//     job_experience: "",
//     cvPath: "",
//   });

//   const [projects, setProjects] = useState([]);
//   const [showProjectForm, setShowProjectForm] = useState(false);
//   const [currentProject, setCurrentProject] = useState({
//     title: "",
//     liveLink: "",
//     githubLink: "",
//     description: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);

//   // Parse userPro on load
//   useEffect(() => {
//     if (userPro) {
//       // Parse skills safely
//       let parsedSkills = [];
//       if (userPro.skills) {
//         if (Array.isArray(userPro.skills)) parsedSkills = userPro.skills;
//         else if (typeof userPro.skills === "string")
//           parsedSkills = JSON.parse(userPro.skills);
//       }

//       // Parse projects safely
//       let parsedProjects = [];
//       if (userPro.projects) {
//         if (Array.isArray(userPro.projects)) parsedProjects = userPro.projects;
//         else if (typeof userPro.projects === "string")
//           parsedProjects = JSON.parse(userPro.projects);
//       }

//       setFormData({
//         education: userPro.education || "",
//         department: userPro.department || "",
//         experience: userPro.experience || "",
//         careerTrack: userPro.careerTrack || "",
//         skills: parsedSkills,
//         job_experience: userPro.job_experience || "",
//         cvPath: userPro.cvPath || "",
//       });

//       setProjects(parsedProjects);
//     }
//   }, [userPro]);

//   // Fetch skills based on careerTrack
//   const { data: availableSkills = [], isLoading: skillsLoading } = useQuery({
//     queryKey: ["availableSkills", formData.careerTrack],
//     queryFn: async () => {
//       if (!formData.careerTrack) return [];
//       const res = await axiosSecure.get(
//         `/api/get-relevant-skills/${formData.careerTrack}`
//       );
//       return res.data;
//     },
//     enabled: !!formData.careerTrack,
//   });

//   // Handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSkillSelect = (skill) => {
//     if (!formData.skills.includes(skill)) {
//       setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
//     }
//     setShowSkillsDropdown(false);
//   };

//   const handleSkillRemove = (skillToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((s) => s !== skillToRemove),
//     }));
//   };

//   const handleProjectChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddProject = () => {
//     setShowProjectForm(true);
//     setCurrentProject({ title: "", liveLink: "", githubLink: "", description: "" });
//   };

//   const handleSaveProject = () => {
//     if (!currentProject.title.trim()) {
//       toast.error("Project title is required!");
//       return;
//     }
//     setProjects((prev) => [...prev, currentProject]);
//     setShowProjectForm(false);
//     setCurrentProject({ title: "", liveLink: "", githubLink: "", description: "" });
//     toast.success("Project added successfully!");
//   };

//   const handleDeleteProject = (index) => {
//     setProjects((prev) => prev.filter((_, i) => i !== index));
//     toast.info("Project removed");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.skills.length === 0) {
//       toast.error("Please select at least one skill!");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const dataToSubmit = {
//         ...formData,
//         skills: JSON.stringify(formData.skills),
//         projects: JSON.stringify(projects),
//       };
//       await axiosSecure.patch(`/api/user-update/${user?.email}`, dataToSubmit);
//       toast.success("Profile updated successfully!");
//       navigate("/v1/user-profile");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update profile. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <span className="loading loading-dots loading-lg text-[#048998]"></span>
//       </div>
//     );
//   }

//   const InputField = ({ icon: Icon, label, name, type = "text", placeholder, required = false, multiline = false }) => (
//     <div className="form-control">
//       <label className="label">
//         <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
//           <Icon className="text-[#048998]" />
//           {label}
//           {required && <span className="text-red-500">*</span>}
//         </span>
//       </label>
//       {multiline ? (
//         <textarea
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className="textarea mx-2 textarea-bordered h-24 focus:border-[#048998] focus:outline-none"
//           required={required}
//         />
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className="input input-bordered mx-2 focus:border-[#048998] focus:outline-none"
//           required={required}
//         />
//       )}
//     </div>
//   );

//   const unselectedSkills = availableSkills.filter((s) => !formData.skills.includes(s));

//   return (
//     <div className="min-h-screen bg-[#f6f5f5] py-4 md:px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-linear-to-r from-[#048998] to-[#026873] px-8 py-6">
//             <h1 className="text-3xl font-bold text-white">Update Profile</h1>
//             <p className="text-white/90 mt-2">Keep your professional information up to date</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="p-4 md:p-8">
//             {/* User Info */}
//             <div className="flex items-center gap-2 md:gap-4 mb-8 md:p-4 bg-gray-50 rounded-lg">
//               <img
//                 src={user?.photoURL || "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"}
//                 alt="User"
//                 className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#048998]"
//               />
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800">{user?.displayName}</h2>
//                 <p className="text-gray-600">{user?.email}</p>
//               </div>
//             </div>

//             {/* Form Grid */}
//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               <InputField icon={FaGraduationCap} label="Education Level" name="education" placeholder="e.g., Bachelor's, Master's" required />
//               <InputField icon={FaBook} label="Department / Major" name="department" placeholder="e.g., Computer Science" required />
//               <InputField icon={FaBriefcase} label="Experience Level" name="experience" placeholder="e.g., Entry Level" required />
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
//                     <FaRoad className="text-[#048998]" /> Preferred Career Track <span className="text-red-500">*</span>
//                   </span>
//                 </label>
//                 <select
//                   name="careerTrack"
//                   value={formData.careerTrack}
//                   onChange={handleChange}
//                   required
//                   className="select select-bordered mx-2 focus:border-[#048998] focus:outline-none"
//                 >
//                   <option value="">Select your track</option>
//                   {careerOptions.map((option, index) => (
//                     <option key={index} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="mb-6">
//               <label className="label font-semibold text-gray-700 flex items-center gap-2">
//                 <FaTools className="text-[#048998]" /> Skills <span className="text-red-500">*</span>
//               </label>
//               <div className="mx-2 min-h-6 px-2 border border-gray-300 rounded-lg bg-white focus-within:border-[#048998] transition-colors">
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {formData.skills.map((skill, index) => (
//                     <span key={index} className="inline-flex mt-1 items-center gap-2 bg-[#048998] text-white px-3 py-1 rounded-full text-sm">
//                       {skill}
//                       <button type="button" onClick={() => handleSkillRemove(skill)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors">
//                         <FaTimes size={12} />
//                       </button>
//                     </span>
//                   ))}
//                 </div>

//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
//                     className="w-full text-left px-2 py-1 text-gray-500 hover:text-gray-700 text-sm"
//                     disabled={skillsLoading}
//                   >
//                     {skillsLoading ? "Loading skills..." : "Click to add skills..."}
//                   </button>
//                   {showSkillsDropdown && unselectedSkills.length > 0 && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       {unselectedSkills.map((skill, i) => (
//                         <button
//                           key={i}
//                           type="button"
//                           onClick={() => handleSkillSelect(skill)}
//                           className="w-full text-left px-4 py-2 hover:bg-[#048998] hover:text-white transition-colors text-sm"
//                         >
//                           {skill}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                   {showSkillsDropdown && unselectedSkills.length === 0 && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm">
//                       All available skills have been selected
//                     </div>
//                   )}
//                 </div>
//                 {formData.skills.length === 0 && (
//                   <label className="label text-gray-500 text-sm">Please select at least one skill</label>
//                 )}
//               </div>
//             </div>

//             {/* Work & CV */}
//             <div className="space-y-4 mb-6">
//               <InputField icon={FaBriefcase} label="Work Experience" name="job_experience" placeholder="Describe your work experience..." />
//               <InputField icon={FaFilePdf} label="CV / Resume URL" name="cvPath" type="url" placeholder="Upload CV in a drive and enter that drive link" />
//             </div>

//             {/* Projects */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="label font-semibold text-gray-700 flex items-center gap-2 text-lg">
//                   <FaProjectDiagram className="text-[#048998]" /> Projects
//                 </label>
//                 <button type="button" onClick={handleAddProject} className="btn btn-sm bg-[#048998] text-white hover:bg-[#026873] border-0">
//                   <FaPlus /> Add Project
//                 </button>
//               </div>

//               {projects.map((project, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
//                     {project.description && <p className="text-gray-600 text-sm mb-2">{project.description}</p>}
//                     <div className="flex flex-wrap gap-3 text-sm">
//                       {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-[#048998] hover:underline">🔗 Live Link</a>}
//                       {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-[#048998] hover:underline">💻 GitHub</a>}
//                     </div>
//                   </div>
//                   <button type="button" onClick={() => handleDeleteProject(index)} className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-50">
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}

//               {showProjectForm && (
//                 <div className="border-2 border-[#048998] rounded-lg p-6 bg-blue-50/50 mt-4">
//                   <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                     <FaProjectDiagram className="text-[#048998]" /> New Project
//                   </h3>
//                   <div className="space-y-4">
//                     <InputField name="title" label="Project Title" placeholder="Enter project title" icon={() => null} required multiline={false} />
//                     <InputField name="liveLink" label="Project Live Link" placeholder="https://your-project.com" icon={() => null} />
//                     <InputField name="githubLink" label="Project GitHub Link" placeholder="https://github.com/username/repo" icon={() => null} required />
//                     <InputField name="description" label="Project Description" placeholder="Describe your project..." icon={() => null} multiline />
//                     <div className="flex gap-3 justify-end">
//                       <button type="button" onClick={() => setShowProjectForm(false)} className="btn btn-outline border-gray-300">Cancel</button>
//                       <button type="button" onClick={handleSaveProject} className="btn bg-[#048998] text-white hover:bg-[#026873] border-0">
//                         <FaCheck /> OK
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t">
//               <button type="button" onClick={() => navigate("/v1/user-profile")} className="btn btn-outline border-gray-300 hover:bg-gray-100" disabled={isSubmitting}>
//                 Cancel
//               </button>
//               <button type="submit" disabled={isSubmitting} className="btn bg-linear-to-r from-[#048998] to-[#026873] text-white border-0 hover:shadow-lg disabled:opacity-50">
//                 {isSubmitting ? <> <span className="loading loading-spinner loading-sm"></span> Updating...</> : <> <FaSave /> Update Profile </>}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
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

