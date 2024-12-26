const express = require("express");
const {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  getAdminJobsController,
  getAllUserJobsController,
  updateJobController,
} = require("../controllers/jobController");
const loginCheck = require("../middlewares/authMiddleware");
const router = express.Router();

// create job
router.post("/create-job", loginCheck, createJobController);
// get all jobs from searching keywords
router.get("/search-jobs", getAllJobsController);
// get job by id
router.get("/get-job/:id", getJobByIdController);
// get all jobs created by admin
router.get("/get-all-jobs", loginCheck, getAdminJobsController);

router.get("/get-jobs", loginCheck, getAllUserJobsController);

router.put("/update-job/:id", loginCheck, updateJobController);
module.exports = router;
