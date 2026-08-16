const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
require("dotenv").config();

const connectDB = require("./config/db");
const workerRoutes = require("./routes/workerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


// MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/workers", workerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);


// Test
app.get("/", (req, res) => {
  res.json({
    message: "LABWORK backend is running 🚀"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LABWORK server running on port ${PORT}`);
});