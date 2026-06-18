const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET USER WISHLIST
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD TO WISHLIST
router.post("/add", async (req, res) => {
  try {
    const { userId, listing } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const exists = user.wishlist.find(
      (item) => item.listingId === listing.listingId
    );

    if (!exists) {
      user.wishlist.push(listing);
      await user.save();
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REMOVE FROM WISHLIST
router.delete("/remove", async (req, res) => {
  try {
    const { userId, listingId } = req.body;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter(
      (item) => item.listingId !== listingId
    );

    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;