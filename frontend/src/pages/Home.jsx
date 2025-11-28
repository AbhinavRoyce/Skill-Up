import React, { useState, useEffect } from "react";
import { api } from "../api.js";
import Filters from "../components/Filters.jsx";
import JobList from "../components/JobList.jsx";
import JobDetail from "../components/JobDetail.jsx";

export default function Home({ user }) {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ sortBy: "recent", location: "" });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs", { params: { search: query, limit: 21 } });
      let data = res.data;

      if (filters.location) {
        const locLower = filters.location.toLowerCase();
        data = data.filter((j) => (j.location || "").toLowerCase().includes(locLower));
      }

      if (filters.sortBy === "salary") {
        // naive sort string-wise
        data = [...data].sort((a, b) => (a.salary || "").localeCompare(b.salary || ""));
      } else if (filters.sortBy === "title") {
        data = [...data].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        data = [...data].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      }

      setJobs(data);
      setSelectedJob(data[0] || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="px-8 py-6 flex flex-col gap-4">
      {/* Search bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center flex-1 max-w-xl bg-white rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search jobs"
            className="flex-1 outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchJobs}
            className="px-4 py-1 rounded-full bg-indigo-600 text-white text-sm"
          >
            Search
          </button>
        </div>
        <p className="ml-4 text-xs text-gray-500 hidden md:block">
          {jobs.length} Results Found
        </p>
      </div>

      {/* Main layout */}
      <div className="flex">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex-1 flex gap-4">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Loading jobs…
            </div>
          ) : (
            <>
              <JobList jobs={jobs} selectedJob={selectedJob} onSelect={setSelectedJob} />
              <JobDetail job={selectedJob} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
