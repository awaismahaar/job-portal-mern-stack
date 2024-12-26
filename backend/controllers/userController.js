const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});
async function registerController(req, res) {
  try {
    const { fullName, email, password, phone, role } = req.body;
    

    if (!fullName || !email || !password || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const file = req.file;
    const dataUri = getDataUri(file);
    const result = await cloudinary.uploader.upload(dataUri.content);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      "profile.profilePhoto" : result.secure_url,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password, role } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist,Please register first",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (role !== user?.role) {
      return res.status(400).json({
        success: false,
        message: "Account not exist for this role",
      });
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userInfo = {
      _id: user?._id,
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
      role: user?.role,
      profile: user?.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: userInfo,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function logoutController(req, res) {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateProfileController(req, res) {
  
  try {
    const { fullName, email, phone, skills, bio } = req.body;
    if (!fullName || !email || !phone || !skills || !bio) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri.content);
    const skillsArray = skills.split(","); // string to array

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        email,
        phone,
        "profile.skills": skillsArray,
        "profile.bio": bio,
        "profile.resume": result?.secure_url,
        "profile.resumeOriginalName": req.file.originalname,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  registerController,
  loginController,
  logoutController,
  updateProfileController,
};
