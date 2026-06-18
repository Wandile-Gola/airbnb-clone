const Review =
  require("../models/reviewModel");

  const Accommodation =
    require("../models/Accommodation");

const createReview =
  async (req, res) => {

    const {
      accommodation,
      rating,
      comment,
    } = req.body;

    const review =
      await Review.create({
        user: req.user._id,
        accommodation,
        rating,
        comment,
      });

    const reviews =
      await Review.find({
        accommodation,
      });

    const averageRating =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      ) / reviews.length;

    await Accommodation.findByIdAndUpdate(
      accommodation,
      {
        averageRating:
          Number(
            averageRating.toFixed(1)
          ),

        numReviews:
          reviews.length,
      }
    );

    res.status(201).json(review);
  };


const getReviewsByAccommodation =
  async (req, res) => {

    const reviews =
      await Review.find({
        accommodation:
          req.params.id,
      }).populate(
        "user",
        "username"
      );

    res.json(reviews);
  };

module.exports = {
  createReview,
  getReviewsByAccommodation,
};