const Worker = require("../models/Worker");

const registerWorker = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      age,
      skills,
      experience,
      location,
      availability
    } = req.body;

    // Check required fields
    if (
      !name ||
      !phone ||
      !skills ||
      !experience ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    // Check existing worker
    const existingWorker = await Worker.findOne({ phone });

    if (existingWorker) {
      return res.status(400).json({
        message: "Worker with this phone number already exists"
      });
    }

    // Create worker
    const worker = await Worker.create({
      name,
      phone,
      email,
      age,
      skills,
      experience,
      location,
      availability
    });

    res.status(201).json({
      message: "Worker registered successfully",
      worker
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  registerWorker
};