const mongoose = require("mongoose");

const reservationSchema =
  mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      accommodation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accommodation",
        required: true,
      },

      checkIn: {
        type: String,
        required: true,
      },

      checkOut: {
        type: String,
        required: true,
      },

      guests: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Reservation",
  reservationSchema
);