import React, { useState, useEffect } from "react";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FaRoad,
  FaUserGraduate,
  FaClock,
  FaCalendarAlt,
  FaLightbulb,
  FaCheckCircle,
  FaSpinner,
  FaDownload,
  FaCopy,
  FaChartLine,
  FaTools,
  FaBriefcase,
  FaProjectDiagram,
  FaPlay,
  FaRocket,
} from "react-icons/fa";

export default function CareerRoadmap() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user profile
  const { data: userProfile = {}, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  // Fetch existing roadmap
  const {
    data: existingRoadmap = null,
    isLoading: roadmapLoading,
    refetch: refetchRoadmap,
  } = useQuery({
    queryKey: ["roadmap", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/roadmap/${user?.email}`);
      return res.data;
    },
  });

  // Parse user skills
  const userSkills = React.useMemo(() => {
    if (!userProfile.skills) return [];
    if (Array.isArray(userProfile.skills)) return userProfile.skills;
    try {
      return JSON.parse(userProfile.skills);
    } catch {
      return [];
    }
  }, [userProfile]);

  const userCareerTrack = userProfile.careerTrack || "";

  // Form state
  const [formData, setFormData] = useState({
    timeframe: "3",
    learningHoursPerWeek: "10",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

  // Check if user has existing roadmap
  useEffect(() => {
    if (existingRoadmap) {
      setGeneratedRoadmap(existingRoadmap);
      setShowRoadmap(true);
    }
  }, [existingRoadmap]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateRoadmap = async (e) => {
    e.preventDefault();

    if (!userCareerTrack) {
      toast.error("Please set your career track in your profile first!");
      return;
    }

    if (userSkills.length === 0) {
      toast.error("Please add skills to your profile first!");
      return;
    }

    setIsGenerating(true);

    try {
      // Prepare data for AI generation
      const roadmapRequest = {
        email: user?.email,
        currentSkills: userSkills,
        targetRole: userCareerTrack,
        timeframe: parseInt(formData.timeframe),
        learningHoursPerWeek: parseInt(formData.learningHoursPerWeek),
      };

      // Call backend API to generate roadmap
      const res = await axiosSecure.post(
        "/api/generate-roadmap",
        roadmapRequest
      );

      setGeneratedRoadmap(res.data);
      setShowRoadmap(true);
      toast.success("Roadmap generated successfully!");
      refetchRoadmap();
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate roadmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedRoadmap) return;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Build HTML content for PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Career Roadmap - ${
            generatedRoadmap.targetRole || userCareerTrack
          }</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(to right, #048998, #3bb4c1);
              color: white;
              padding: 30px;
              border-radius: 10px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 32px;
            }
            .header p {
              margin: 5px 0;
              opacity: 0.9;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .info-box {
              background: #f0f9fa;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #048998;
            }
            .info-box .label {
              color: #048998;
              font-weight: bold;
              font-size: 12px;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .info-box .value {
              font-size: 24px;
              font-weight: bold;
              color: #333;
            }
            .phase {
              background: #f9f9f9;
              border-left: 4px solid #048998;
              padding: 20px;
              margin-bottom: 20px;
              border-radius: 0 8px 8px 0;
              page-break-inside: avoid;
            }
            .phase-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
            }
            .phase-title {
              font-size: 20px;
              font-weight: bold;
              color: #048998;
              margin: 0;
            }
            .phase-number {
              background: linear-gradient(to right, #048998, #3bb4c1);
              color: white;
              padding: 5px 15px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 14px;
            }
            .duration {
              color: #666;
              font-size: 14px;
              margin-bottom: 15px;
            }
            .section-title {
              font-weight: bold;
              color: #048998;
              margin: 15px 0 10px 0;
              font-size: 16px;
            }
            .topics-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              margin-bottom: 15px;
            }
            .topic-item, .project-item {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              padding: 8px;
              background: white;
              border-radius: 5px;
            }
            .topic-item::before {
              content: "✓";
              color: #10b981;
              font-weight: bold;
              flex-shrink: 0;
            }
            .project-item::before {
              content: "💡";
              flex-shrink: 0;
            }
            .description {
              background: white;
              padding: 12px;
              border-radius: 5px;
              margin-top: 10px;
              font-size: 14px;
              color: #666;
            }
            .job-timeline {
              background: #ecfdf5;
              border: 2px solid #10b981;
              border-radius: 8px;
              padding: 20px;
              margin-top: 30px;
            }
            .job-timeline h3 {
              color: #065f46;
              margin: 0 0 10px 0;
              font-size: 18px;
            }
            .job-timeline p {
              color: #047857;
              margin: 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .phase { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎯 Career Roadmap</h1>
            <p><strong>Target Role:</strong> ${
              generatedRoadmap.targetRole || userCareerTrack
            }</p>
            <p><strong>Generated:</strong> ${new Date(
              generatedRoadmap.createdAt
            ).toLocaleDateString()}</p>
          </div>

          <div class="info-grid">
            <div class="info-box">
              <div class="label">📅 Timeframe</div>
              <div class="value">${generatedRoadmap.timeframe} Months</div>
            </div>
            <div class="info-box">
              <div class="label">⏰ Weekly Hours</div>
              <div class="value">${
                generatedRoadmap.learningHoursPerWeek
              } Hours</div>
            </div>
            <div class="info-box">
              <div class="label">📊 Total Phases</div>
              <div class="value">${generatedRoadmap.phases?.length || 0}</div>
            </div>
          </div>

          <h2 style="color: #048998; margin-bottom: 20px;">Learning Phases</h2>
    `;

    // Add phases
    if (generatedRoadmap.phases && generatedRoadmap.phases.length > 0) {
      generatedRoadmap.phases.forEach((phase, index) => {
        htmlContent += `
          <div class="phase">
            <div class="phase-header">
              <h3 class="phase-title">${phase.title}</h3>
              <span class="phase-number">Phase ${index + 1}</span>
            </div>
            <div class="duration">⏱️ Duration: ${phase.duration}</div>
        `;

        // Add topics
        if (phase.topics && phase.topics.length > 0) {
          htmlContent += `
            <div class="section-title">🛠️ Topics to Learn:</div>
            <div class="topics-grid">
          `;
          phase.topics.forEach((topic) => {
            htmlContent += `<div class="topic-item">${topic}</div>`;
          });
          htmlContent += `</div>`;
        }

        // Add projects
        if (phase.projects && phase.projects.length > 0) {
          htmlContent += `
            <div class="section-title">🚀 Project Ideas:</div>
            <div>
          `;
          phase.projects.forEach((project) => {
            htmlContent += `<div class="project-item">${project}</div>`;
          });
          htmlContent += `</div>`;
        }

        // Add description
        if (phase.description) {
          htmlContent += `<div class="description">${phase.description}</div>`;
        }

        htmlContent += `</div>`;
      });
    }

    // Add job application timeline
    if (generatedRoadmap.jobApplicationTimeline) {
      htmlContent += `
        <div class="job-timeline">
          <h3>💼 When to Start Applying for Jobs</h3>
          <p>${generatedRoadmap.jobApplicationTimeline}</p>
        </div>
      `;
    }

    // Add footer
    htmlContent += `
          <div class="footer">
            <p>Generated by Career Guidance Platform</p>
            <p>Keep learning and stay committed to your goals! 🌟</p>
          </div>
        </body>
      </html>
    `;

    // Write content and trigger print
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = function () {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    };

    toast.success("Opening print dialog...");
  };

  const handleCopyToClipboard = () => {
    if (!generatedRoadmap) return;

    // Create a text version of the roadmap
    let text = `Career Roadmap for ${userCareerTrack}\n\n`;
    text += `Generated on: ${new Date(
      generatedRoadmap.createdAt
    ).toLocaleDateString()}\n`;
    text += `Timeframe: ${generatedRoadmap.timeframe} months\n`;
    text += `Learning Hours/Week: ${generatedRoadmap.learningHoursPerWeek}\n\n`;

    if (generatedRoadmap.phases) {
      generatedRoadmap.phases.forEach((phase, index) => {
        text += `\n${phase.title}\n`;
        text += `Duration: ${phase.duration}\n\n`;

        if (phase.topics && phase.topics.length > 0) {
          text += `Topics to Learn:\n`;
          phase.topics.forEach((topic) => {
            text += `- ${topic}\n`;
          });
          text += `\n`;
        }

        if (phase.projects && phase.projects.length > 0) {
          text += `Project Ideas:\n`;
          phase.projects.forEach((project) => {
            text += `- ${project}\n`;
          });
          text += `\n`;
        }
      });
    }

    navigator.clipboard.writeText(text);
    toast.success("Roadmap copied to clipboard!");
  };

  if (profileLoading || roadmapLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f5f5]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#048998]"></span>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userCareerTrack || userSkills.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f5f5] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-[#048998]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUserGraduate className="text-5xl text-[#048998]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Complete Your Profile First
            </h2>
            <p className="text-gray-600 mb-6">
              To generate a personalized career roadmap, please update your
              profile with:
            </p>
            <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-[#048998]" />
                Career Track (Target Role)
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-[#048998]" />
                Current Skills
              </li>
            </ul>
            <button
              onClick={() => (window.location.href = "/v1/update-profile")}
              className="btn bg-[#048998] text-white hover:bg-[#026873] border-0"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f5f5] py-4 px-2 md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-[#048998] to-[#3bb4c1] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaRoad className="text-3xl" />
            AI-Powered Career Roadmap
          </h1>
          <p className="text-white/90 text-lg">
            Get a personalized learning path tailored to your goals
          </p>
        </div>

        {!showRoadmap ? (
          <>
            {/* Current Profile Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUserGraduate className="text-[#048998]" />
                Your Profile
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Target Role */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">
                    Target Role
                  </label>
                  <div className="px-4 py-3 bg-gradient-to-r from-[#048998] to-[#3bb4c1] text-white rounded-lg font-semibold flex items-center gap-2">
                    <FaBriefcase />
                    {userCareerTrack}
                  </div>
                </div>

                {/* Current Skills */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">
                    Current Skills ({userSkills.length})
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                    <div className="flex flex-wrap gap-2">
                      {userSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-[#048998] text-[#048998] rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap Configuration Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaLightbulb className="text-[#048998]" />
                Configure Your Roadmap
              </h2>

              <form
                onSubmit={handleGenerateRoadmap}
                className="space-y-6 flex flex-col"
              >
                {/* Input fields in one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Timeframe */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaCalendarAlt className="text-[#048998]" />
                        Learning Timeframe
                      </span>
                    </label>
                    <select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                      required
                      className="select ml-1 select-bordered focus:border-[#048998] focus:outline-none"
                    >
                      <option value="3">3 Months (Intensive)</option>
                      <option value="6">6 Months (Balanced)</option>
                      <option value="9">9 Months (Relaxed)</option>
                      <option value="12">12 Months (Comprehensive)</option>
                    </select>
                    <label className="label">
                      <span className="label-text-alt text-sm md:text-base text-gray-500">
                        How long do you have to reach your goal?
                      </span>
                    </label>
                  </div>

                  {/* Learning Hours Per Week */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaClock className="text-[#048998]" />
                        Learning Hours Per Week
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      name="learningHoursPerWeek"
                      value={formData.learningHoursPerWeek}
                      onChange={handleChange}
                      required
                      className="select select-bordered focus:border-[#048998] focus:outline-none"
                    >
                      <option value="5">5 hours/week (Part-time)</option>
                      <option value="10">10 hours/week (Moderate)</option>
                      <option value="15">15 hours/week (Committed)</option>
                      <option value="20">20 hours/week (Intensive)</option>
                      <option value="30">30+ hours/week (Full-time)</option>
                    </select>
                    <label className="label">
                      <span className="label-text-alt text-sm md:text-base text-gray-500">
                        How much time can you dedicate weekly?
                      </span>
                    </label>
                  </div>
                </div>

                {/* Centered button below */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="btn btn-lg bg-linear-to-r from-[#048998] to-[#3bb4c1] text-white border-0 hover:shadow-xl disabled:opacity-50 min-w-[250px]"
                  >
                    {isGenerating ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Generating Your Roadmap...
                      </>
                    ) : (
                      <>
                        <FaPlay />
                        Generate My Roadmap
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-4 md:p-8 mb-6">
              <div className="flex justify-between items-start mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Personalized Career Roadmap
                  </h2>
                  <p className="text-gray-600">
                    Target Role:{" "}
                    <strong className="text-[#048998]">
                      {generatedRoadmap?.targetRole || userCareerTrack}
                    </strong>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Generated on{" "}
                    {new Date(generatedRoadmap?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleCopyToClipboard}
                    className="btn btn-sm bg-gray-100 hover:bg-gray-200 border-0 gap-2"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="btn btn-sm bg-[#048998] text-white hover:bg-[#026873] border-0 gap-2"
                  >
                    <FaDownload /> Download PDF
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-linear-to-br from-[#048998]/10 to-[#3bb4c1]/10 rounded-lg">
                  <div className="flex items-center gap-2 text-[#048998] mb-1">
                    <FaCalendarAlt />
                    <span className="font-semibold">Timeframe</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {generatedRoadmap?.timeframe} Months
                  </p>
                </div>
                <div className="p-4 bg-linear-to-br from-[#048998]/10 to-[#3bb4c1]/10 rounded-lg">
                  <div className="flex items-center gap-2 text-[#048998] mb-1">
                    <FaClock />
                    <span className="font-semibold">Weekly Commitment</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {generatedRoadmap?.learningHoursPerWeek} Hours
                  </p>
                </div>
                <div className="p-4 bg-linear-to-br from-[#048998]/10 to-[#3bb4c1]/10 rounded-lg">
                  <div className="flex items-center gap-2 text-[#048998] mb-1">
                    <FaChartLine />
                    <span className="font-semibold">Total Phases</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {generatedRoadmap?.phases?.length || 0}
                  </p>
                </div>
              </div>

              {generatedRoadmap?.phases &&
              generatedRoadmap.phases.length > 0 ? (
                <div className="space-y-6">
                  {generatedRoadmap.phases.map((phase, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-[#048998] bg-gray-50 rounded-r-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {phase.title}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FaClock className="text-[#048998]" />
                            Duration: {phase.duration}
                          </p>
                        </div>
                        <span className="px-4 py-2 bg-linear-to-r from-[#048998] to-[#3bb4c1] text-white rounded-full font-semibold">
                          Phase {index + 1}
                        </span>
                      </div>

                      {phase.topics && phase.topics.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <FaTools className="text-[#048998]" />
                            Topics to Learn:
                          </h4>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {phase.topics.map((topic, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                                <span className="text-gray-700">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {phase.projects && phase.projects.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <FaProjectDiagram className="text-[#048998]" />
                            Project Ideas:
                          </h4>
                          <ul className="space-y-2">
                            {phase.projects.map((project, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 p-3 bg-white rounded-lg"
                              >
                                <FaLightbulb className="text-yellow-500 mt-1 shrink-0" />
                                <span className="text-gray-700">{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {phase.description && (
                        <p className="text-gray-600 text-sm mt-3 p-3 bg-white rounded-lg">
                          {phase.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No phases generated yet.</p>
                </div>
              )}

              {/* Job Application Timeline */}
              {generatedRoadmap?.jobApplicationTimeline && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl">
                  <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2 text-lg">
                    <FaBriefcase className="text-green-600" />
                    When to Start Applying for Jobs
                  </h3>
                  <p className="text-green-700">
                    {generatedRoadmap.jobApplicationTimeline}
                  </p>
                </div>
              )}
            </div>

            {/* Generate New Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowRoadmap(false);
                  setGeneratedRoadmap(null);
                }}
                className="btn btn-outline border-[#048998] text-[#048998] hover:bg-[#048998] hover:text-white"
              >
                Generate New Roadmap
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
