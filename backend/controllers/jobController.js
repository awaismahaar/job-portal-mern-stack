const Job = require("../models/jobModel");

async function createJobController(req,res) {
   try {
    const {title,description,requirements,location,salary,jobType,position,companyId,experience} = req.body;
    if(!title || !description || !requirements || !location || !salary || !jobType || !position || !companyId || !experience){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields",
          });
    }
    const job = await Job.create({
        title,
        description,
        requirements,
        location,
        salary : Number(salary),
        jobType,
        position,
        companyId,
        experience,
        created_by : req.user.id,
    });
    return res.status(200).json({
        success: true,
        message: "Job created successfully",
        job,
      });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
      });
   } 
}

async function getAllJobsController(req,res) {
   try {
    const keyword = req.query.keyword || "";
    const query = {
        $or : [
            {title : {$regex : keyword , $options : "i"}},
            {description : {$regex : keyword , $options : "i"}},
        ]
    }
    const jobs = await Job.find(query)
    .populate({path : "companyId"})
    .sort({createdAt : -1})
    return res.status(200).json({
        success: true,
        message: "Jobs fetched successfully",
        jobs,
    })
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
      });
   } 
}

async function getJobByIdController(req,res) {
    try {
      const job = await Job.findById(req.params.id).populate({
        path : "applications",
      });
      return res.status(200).json({
        success: true,
        message: "Job fetched successfully",
        job,
      })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });   
    }
}

async function getAdminJobsController(req,res) {
   try {
    const jobs = await Job.find({created_by : req.user.id})
    .populate("companyId");
    return res.status(200).json({
        success: true,
        message: "Admin Jobs fetched successfully",
        jobs,
      });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
      });  
   } 
}


async function getAllUserJobsController(req,res) {
  try {
   const jobs = await Job.find()
   .populate("companyId");
   return res.status(200).json({
       success: true,
       message: "Jobs fetched successfully",
       jobs,
     });
  } catch (error) {
   return res.status(500).json({
       success: false,
       message: error.message,
     });  
  } 
}

async function updateJobController(req,res) {
  try {
    await Job.findByIdAndUpdate(req.params.id,
        req.body,
        {new : true}
    )
    return res.status(200).json({
        success: true,
        message: "Job Updated successfully"
      });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
      });  
   } 
}
module.exports = {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    getAdminJobsController,
    getAllUserJobsController,
    updateJobController
}