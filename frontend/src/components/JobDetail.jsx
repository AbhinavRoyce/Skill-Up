import React from "react";

export default function JobDetail({ job }) {
  if (!job)
    return (
      <div className="w-80 bg-white rounded-2xl shadow-sm p-4">
        <p className="text-sm text-gray-400">Select a job to view details</p>
      </div>
    );

  return (
    <div className="w-80 bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-sm mb-1">{job.title}</h2>
        <p className="text-xs text-gray-500 mb-1">
          {job.company} • {job.location}
        </p>
        <p className="text-xs text-gray-400 mb-3">Posted: {new Date(job.publishedAt).toLocaleString()}</p>

        <h3 className="text-xs font-semibold text-gray-500 mb-1">Description</h3>
        <div
          className="text-xs text-gray-600 max-h-64 overflow-auto"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>
      <a
        href={job.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 w-full text-center text-sm bg-indigo-600 text-white rounded-xl py-2"
      >
        Apply Now
      </a>
    </div>
  );
}
