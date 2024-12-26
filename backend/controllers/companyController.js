const Company = require("../models/companyModel");
const getDataUri = require("../utils/dataUri");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});
async function createCompanyController(req, res) {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Please provide company name",
      });
    }
    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }
    const newCompany = await Company.create({
      name: companyName,
      userId: req.user.id,
    });
    return res.status(200).json({
      success: true,
      message: "Company created successfully",
      company: newCompany,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getCompaniesController(req, res) {
  try {
    const company = await Company.find({ userId: req.user.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "No company found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getCompanyByIdController(req, res) {
  try {
    const company = await Company.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateCompanyController(req, res) {
 
  
  try {
    const { description, location, website } = req.body;
    const file = req.file;
    if (!description || !location || !website) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    const dataUri = getDataUri(file);
    const result = await cloudinary.uploader.upload(dataUri.content);
    const company = await Company.findByIdAndUpdate(req.params.id,
      {description, location, website , logo : result.secure_url, userId : req.user.id },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  createCompanyController,
  getCompaniesController,
  getCompanyByIdController,
  updateCompanyController,
};
