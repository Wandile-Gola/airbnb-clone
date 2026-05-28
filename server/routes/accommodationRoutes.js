const express = require("express");

const router = express.Router();

const {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
} = require("../controllers/accommodationController");

const { protect } = require("../middleware/auth");


// GET ALL + CREATE
router
  .route("/")
  .get(getAccommodations)
  .post(protect, createAccommodation);


// GET ONE + UPDATE + DELETE
router
  .route("/:id")
  .get(getAccommodationById)
  .put(protect, updateAccommodation)
  .delete(protect, deleteAccommodation);

module.exports = router;