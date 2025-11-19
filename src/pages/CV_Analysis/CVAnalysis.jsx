import React, { useState } from "react";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import {
  FaUpload,
  FaCheckCircle,
  FaSpinner,
  FaFilePdf,
  FaRobot,
  FaBrain,
  FaTools,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function CVAnalysis() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedCareerTrack, setSelectedCareerTrack] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setAnalysisResult(null);
      setSelectedCareerTrack("");
    }
  };

  const handleAnalyzeCV = async () => {
    if (!selectedFile) {
      toast.error("Please select a CV file first");
      return;
    }

    setUploading(true);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("cv", selectedFile);
      formData.append("email", user?.email);

      const response = await axiosSecure.post("/api/cv-analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("CV Analysis Response:", response.data);

      if (response.data.success && response.data.data) {
        const analysisData = {
          extractedSkills: response.data.data.extractedSkills || [],
          careerTrack: response.data.data.careerTrack || [],
          cvPath: response.data.data.cvPath || "",
          fileName: response.data.data.fileName || "",
        };

        setAnalysisResult(analysisData);
        toast.success("CV analyzed successfully!");
      } else {
        toast.error("Invalid response format from server");
      }
    } catch (error) {
      console.error("CV analysis error:", error);
      toast.error(error.response?.data?.message || "Failed to analyze CV");
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  const handleSaveToProfile = async () => {
    if (!analysisResult) {
      toast.error("No analysis result to save");
      return;
    }

    if (!selectedCareerTrack) {
      toast.error("Please select a career track first");
      return;
    }

    try {
      const response = await axiosSecure.patch(
        `/api/update-from-cv/${user?.email}`,
        {
          skills: analysisResult.extractedSkills,
          careerTrack: selectedCareerTrack,
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");

        setTimeout(() => {
          window.location.href = "/v1/user-profile";
        }, 1500);
      }
    } catch (error) {
      console.error("Save to profile error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f5] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaBrain className="text-5xl text-[#048998]" />
            <h1 className="text-4xl font-bold text-gray-800">
              AI-Powered CV Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Upload your CV and let AI extract your skills, tools, and recommend
            career tracks
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col items-center">
            <label
              htmlFor="cv-upload"
              className="w-full max-w-md cursor-pointer"
            >
              <div className="border-4 border-dashed border-[#3bb4c1] rounded-xl p-12 text-center hover:border-[#048998] transition-colors">
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-3">
                    <FaFilePdf className="text-6xl text-red-500" />
                    <p className="font-semibold text-gray-800 text-lg">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedFile(null);
                        setAnalysisResult(null);
                        setSelectedCareerTrack("");
                      }}
                      className="text-red-500 hover:text-red-600 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <FaUpload className="text-6xl text-[#048998] mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      Click to upload your CV
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF format only, max 5MB
                    </p>
                  </div>
                )}
              </div>

              <input
                id="cv-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            {selectedFile && !analysisResult && (
              <button
                onClick={handleAnalyzeCV}
                disabled={uploading}
                className="mt-6 px-8 py-4 bg-linear-to-r from-[#048998] to-[#3bb4c1] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Analyzing CV...
                  </>
                ) : (
                  <>
                    <FaRobot /> Analyze with AI
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {analyzing && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-center gap-4">
              <FaSpinner className="animate-spin text-4xl text-[#048998]" />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  AI is analyzing your CV...
                </p>
                <p className="text-gray-600">
                  Extracting skills, tools, and matching career tracks
                </p>
              </div>
            </div>
          </div>
        )}

        {analysisResult && !analyzing && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 flex items-center gap-4">
              <FaCheckCircle className="text-4xl text-green-500" />
              <div>
                <p className="text-xl font-semibold text-green-800">
                  Analysis Complete!
                </p>
                <p className="text-green-700">
                  Found {analysisResult?.extractedSkills?.length} skills 
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaBrain className="text-3xl text-[#048998]" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Extracted Skills ({analysisResult?.extractedSkills?.length})
                </h2>
              </div>

              {analysisResult?.extractedSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-linear-to-r from-[#048998] to-[#3bb4c1] text-white px-4 py-2 rounded-full text-sm font-medium shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills extracted</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-3xl text-[#048998]" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Career Track Recommendations
                </h2>
              </div>

              {analysisResult?.careerTrack?.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    {analysisResult?.careerTrack?.map((match, idx) => (
                      <div
                        key={idx}
                        className={`border-2 rounded-xl p-5 transition-colors ${
                          selectedCareerTrack === match.careerTrack
                            ? "border-[#048998] bg-[#048998]/5"
                            : "border-gray-200 hover:border-[#3bb4c1]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {match}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {match.reason || `Matched related skills`}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {match?.matchedSkills?.map((skill, sidx) => (
                            <span
                              key={sidx}
                              className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <label className="block text-gray-700 font-semibold mb-3">
                      Select Your Primary Career Track:
                    </label>
                    <select
                      value={selectedCareerTrack}
                      onChange={(e) => setSelectedCareerTrack(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#3bb4c1] rounded-lg bg-white text-gray-800"
                    >
                      <option value="">Choose a career track...</option>
                      {analysisResult?.careerTrack?.map((match, idx) => (
                        <option key={idx} value={match}>
                          {match}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No career track matches found</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try adding more skills to your CV
                  </p>
                </div>
              )}
            </div>

            {analysisResult?.careerTrack?.length > 0 && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setAnalysisResult(null);
                    setSelectedFile(null);
                    setSelectedCareerTrack("");
                  }}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-lg hover:bg-gray-50"
                >
                  Analyze Another CV
                </button>

                <button
                  onClick={handleSaveToProfile}
                  disabled={!selectedCareerTrack}
                  className="px-12 py-4 bg-linear-to-r from-[#048998] to-[#3bb4c1] text-white font-bold text-xl rounded-lg shadow-lg disabled:opacity-50"
                >
                  Save to Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
