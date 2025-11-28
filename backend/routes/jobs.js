import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// GET /api/jobs?search=designer&location=remote etc.
router.get("/", async (req, res) => {
  const { search = "", limit = 20 } = req.query;

  try {
    const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}`;
    const response = await fetch(url);
    const data = await response.json();

    const jobs = (data.jobs || []).slice(0, Number(limit)).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      salary: job.salary || "Not specified",
      type: job.job_type,
      url: job.url,
      publishedAt: job.publication_date,
      description: job.description
    }));

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

export default router;
