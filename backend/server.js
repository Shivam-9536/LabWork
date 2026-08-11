const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const workerRoutes = require("./routes/workerRoutes");

const app = express();


// MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/workers", workerRoutes);


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