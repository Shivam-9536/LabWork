const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true
    },

    service: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    estimatedPrice: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "searching",
        "accepted",
        "in_progress",
        "completed",
        "cancelled"
      ],
      default: "searching"
    },

    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      default: null
    },
    rating: {
  type: Number,
  min: 1,
  max: 5,
  default: null
},

review: {
  type: String,
  trim: true,
  default: ""
}
    
  },
  {
    timestamps: true
  }
  
);

module.exports = mongoose.model("Job", jobSchema);