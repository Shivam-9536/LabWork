const jwt = require("jsonwebtoken");
const Worker = require("../models/worker");

const workerAuth = async (req, res, next) => {
  try {

    // Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token required"
      });
    }


    // Get token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format"
      });
    }


    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Check worker role
    if (decoded.role !== "worker") {
      return res.status(403).json({
        message: "Worker access required"
      });
    }


    // Get worker ID
    const workerId = decoded.id;

    if (!workerId) {
      return res.status(401).json({
        message: "Worker ID not found in token"
      });
    }


    // Get actual worker from MongoDB
    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }


    // Attach worker to request
    req.worker = worker;


    next();

  } catch (error) {

    console.error(
      "Worker authentication error:",
      error
    );

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = workerAuth;