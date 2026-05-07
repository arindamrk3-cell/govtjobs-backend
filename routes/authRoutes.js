const express = require("express");
const router = express.Router();

const { register, login, savePushToken,getMe,savePreferences } = require("../controllers/authController");
const authMiddleware=require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/save-token",authMiddleware,savePushToken);
router.get("/me", authMiddleware, getMe);
router.post("/preferences", authMiddleware, savePreferences);

module.exports = router;