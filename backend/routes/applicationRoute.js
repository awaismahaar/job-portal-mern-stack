const express = require("express");
const {
  applyJobController,
  getApplyJobsController,
  getApptoApplyForJobController,
  updateStatusController,
} = require("../controllers/applicationController");
const loginCheck = require("../middlewares/authMiddleware");
const router = express.Router();

// apply for job
router.get("/apply-job/:id", loginCheck, applyJobController);
// get apply jobs
router.get("/get-apply-jobs", loginCheck, getApplyJobsController);
// get applications to apply for job
router.get(
  "/get-applications/:id",
  loginCheck,
  getApptoApplyForJobController
);
// update status
router.post("/update-status/:id", updateStatusController);


module.exports = router;
