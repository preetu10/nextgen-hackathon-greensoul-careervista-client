import React, { useEffect, useState } from "react";

export default function AdminResourcesView() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get-all-resources");
      const data = await res.json();
      setResources(data || []);
    } catch (err) {
      console.error("Error fetching resources:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="p-6 bg-[#f6f5f5] min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-[#048998]">
        All Learning Resources (Admin)
      </h1>

      {loading ? (
        <span className="loading loading-spinner loading-lg text-[#3bb4c1]"></span>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-[#e3e3e3] p-4">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-[#048998] text-white">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Platform</th>
                <th>Related Skills</th>
                <th>Cost</th>
                <th>URL</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((res, index) => (
                <tr key={res._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-20 h-12 rounded-md object-cover"
                    />
                  </td>

                  <td className="font-semibold">{res.title}</td>
                  <td>{res.platform}</td>

                  <td className="max-w-[180px]">
                    <div className="flex flex-wrap gap-1">
                      {res.relatedSkills?.map((s, i) => (
                        <span
                          key={i}
                          className="badge badge-outline badge-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>{res.cost}</td>

                  <td>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Visit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
