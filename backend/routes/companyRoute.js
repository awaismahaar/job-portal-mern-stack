const express = require("express");
const {
  createCompanyController,
  getCompaniesController,
  getCompanyByIdController,
  updateCompanyController,
} = require("../controllers/companyController");
const loginCheck = require("../middlewares/authMiddleware");
const singleUpload = require("../middlewares/multer")
const router = express.Router();

// create company
router.post("/create-company", loginCheck, createCompanyController);
// get companies
router.get("/get-companies", loginCheck, getCompaniesController);
// get company by id
router.get("/get-company/:id", loginCheck, getCompanyByIdController);
// update company
router.put("/update-company/:id", singleUpload, loginCheck , updateCompanyController);

module.exports = router;
