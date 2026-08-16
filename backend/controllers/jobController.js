const Job = require("../models/Job");
const Worker = require("../models/Worker");


// ==========================================
// CREATE CUSTOMER JOB
// ==========================================

const createJob = async (req, res) => {
  try {

    const {
      customerName,
      customerPhone,
      service,
      description,
      location,
      estimatedPrice
    } = req.body;


    // Required fields

    if (
      !customerName ||
      !customerPhone ||
      !service ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }


    // Create job

    const job = await Job.create({

      customerName,

      customerPhone,

      service,

      description,

      location,

      estimatedPrice,

      status: "searching"

    });


    res.status(201).json({

      message:
        "Job request created successfully",

      job

    });


  } catch (error) {

    console.error(
      "Create job error:",
      error
    );

    res.status(500).json({

      message: "Failed to create job",

      error: error.message

    });

  }
};



// ==========================================
// GET MATCHING JOBS FOR WORKER
// ==========================================

const getAvailableJobs = async (req, res) => {
  try {

    const worker = req.worker;


    if (!worker) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }


    // Worker's skills

    const workerSkills =
      worker.skills || [];


    if (!workerSkills.length) {

      return res.status(200).json({

        count: 0,

        jobs: []

      });

    }


    // Find only matching jobs

    const jobs = await Job.find({

      status: "searching",

      service: {
        $in: workerSkills
      }

    }).sort({

      createdAt: -1

    });


    res.status(200).json({

      count: jobs.length,

      jobs

    });


  } catch (error) {

    console.error(
      "Get available jobs error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to get available jobs",

      error: error.message

    });

  }
};




// ==========================================
// GET AVAILABLE WORKERS FOR CUSTOMER
// ==========================================

const getAvailableWorkers = async (req, res) => {
  try {

    const { service } = req.query;


    if (!service) {
      return res.status(400).json({
        message: "Service is required"
      });
    }


    const workers = await Worker.find({

      verificationStatus: "approved",

      availability: "available",

      skills: service

    }).select(
      "name phone skills experience location availability verificationStatus"
    );


    res.status(200).json({

      count: workers.length,

      workers

    });


  } catch (error) {

    console.error(
      "Get available workers error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to get available workers",

      error: error.message

    });

  }
};





// ==========================================
// CUSTOMER REQUESTS A WORKER
// ==========================================

const requestWorker = async (req, res) => {
  try {

    const {
      workerId
    } = req.body;


    if (!workerId) {
      return res.status(400).json({
        message: "Worker ID is required"
      });
    }


    const job =
      await Job.findById(
        req.params.id
      );


    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }


    // Job should still be searching

    if (job.status !== "searching") {

      return res.status(400).json({

        message:
          "This job is no longer available"

      });

    }


    // Find selected worker

    const worker =
      await Worker.findById(
        workerId
      );


    if (!worker) {

      return res.status(404).json({

        message:
          "Worker not found"

      });

    }


    // Worker must be approved

    if (
      worker.verificationStatus !==
      "approved"
    ) {

      return res.status(400).json({

        message:
          "Worker is not approved"

      });

    }


    // Worker must be available

    if (
      worker.availability !==
      "available"
    ) {

      return res.status(400).json({

        message:
          "Worker is currently unavailable"

      });

    }


    // Worker must have matching skill

    if (
      !worker.skills.includes(
        job.service
      )
    ) {

      return res.status(400).json({

        message:
          "Worker does not provide this service"

      });

    }


    // Assign worker to job

    job.workerId =
      worker._id;


    // IMPORTANT:
    // Worker has been requested,
    // but has not accepted yet.

    job.status =
      "searching";


    await job.save();


    const updatedJob =
      await Job.findById(
        job._id
      ).populate(
        "workerId",
        "name phone skills experience location availability verificationStatus"
      );


    res.status(200).json({

      message:
        "Worker requested successfully",

      job: updatedJob

    });


  } catch (error) {

    console.error(
      "Request worker error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to request worker",

      error: error.message

    });

  }
};


// ==========================================
// WORKER ACCEPTS JOB
// ==========================================

const acceptJob = async (req, res) => {
  try {

    const workerId = req.worker.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }


    const job = await Job.findById(
      req.params.id
    );


    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }


    // Job must be waiting for worker

    if (job.status !== "searching") {
      return res.status(400).json({
        message: "This job is no longer available"
      });
    }


    // Make sure this request belongs
    // to this worker

    if (
      !job.workerId ||
      job.workerId.toString() !==
        workerId.toString()
    ) {
      return res.status(403).json({
        message:
          "This job was not requested from you"
      });
    }


    // Accept job

    job.status = "accepted";

    await job.save();


    const updatedJob =
      await Job.findById(
        job._id
      ).populate(
        "workerId",
        "name phone skills location experience"
      );


    res.status(200).json({

      message:
        "Job accepted successfully",

      job: updatedJob

    });


  } catch (error) {

    console.error(
      "Accept job error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to accept job",

      error: error.message

    });

  }
};



