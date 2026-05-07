const express = require("express");
const router  = express.Router();
const auth    = require("../middleware/authMiddleware");
const admin   = require("../middleware/adminMiddleware");

const {
  getAdmitCards,
  addAdmitCard,
  deleteAdmitCard,
  getResults,
  addResult,
  deleteResult,
} = require("../controllers/admitCardController");

// ── Public routes ─────────────────────────────────────────────────────────────
router.get("/admit-cards", getAdmitCards);
router.get("/results",     getResults);

// ── Admin routes ──────────────────────────────────────────────────────────────
router.post("/admit-cards/add",    auth, admin, addAdmitCard);
router.delete("/admit-cards/:id",  auth, admin, deleteAdmitCard);
router.post("/results/add",        auth, admin, addResult);
router.delete("/results/:id",      auth, admin, deleteResult);

module.exports = router;