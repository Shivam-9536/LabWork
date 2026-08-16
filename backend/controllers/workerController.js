const Worker = require("../models/Worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==========================================
// REGISTER WORKER
// ==========================================

const registerWorker = async (req, res) => {
  try {

    const {
      name,
      phone,
      email,
      age,
      password,
      skills,
      experience,
      location,
      availability
    } = req.body;


    // Required fields

    if (
      !name ||
      !phone ||
      !password ||
      !skills ||
      !skills.length ||
      !experience ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    // EMAIL VALIDATION

if (!email) {
  return res.status(400).json({
    message: "Email is required"
  });
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Please enter a valid email address"
  });
}


    // Check existing worker

    const existingWorker = await Worker.findOne({
      phone
    });

    if (existingWorker) {
      return res.status(400).json({
        message: "Worker with this phone number already exists"
      });
    }


    // Hash password

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Create worker

    const worker = await Worker.create({

      name,
      phone,
      email,
      age,

      password: hashedPassword,

      skills,
      experience,
      location,

      availability:
        availability || "available"

    });


    // Response

    res.status(201).json({

      message: "Worker registered successfully",

      worker: {

        id: worker._id,

        name: worker.name,

        phone: worker.phone,

        email: worker.email,

        skills: worker.skills,

        experience: worker.experience,

        location: worker.location,

        availability: worker.availability,

        verificationStatus:
          worker.verificationStatus

      }

    });

  } catch (error) {

    console.error(
      "Worker registration error:",
      error
    );

    res.status(500).json({

      message: "Server error",

      error: error.message

    });

  }
};



// ==========================================
// LOGIN WORKER
// ==========================================

const loginWorker = async (req, res) => {

  try {

    const {
      phone,
      password
    } = req.body;


    // Check fields

    if (!phone || !password) {

      return res.status(400).json({

        message:
          "Phone and password are required"

      });

    }


    // Find worker

    const worker = await Worker.findOne({
      phone
    });


    if (!worker) {

      return res.status(404).json({

        message:
          "Worker not found"

      });

    }


    // Check approval

    if (
      worker.verificationStatus !==
      "approved"
    ) {

      return res.status(403).json({

        message:
          "Your account is not approved yet"

      });

    }


    // Compare password

    const passwordMatch =
      await bcrypt.compare(
        password,
        worker.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        message:
          "Invalid phone or password"

      });

    }


    // Create JWT

    const token = jwt.sign(

      {
        id: worker._id,
        role: "worker"
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // Successful login

    res.status(200).json({

      message: "Login successful",

      token,

      worker: {

        id: worker._id,

        name: worker.name,

        phone: worker.phone,

        skills: worker.skills,

        location: worker.location,

        availability:
          worker.availability,

        verificationStatus:
          worker.verificationStatus

      }

    });

  } catch (error) {

    console.error(
      "Worker login error:",
      error
    );

    res.status(500).json({

      message: "Login failed",

      error: error.message

    });

  }

};

// ==========================================
// GET WORKER STATISTICS
// ==========================================

const getWorkerStats = async (req, res) => {
  try {

    const workerId = req.worker.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }


    // Import Job model
    const Job = require("../models/Job");


    // Get all jobs assigned to this worker
    const jobs = await Job.find({
      workerId: workerId
    });


    // Total jobs
    const totalJobs = jobs.length;


    // Completed jobs
    const completedJobs = jobs.filter(
      (job) =>
        job.status === "completed"
    ).length;


    // In-progress jobs
    const activeJobs = jobs.filter(
      (job) =>
        job.status === "accepted" ||
        job.status === "in_progress"
    ).length;


    // ==========================================
// CURRENT MONTH EARNINGS
// ==========================================

const now = new Date();

const startOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
);

const nextMonth = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  1
);


const monthlyJobs = jobs.filter((job) => {

  return (
    job.status === "completed" &&
    job.createdAt >= startOfMonth &&
    job.createdAt < nextMonth
  );

});


const earnings = monthlyJobs.reduce(
  (total, job) =>
    total +
    (job.estimatedPrice || 0),
  0
);


    // Ratings
    const reviewedJobs = jobs.filter(
      (job) =>
        job.rating
    );


    const rating =
      reviewedJobs.length > 0
        ? (
            reviewedJobs.reduce(
              (total, job) =>
                total + job.rating,
              0
            ) /
            reviewedJobs.length
          ).toFixed(1)
        : "0.0";


    // Success rate
    const successRate =
      totalJobs > 0
        ? Math.round(
            (completedJobs /
              totalJobs) *
              100
          )
        : 0;


    res.status(200).json({

      totalJobs,

      completedJobs,

      activeJobs,

      earnings,

      rating: Number(rating),

      successRate

    });


  } catch (error) {

    console.error(
      "Worker stats error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to get worker statistics",

      error: error.message

    });

  }
};


// ==========================================
// GET WORKER COMPLETED JOBS
// ==========================================

const getCompletedJobs = async (req, res) => {
  try {

    const workerId = req.worker.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker authentication required"
      });
    }

    const Job = require("../models/Job");

    const jobs = await Job.find({
      workerId: workerId,
      status: "completed"
    })
      .sort({
        updatedAt: -1
      })
      .select(
        "customerName customerPhone service description location estimatedPrice rating review createdAt updatedAt"
      );


    res.status(200).json({
      count: jobs.length,
      jobs
    });


  } catch (error) {

    console.error(
      "Get completed jobs error:",
      error
    );

    res.status(500).json({
      message: "Failed to get completed jobs",
      error: error.message
    });

  }
};

module.exports = {
  registerWorker,
  loginWorker,
  getWorkerStats,
  getCompletedJobs
};