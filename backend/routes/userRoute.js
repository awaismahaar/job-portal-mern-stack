const express = require("express");
const singleUpload = require("../middlewares/multer")
const {
  registerController,
  loginController,
  logoutController,
  updateProfileController,
} = require("../controllers/userController");
const loginCheck = require("../middlewares/authMiddleware");
const router = express.Router();

// register
router.post("/register", singleUpload, registerController);
// login
router.post("/login", loginController);
// logout
router.get("/logout", logoutController);
// update profile
router.put("/update-profile", loginCheck, singleUpload , updateProfileController);

module.exports = router;
