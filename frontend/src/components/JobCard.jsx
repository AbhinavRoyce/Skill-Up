import React from "react";

export default function JobCard({ job, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(job)}
      className={`border rounded-2xl p-4 bg-white cursor-pointer hover:shadow-md transition ${
        selected ? "border-indigo-500 ring-1 ring-indigo-200" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between mb-2">
        <div>
          <h3 className="font-semibold text-sm">{job.title}</h3>
          <p className="text-xs text-gray-500">{job.company}</p>
          <p className="text-xs text-gray-400">{job.location}</p>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(job.publishedAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
        {job.type && (
          <span className="px-2 py-1 rounded-full bg-gray-100">{job.type}</span>
        )}
        <span className="px-2 py-1 rounded-full bg-gray-100">
          {job.salary || "Salary: N/A"}
        </span>
      </div>
    </div>
  );
}
