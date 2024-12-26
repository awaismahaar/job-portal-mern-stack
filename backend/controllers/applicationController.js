const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

async function applyJobController(req,res) {
    try {
     const apply = await Application.findOne({job : req.params.id, applicant : req.user.id})   
     if(apply) {
        return res.status(400).json({
            success: false,
            message: "You have already applied for this job",
          });
     }
     const newApply = await Application.create({
        job : req.params.id,
        applicant : req.user.id
     })
     const job = await Job.findById(req.params.id)
     job.applications.push(newApply._id)
     await job.save()
     return res.status(200).json({
        success: true,
        message: "Job applied successfully",
        newApply,
      });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          }); 
    }
}

async function getApplyJobsController(req,res) {
    try {
     const applications = await Application.find({applicant : req.user.id}) 
     .sort({createdAt : -1})
     .populate(
        {
            path : "job",
            options : {sort : {createdAt : -1}},
            populate : {
                path : "companyId",
                options : {sort : {createdAt : -1}},
            }
        }
    )  
     return res.status(200).json({
        success: true,
        message: "Jobs fetched successfully",
        applications,
     })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });  
    }
}

async function getApptoApplyForJobController(req,res) {
    try {
     const apply = await Job.findById(req.params.id).
     populate({
        path : "applications",
        options : {sort : {createdAt : -1}},
        populate : {
            path : "applicant",
        }
     })
     return res.status(200).json({
        success: true,
        message: "Jobs fetched successfully",
        apply,
     })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });     
    }
}

async function updateStatusController(req,res) {
    try {
      const {status} = req.body;  
      if(!status) {
        return res.status(400).json({
            success: false,
            message: "Status is required",
          });  
      }
      const application = await Application.findById(req.params.id);
      if(!application) {
        return res.status(400).json({
            success: false,
            message: "Application not found",
          });
      }
      application.status = status.toLowerCase();
      await application.save();
      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        application,
      });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });     
    }
}
module.exports = {
    applyJobController,
    getApplyJobsController,
    getApptoApplyForJobController,
    updateStatusController
}