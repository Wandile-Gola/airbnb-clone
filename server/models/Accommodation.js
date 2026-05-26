const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["apartment", "cabin", "villa", "room"], required: true },
    guests: { type: Number, required: true, min: 1 },
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    weeklyDiscount: { type: Number, default: 0, min: 0, max: 100 },
    cleaningFee: { type: Number, default: 0, min: 0 },
    serviceFee: { type: Number, default: 0, min: 0 },
    occupancyTaxes: { type: Number, default: 0, min: 0 },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
