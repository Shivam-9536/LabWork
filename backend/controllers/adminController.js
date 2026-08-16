const Worker = require("../models/Worker");


// Get all pending workers

const getPendingWorkers = async (req, res) => {
  try {

    const workers = await Worker.find({
      verificationStatus: "pending"
    }).sort({
      createdAt: -1
    });

    res.status(200).json({
      count: workers.length,
      workers
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch pending workers",
      error: error.message
    });

  }
};


// Approve worker

const approveWorker = async (req, res) => {
  try {

    const { id } = req.params;

    const worker = await Worker.findByIdAndUpdate(
      id,
      {
        verificationStatus: "approved"
      },
      {
        new: true
      }
    );

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    res.status(200).json({
      message: "Worker approved successfully",
      worker
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to approve worker",
      error: error.message
    });

  }
};


// Reject worker

const rejectWorker = async (req, res) => {
  try {

    const { id } = req.params;

    const worker = await Worker.findByIdAndUpdate(
      id,
      {
        verificationStatus: "rejected"
      },
      {
        new: true
      }
    );

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    res.status(200).json({
      message: "Worker rejected",
      worker
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to reject worker",
      error: error.message
    });

  }
};


module.exports = {
  getPendingWorkers,
  approveWorker,
  rejectWorker
};