const express = require("express");

const router = express.Router();

const { createAccommodation, getAccomodations } = require("../controllers/accommodationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createAccommodation);
router.get("/", protect, getAccommodations);

module.export = router;