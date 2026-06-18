const Accommodation = require("../models/Accommodation");


// CREATE LISTING
const createAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.create({
      ...req.body,
      host: req.user._id,
    });

    res.status(201).json(accommodation);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL LISTINGS
const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find()
      .populate("host", "username email");

    res.json(accommodations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAccommodationById = async (req, res) => {
  const accommodation =
    await Accommodation.findById(
      req.params.id
    ).populate(
      "host",
      "username email"
    );

  if (accommodation) {
    res.json(accommodation);
  } else {
    res.status(404);
    throw new Error("Accommodation not found");
  }
};

const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    // OPTIONAL: CHECK OWNER
    if (accommodation.host.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedAccommodation =
      await Accommodation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedAccommodation);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        message: "Accommodation not found",
      });
    }

    // OPTIONAL: CHECK OWNER
    if (accommodation.host.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await accommodation.deleteOne();

    res.json({
      message: "Accommodation removed",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
};