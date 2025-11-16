import React, { useState } from "react";
import { Search, BookOpen, ExternalLink, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../customHooks/useAxiosPublic";

const AllResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCost, setFilterCost] = useState("All");
  const [filterPlatform, setFilterPlatform] = useState("All");

  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    error,
    data: resources = [],
  } = useQuery({
    queryKey: ["allResources"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/get-all-resources");
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="text-center py-10 text-lg text-gray-600">
        Loading resources...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load resources.
      </div>
    );
  }

  const platforms = ["All", ...new Set(resources.map((c) => c.platform))];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.relatedSkills?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCost = filterCost === "All" || resource.cost === filterCost;
    const matchesPlatform =
      filterPlatform === "All" || resource.platform === filterPlatform;
    return matchesSearch && matchesCost && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-[#f6f5f5]">
      <div className="bg-linear-to-r from-[#048998] to-[#3bb4c1] text-white py-16 px-6 shadow-xl rounded-2xl">
        <div className="max-w-7xl px-6 md:px-12 mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={48} />
            <h1 className="text-5xl font-bold">Course Collection</h1>
          </div>
          <p className="text-xl text-cyan-50 mb-8">
            Discover {resources.length} curated courses to accelerate your
            career growth
          </p>

          <div className="relative max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#f6f5f5] text-gray-800 text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-center mb-8">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#048998]" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-initial">
            <select
              value={filterCost}
              onChange={(e) => setFilterCost(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-[#3bb4c1] focus:outline-none focus:ring-2 focus:ring-[#048998] bg-white"
            >
              <option value="All">All Costs</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>

            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-[#3bb4c1] focus:outline-none focus:ring-2 focus:ring-[#048998] bg-white"
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <span className="text-gray-600 font-medium sm:ml-auto">
            Showing {filteredResources.length} of {resources.length} courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#048998] to-[#3bb4c1]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/240x135/048998/ffffff?text=Course";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.cost === "Free"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 text-gray-800"
                    }`}
                  >
                    {course.cost}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-[#3bb4c1] bg-opacity-20 text-white rounded-full">
                    {course.platform}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4 min-h-6">
                  {course.relatedSkills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#048998] to-[#3bb4c1] text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  View Course
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No courses found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllResources;
