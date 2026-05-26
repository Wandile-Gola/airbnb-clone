const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "host", "admin"], default: "user" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;