const express = require("express");
const workerAuth = require("../middleware/workerAuth");

const {
  registerWorker,
  loginWorker,
  getWorkerStats,
  getCompletedJobs
} = require("../controllers/workerController");

const router = express.Router();


// Worker registration

router.post(
  "/register",
  registerWorker
);


// Worker login

router.post(
  "/login",
  loginWorker
);

// Worker statistics

router.get(
  "/stats",
  workerAuth,
  getWorkerStats
);

router.get(
  "/completed-jobs",
  workerAuth,
  getCompletedJobs
);


module.exports = router;