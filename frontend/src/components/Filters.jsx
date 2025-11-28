import React from "react";

export default function Filters({ filters, setFilters }) {
  const update = (field, value) => setFilters((f) => ({ ...f, [field]: value }));

  return (
    <aside className="w-64 bg-white rounded-2xl shadow-sm p-4 mr-4 h-fit">
      <h2 className="font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Sort By</p>
        <select
          className="w-full border rounded-lg px-2 py-1 text-sm"
          value={filters.sortBy}
          onChange={(e) => update("sortBy", e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="salary">Top Salary</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Location</p>
        <input
          type="text"
          className="w-full border rounded-lg px-2 py-1 text-sm"
          placeholder="Remote, India..."
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>
    </aside>
  );
}
