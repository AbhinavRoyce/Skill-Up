import React from "react";
import JobCard from "./JobCard.jsx";

export default function JobList({ jobs, selectedJob, onSelect }) {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          selected={selectedJob && selectedJob.id === job.id}
          onSelect={onSelect}
        />
      ))}
      {jobs.length === 0 && (
        <p className="text-sm text-gray-400">No jobs found. Try another search.</p>
      )}
    </div>
  );
}
