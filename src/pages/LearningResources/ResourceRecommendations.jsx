import React, { useState } from "react";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaBook,
  FaLightbulb,
  FaStar,
  FaExternalLinkAlt,
  FaFilter,
  FaCheckCircle,
  FaDollarSign,
  FaGift,
  FaTimes,
  FaRoad,
  FaBullseye,
} from "react-icons/fa";

export default function ResourceRecommendations() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedFilter, setSelectedFilter] = useState("all"); // all, free, paid
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch user profile
  const { data: userProfile = {}, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  // Fetch all courses
  const { data: allCourses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/get-all-resources`);
      return res.data;
    },
  });

  // Parse user skills for display
  const userSkills = React.useMemo(() => {
    if (!userProfile.skills) return [];
    if (Array.isArray(userProfile.skills)) return userProfile.skills;
    try {
      return JSON.parse(userProfile.skills);
    } catch {
      return [];
    }
  }, [userProfile]);

  // Get user's career track
  const userCareerTrack = userProfile.careerTrack || "";

  // Calculate recommendations: Match career track with course skills
  const recommendations = React.useMemo(() => {
    if (!userCareerTrack || !allCourses.length) return [];

    const matched = allCourses
      .map((course) => {
        // Parse course related skills
        let courseSkills = [];
        if (Array.isArray(course.relatedSkills)) {
          courseSkills = course.relatedSkills;
        } else if (typeof course.relatedSkills === "string") {
          try {
            courseSkills = JSON.parse(course.relatedSkills);
          } catch {
            courseSkills = course.relatedSkills ? [course.relatedSkills] : [];
          }
        }

        // Check if any course skill matches user's career track
        const isMatch = courseSkills.some((skill) => {
          const skillLower = skill.toLowerCase();
          const careerLower = userCareerTrack.toLowerCase();
          
          // Direct match or partial match
          return (
            skillLower === careerLower ||
            skillLower.includes(careerLower) ||
            careerLower.includes(skillLower)
          );
        });

        if (!isMatch) return null;

        // Find which skills match the career track
        const matchingSkills = courseSkills.filter((skill) => {
          const skillLower = skill.toLowerCase();
          const careerLower = userCareerTrack.toLowerCase();
          return (
            skillLower === careerLower ||
            skillLower.includes(careerLower) ||
            careerLower.includes(skillLower)
          );
        });

        return {
          ...course,
          courseSkills,
          matchingSkills,
          matchCount: matchingSkills.length,
        };
      })
      .filter(Boolean); // Remove null entries

    // Sort by number of matching skills
    return matched.sort((a, b) => b.matchCount - a.matchCount);
  }, [userCareerTrack, allCourses]);

  // Apply filters
  const filteredRecommendations = React.useMemo(() => {
    let filtered = [...recommendations];

    // Cost filter
    if (selectedFilter === "free") {
      filtered = filtered.filter((course) =>
        course.cost?.toLowerCase() === "free"
      );
    } else if (selectedFilter === "paid") {
      filtered = filtered.filter((course) =>
        course.cost?.toLowerCase() === "paid"
      );
    }

    // Platform filter
    if (selectedPlatform !== "all") {
      filtered = filtered.filter((course) =>
        course.platform?.toLowerCase() === selectedPlatform.toLowerCase()
      );
    }

    return filtered;
  }, [recommendations, selectedFilter, selectedPlatform]);

  // Extract unique platforms
  const platforms = React.useMemo(() => {
    const platformSet = new Set(
      allCourses.map((course) => course.platform).filter(Boolean)
    );
    return Array.from(platformSet);
  }, [allCourses]);

  if (profileLoading || coursesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f5f5]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#048998]"></span>
          <p className="mt-4 text-gray-600">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (!userCareerTrack) {
    return (
      <div className="min-h-screen bg-[#f6f5f5] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-[#048998]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRoad className="text-5xl text-[#048998]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Set Your Career Track First
            </h2>
            <p className="text-gray-600 mb-6">
              To get personalized learning recommendations, please update your profile with your preferred career track.
            </p>
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
    <div className="min-h-screen bg-[#f6f5f5] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#048998] to-[#3bb4c1] rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <FaBook className="text-3xl" />
                Recommended Learning Resources
              </h1>
              <p className="text-white/90 text-lg">
                Courses tailored for your career path
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
              <div className="text-3xl font-bold">{filteredRecommendations.length}</div>
              <div className="text-sm text-white/90">Courses Found</div>
            </div>
          </div>
        </div>

        {/* Career Track Display */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
            <FaBullseye className="text-[#048998]" />
            Your Career Path
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="px-6 py-3 bg-gradient-to-r from-[#048998] to-[#3bb4c1] text-white rounded-lg font-semibold text-lg flex items-center gap-2">
              <FaRoad />
              {userCareerTrack}
            </div>
            {userSkills.length > 0 && (
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">Your Current Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {userSkills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {userSkills.length > 5 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      +{userSkills.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-sm bg-[#048998] text-white hover:bg-[#026873] border-0"
            >
              <FaFilter /> Filters
            </button>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`btn btn-sm ${
                  selectedFilter === "all"
                    ? "bg-[#048998] text-white"
                    : "btn-outline border-gray-300"
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setSelectedFilter("free")}
                className={`btn btn-sm ${
                  selectedFilter === "free"
                    ? "bg-[#3bb4c1] text-white"
                    : "btn-outline border-gray-300"
                }`}
              >
                <FaGift /> Free Only
              </button>
              <button
                onClick={() => setSelectedFilter("paid")}
                className={`btn btn-sm ${
                  selectedFilter === "paid"
                    ? "bg-[#048998] text-white"
                    : "btn-outline border-gray-300"
                }`}
              >
                <FaDollarSign /> Paid
              </button>
            </div>

            {/* Active Filters Display */}
            {(selectedPlatform !== "all" || selectedFilter !== "all") && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-[#048998]/10 text-[#048998] px-3 py-1 rounded-full text-sm">
                    {selectedFilter}
                    <button onClick={() => setSelectedFilter("all")}>
                      <FaTimes size={10} />
                    </button>
                  </span>
                )}
                {selectedPlatform !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-[#3bb4c1]/10 text-[#3bb4c1] px-3 py-1 rounded-full text-sm">
                    {selectedPlatform}
                    <button onClick={() => setSelectedPlatform("all")}>
                      <FaTimes size={10} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Expandable Platform Filter */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Platform
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPlatform("all")}
                  className={`btn btn-sm ${
                    selectedPlatform === "all"
                      ? "bg-[#048998] text-white"
                      : "btn-outline border-gray-300"
                  }`}
                >
                  All Platforms
                </button>
                {platforms.map((platform, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`btn btn-sm ${
                      selectedPlatform === platform
                        ? "bg-[#3bb4c1] text-white"
                        : "btn-outline border-gray-300"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Grid */}
        {filteredRecommendations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBook className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-600 mb-2">
              No courses available for <strong>{userCareerTrack}</strong> yet.
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or check back later for new courses.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((course, index) => (
              <div
                key={course._id || index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#048998] to-[#3bb4c1] overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaBook className="text-6xl text-white/50" />
                    </div>
                  )}
                  
                  {/* Recommended Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="text-xs font-bold text-gray-800">
                        Recommended
                      </span>
                    </div>
                  </div>

                  {/* Cost Badge */}
                  <div className="absolute top-3 left-3">
                    {course.cost?.toLowerCase() === "free" ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <FaGift /> FREE
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <FaDollarSign /> PAID
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="text-sm text-gray-600 mb-3">
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {course.platform}
                    </span>
                  </div>

                  {/* Why Recommended */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs font-semibold text-green-800 mb-1 flex items-center gap-1">
                      <FaCheckCircle className="text-green-600" />
                      Why Recommended?
                    </p>
                    <p className="text-xs text-green-700">
                      This course covers skills related to your <strong>{userCareerTrack}</strong> career path
                    </p>
                  </div>

                  {/* Relevant Skills */}
                  {course.matchingSkills && course.matchingSkills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <FaCheckCircle className="text-[#048998]" />
                        Relevant Skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {course.matchingSkills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gradient-to-r from-[#048998] to-[#3bb4c1] text-white rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Course Skills */}
                  {course.courseSkills && course.courseSkills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        What You'll Learn:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {course.courseSkills.slice(0, 5).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {course.courseSkills.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{course.courseSkills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto btn bg-gradient-to-r from-[#048998] to-[#3bb4c1] text-white border-0 hover:shadow-lg w-full"
                  >
                    View Course <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendation Explanation
        {filteredRecommendations.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-[#048998]/10 to-[#3bb4c1]/10 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaLightbulb className="text-[#048998]" />
              How Recommendations Work
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Courses are matched based on your career track: <strong>{userCareerTrack}</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>
                  We find courses whose skills align with your chosen career path
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Each course helps you develop the skills needed for {userCareerTrack}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Use filters to find free courses or specific platforms that suit your learning style
                </span>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}