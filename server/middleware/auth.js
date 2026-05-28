const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    // CHECK IF TOKEN EXISTS IN HEADERS
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET USER FROM TOKEN (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = { protect };