// ==========================================
// WORKER DECLINES JOB
// ==========================================

const declineJob = async (req, res) => {
  try {

    const workerId = req.worker.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }


    const job = await Job.findById(
      req.params.id
    );


    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }


    // Make sure this job belongs
    // to this worker

    if (
      !job.workerId ||
      job.workerId.toString() !==
        workerId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not assigned to this job"
      });
    }


    // Only searching jobs can be declined

    if (job.status !== "searching") {
      return res.status(400).json({
        message:
          "This job cannot be declined now"
      });
    }


    // Remove worker assignment

    job.workerId = null;

    // Make job available again

    job.status = "searching";


    await job.save();


    res.status(200).json({

      message:
        "Job declined successfully",

      job

    });


  } catch (error) {

    console.error(
      "Decline job error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to decline job",

      error: error.message

    });

  }
};


// ==========================================
// GET SINGLE JOB DETAILS
// ==========================================

const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(
      req.params.id
    ).populate(
      "workerId",
      "name phone skills location experience"
    );


    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }


    res.status(200).json({
      job
    });


  } catch (error) {

    console.error(
      "Get job error:",
      error
    );

    res.status(500).json({
      message: "Failed to get job",
      error: error.message
    });

  }
};


// ==========================================
// UPDATE JOB STATUS
// ==========================================

const updateJobStatus = async (req, res) => {
  try {

    const worker = req.worker;

    if (!worker) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }


    const { status } = req.body;


    const allowedStatuses = [
      "in_progress",
      "completed"
    ];


    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid job status"
      });
    }


    const job = await Job.findById(
      req.params.id
    );


    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }


    // Make sure this worker owns the job

    if (
      !job.workerId ||
      job.workerId.toString() !==
        worker.id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not assigned to this job"
      });
    }


    // Proper status flow

    if (
      status === "in_progress" &&
      job.status !== "accepted"
    ) {
      return res.status(400).json({
        message:
          "Job must be accepted before starting"
      });
    }


    if (
      status === "completed" &&
      job.status !== "in_progress"
    ) {
      return res.status(400).json({
        message:
          "Job must be in progress before completing"
      });
    }


    job.status = status;

    await job.save();


    const updatedJob =
      await Job.findById(
        job._id
      ).populate(
        "workerId",
        "name phone skills location experience"
      );


    res.status(200).json({

      message:
        status === "in_progress"
          ? "Job started successfully"
          : "Job completed successfully",

      job: updatedJob

    });


  } catch (error) {

    console.error(
      "Update job status error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update job status",
      error: error.message
    });

  }
};


// ==========================================
// GET REQUESTS FOR LOGGED-IN WORKER
// ==========================================

const getWorkerRequests = async (req, res) => {
  try {

    const workerId = req.worker.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker ID not found"
      });
    }


    const jobs = await Job.find({
      workerId: workerId,
      status: "searching"
    }).sort({
      createdAt: -1
    });


    res.status(200).json({
      count: jobs.length,
      jobs
    });


  } catch (error) {

    console.error(
      "Get worker requests error:",
      error
    );

    res.status(500).json({
      message: "Failed to get worker requests",
      error: error.message
    });

  }
};


// ==========================================
// GET WORKER ACTIVE JOBS
// ==========================================

const getMyJobs = async (req, res) => {
  try {

    const workerId = req.worker.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }

    const jobs = await Job.find({
      workerId: workerId,
      status: {
        $in: ["accepted", "in_progress"]
      }
    }).sort({
      updatedAt: -1
    });

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {

    console.error(
      "Get worker active jobs error:",
      error
    );

    res.status(500).json({
      message: "Failed to get active jobs",
      error: error.message
    });

  }
};
// ==========================================
// CUSTOMER SUBMITS REVIEW
// ==========================================

const submitReview = async (req, res) => {
  try {

    const { rating, review } = req.body;

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }


    // Only completed jobs can be reviewed

    if (job.status !== "completed") {
      return res.status(400).json({
        message:
          "Review can only be submitted after job completion"
      });
    }


    // Validate rating

    if (
      !rating ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message:
          "Please provide a rating between 1 and 5"
      });
    }


    // Prevent duplicate review

    if (job.rating) {
      return res.status(400).json({
        message:
          "This job has already been reviewed"
      });
    }


    job.rating = rating;

    job.review = review || "";


    await job.save();


    res.status(200).json({

      message:
        "Review submitted successfully",

      rating: job.rating,

      review: job.review

    });


  } catch (error) {

    console.error(
      "Submit review error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to submit review",
      error: error.message
    });

  }
};

module.exports = {
  createJob,
  getAvailableJobs,
  getAvailableWorkers,
  getWorkerRequests,
  requestWorker,
  getMyJobs,
  acceptJob,
  declineJob,
  submitReview,
  getJobById,
  updateJobStatus
};