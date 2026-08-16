const express = require("express");

const {
  getPendingWorkers,
  approveWorker,
  rejectWorker
} = require("../controllers/adminController");

const router = express.Router();


// Get pending workers

router.get(
  "/workers/pending",
  getPendingWorkers
);


// Approve worker

router.put(
  "/workers/:id/approve",
  approveWorker
);


// Reject worker

router.put(
  "/workers/:id/reject",
  rejectWorker
);


module.exports = router;