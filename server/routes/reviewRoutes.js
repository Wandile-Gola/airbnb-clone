const express =
  require("express");

const router =
  express.Router();

const {
  createReview,
  getReviewsByAccommodation,
} = require(
  "../controllers/reviewController"
);

const {
  protect,
} = require(
  "../middleware/auth.js"
);

router.post(
  "/",
  protect,
  createReview
);

router.get(
  "/accommodation/:id",
  getReviewsByAccommodation
);

module.exports = router;
