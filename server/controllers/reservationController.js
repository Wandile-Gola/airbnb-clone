const Reservation = require("../models/Reservation");
const Accommodation = require("../models/Accommodation");


// CREATE RESERVATION
const createReservation = async (req, res) => {

  console.log(req.user);

  console.log(req.body);
  
  try {
    const {
      accommodation,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    } = req.body;

    const reservation = await Reservation.create({
      user: req.user._id,
      accommodation,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    res.status(201).json(reservation);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER RESERVATIONS
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user._id,
    }).populate("accommodation");

    res.json(reservations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET HOST RESERVATIONS
const getHostReservations = async (req, res) => {
  try {

    // FIND HOST ACCOMMODATIONS
    const accommodations = await Accommodation.find({
      host: req.user._id,
    });

    const accommodationIds = accommodations.map(
      (item) => item._id
    );

    // FIND RESERVATIONS
    const reservations = await Reservation.find({
      accommodation: { $in: accommodationIds },
    })
      .populate("user", "username email")
      .populate("accommodation");

    res.json(reservations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE RESERVATION
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    // ONLY OWNER CAN DELETE
    if (
      reservation.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await reservation.deleteOne();

    res.json({
      message: "Reservation removed",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getHostReservations,
  deleteReservation,
};