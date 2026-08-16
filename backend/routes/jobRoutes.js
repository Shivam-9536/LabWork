const express = require("express");

const {
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
} = require("../controllers/jobController");

const workerAuth = require("../middleware/workerAuth");

const router = express.Router();


// ==========================================
// CUSTOMER CREATES JOB
// ==========================================

router.post(
  "/",
  createJob
);


// ==========================================
// CUSTOMER GETS AVAILABLE WORKERS
// ==========================================

router.get(
  "/workers",
  getAvailableWorkers
);


// ==========================================
// WORKER GETS MATCHING JOBS
// ==========================================

router.get(
  "/available",
  workerAuth,
  getAvailableJobs
);


// ==========================================
// WORKER GETS HIS CUSTOMER REQUESTS
// ==========================================

router.get(
  "/my-requests",
  workerAuth,
  getWorkerRequests
);


// ==========================================
// WORKER GETS ACTIVE JOBS
// ==========================================

router.get(
  "/my-jobs",
  workerAuth,
  getMyJobs
);
// ==========================================
// CUSTOMER SUBMITS REVIEW
// ==========================================

router.post(
  "/:id/review",
  submitReview
);

// ==========================================
// GET SINGLE JOB
// ==========================================

router.get(
  "/:id",
  getJobById
);


// ==========================================
// CUSTOMER REQUESTS WORKER
// ==========================================

router.put(
  "/:id/request-worker",
  requestWorker
);


// ==========================================
// WORKER ACCEPTS JOB
// ==========================================

router.put(
  "/:id/accept",
  workerAuth,
  acceptJob
);

// ==========================================
// WORKER DECLINES JOB
// ==========================================

router.put(
  "/:id/decline",
  workerAuth,
  declineJob
);

// ==========================================
// WORKER UPDATES JOB STATUS
// ==========================================

router.put(
  "/:id/status",
  workerAuth,
  updateJobStatus
);



module.exports = router;