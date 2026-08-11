const express = require("express");

const {
  registerWorker
} = require("../controllers/workerController");

const router = express.Router();

router.post("/register", registerWorker);

module.exports = router;