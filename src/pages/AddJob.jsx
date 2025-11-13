import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Briefcase, MapPin, DollarSign, Mail, Link as LinkIcon, CheckCircle, X } from "lucide-react";


const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg animate-slide-in ${
      type === "success"
        ? "bg-white border-l-4 border-[#3bb4c1]"
        : "bg-red-50 border-l-4 border-red-500"
    }`}
  >
    <CheckCircle
      className={`w-5 h-5 ${
        type === "success" ? "text-[#3bb4c1]" : "text-red-500"
      }`}
    />
    <div>
      <p className="font-semibold text-gray-900">{message}</p>
      <p className="text-sm text-gray-600">
        {type === "success"
          ? "Your job posting has been added and is now live."
          : "Please try again later."}
      </p>
    </div>
    <button onClick={onClose} className="ml-4">
      <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
    </button>
  </div>
);


const SkillsInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeSkill = (skill) => {
    onChange(value.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full px-3 py-2 border border-[#e3e3e3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3bb4c1] focus:border-[#3bb4c1]"
      />
      <div className="flex flex-wrap gap-2">
        {value.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[#3bb4c1]/10 text-[#048998] rounded-full text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-[#3bb4c1]"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};


const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  return error ? (
    <div className={`${className} bg-gray-200 flex items-center justify-center`}>
      <Briefcase className="w-12 h-12 text-gray-400" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
};


export default function AddJob() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      role: "",
      company: "",
      location: "",
      workMode: "",
      experience: "",
      skills: [],
      experienceLevel: "",
      jobType: "",
      salary: "",
      details: "",
      recruiterEmail: "",
      imageUrl: "",
    },
  });

  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setToast({ message: "Job Posted Successfully!", type: "success" });
        reset();
      } else throw new Error("Failed");
    } catch (err) {
      console.error(err);
      setToast({ message: "Error posting job.", type: "error" });
    } finally {
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f5]">
      <style>{`
        @keyframes pulse-slow {
          0%,100%{opacity:0.1;transform:scale(1);}
          50%{opacity:0.2;transform:scale(1.05);}
        }
        @keyframes float {
          0%,100%{transform:translateY(0px);}
          50%{transform:translateY(-10px);}
        }
        @keyframes slide-in {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }
        .animate-pulse-slow{animation:pulse-slow 3s ease-in-out infinite;}
        .animate-float{animation:float 3s ease-in-out infinite;}
        .animate-slide-in{animation:slide-in 0.6s ease-out forwards;}
      `}</style>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="bg-gradient-to-br from-[#3bb4c1] to-[#048998] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse-slow" />
          <div
            className="absolute bottom-10 right-20 w-48 h-48 bg-white rounded-full animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-float">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold animate-slide-in">Post a New Job</h1>
          <p className="text-white/90 mt-2 animate-slide-in">
            Connect the right talent to the right opportunity.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="font-medium text-gray-700">Job Title</label>
              <input
                {...register("role", { required: true })}
                placeholder="e.g., Software Engineer"
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">
                Company / Organization
              </label>
              <input
                {...register("company", { required: true })}
                placeholder="e.g., Tech Innovations Inc."
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Location</label>
                <input
                  {...register("location", { required: true })}
                  placeholder="e.g., San Francisco"
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">Work Mode</label>
                <select
                  {...register("workMode", { required: true })}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
                >
                  <option value="">Select mode</option>
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Experience</label>
                <input
                  {...register("experience", { required: true })}
                  placeholder="e.g., 2-4 years"
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Experience Level
                </label>
                <select
                  {...register("experienceLevel", { required: true })}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
                >
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">Required Skills</label>
              <Controller
                control={control}
                name="skills"
                render={({ field }) => (
                  <SkillsInput value={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Job Type</label>
                <select
                  {...register("jobType", { required: true })}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
                >
                  <option value="">Select type</option>
                  <option value="internship">Internship</option>
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-gray-700">Salary</label>
                <input
                  {...register("salary", { required: true })}
                  placeholder="Negotiable or amount"
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700">Job Description</label>
              <textarea
                {...register("details", { required: true })}
                rows={5}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
              ></textarea>
            </div>

            <div>
              <label className="font-medium text-gray-700">Recruiter Email</label>
              <input
                type="email"
                {...register("recruiterEmail", { required: true })}
                placeholder="recruiter@company.com"
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">Related Image URL</label>
              <input
                type="url"
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#3bb4c1]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#3bb4c1] to-[#048998] text-white py-3 rounded-md hover:from-[#048998] hover:to-[#3bb4c1] transition-all"
            >
              {isSubmitting ? "Posting..." : "Submit Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
