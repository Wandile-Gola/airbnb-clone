const express = require("express");

const {
  createReservation,
  getUserReservations,
  getHostReservations,
  deleteReservation,
} = require("../controllers/reservationController");

const { protect } = require("../middleware/auth");

const router = express.Router();


// CREATE RESERVATION
router.post("/", protect, createReservation);


// GET USER RESERVATIONS
router.get("/user", protect, getUserReservations);


// GET HOST RESERVATIONS
router.get("/host", protect, getHostReservations);


// DELETE RESERVATION
router.delete("/:id", protect, deleteReservation);

module.exports = router;