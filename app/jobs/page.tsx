"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchJobs = () => {
    fetch(`/api/jobs?search=${search}&page=${page}`)
      .then((res) => res.json())
      .then((data) => setJobs(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const delay = setTimeout(fetchJobs, 400);
    return () => clearTimeout(delay);
  }, [search, page]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6">
    

      {/* 🔍 Search */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* 📋 Job Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-xl hover:-translate-y-1"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>

            <p className="text-gray-600 mt-1">{job.company}</p>

            <p className="text-gray-500 text-sm">📍 {job.location}</p>

            <p className="text-blue-600 font-semibold mt-2">
              {job.salary}
            </p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-full border disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}