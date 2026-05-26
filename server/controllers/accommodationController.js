const Accommodation = require("../models/Accommodation");

const createAccommodation = async (req, res) => {
    const {
        title,
        location,
        description,
        bedrooms,
        bathrooms,
        guests,
        type,
        price,
        amenities,
        images,
        weeklyDiscount,
        cleaningFee,
        serviceFee,
        occupancyTaxes,
    }  = req.body;

    const accommodation = await Accommodation.create({
        title,
        location,
        descrition,
        bedrooms,
        bathrooms,
        guests,
        type,
        price,
        amenities,
        images,
        weeklydiscount,
        cleaningFee,
        serviceFee,
        occupancyTaxes,
        host: req.user.username,
        host_id: req.user_id,
    });

    res.status(201).json(accommodation);
};

const getAccommodations = async (req, res) => {
    const accommodations = await Accommodation.find();
    res.status(200).json(accommodations);
}

module.exports = { createAccommodation, getAccommodations, };