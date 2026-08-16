const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    age: {
      type: Number
    },

    password: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      required: true
    },

    experience: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    availability: {
      type: String,
      default: "available"
    },

    verificationStatus: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected"
      ],
      default: "pending"
    }
  },

  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Worker ||
  mongoose.model("Worker", workerSchema);