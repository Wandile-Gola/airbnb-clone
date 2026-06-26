import { useEffect, useState,} from "react";

import axios from "axios";

import { useParams, useNavigate, } from "react-router-dom";


function ListingDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [showGallery, setShowGallery] =
  useState(false);

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [listing, setListing] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState(1);

  const [reviews, setReviews] =
   useState([]);

  const [rating, setRating] =
   useState(5);

  const [comment, setComment] =
   useState("");


  useEffect(() => {

    const fetchListing = async () => {

      try {

        const { data } = await axios.get(
          `https://nestaway-88b31453dcd5.herokuapp.com/api/accommodations/${id}`
        );

        setListing(data);

      } catch (error) {
        console.error(error);
        setError("Failed to load listing");

      } finally {
        setLoading(false);
      }
    };

    fetchListing();
    fetchReviews();

  }, [id]);

  const fetchReviews = async () => {

    const { data } = await axios.get(
      `https://nestaway-88b31453dcd5.herokuapp.com/api/reviews/accommodation/${id}`
    );

    setReviews(data);
  };

  const reservationHandler = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo) {
        return alert(
          "Please login first"
        );
      }

      await axios.post(

        "https://nestaway-88b31453dcd5.herokuapp.com/api/reservations",

        {
          accommodation: listing._id,
          checkIn,
          checkOut,
          guests,
        },

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      navigate("/reservations");

    } catch (error) {
        console.error(error);
        alert("Reservation failed");
    }
  };

  const reviewHandler = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo) {
        return alert(
          "Please login first"
        );
      }

      await axios.post(
        "https://nestaway-88b31453dcd5.herokuapp.com/api/reviews",
        {
          accommodation: listing._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Review submitted!");

      setComment("");

      fetchReviews();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to submit review"
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (
            new Date(checkOut) -
            new Date(checkIn)
          ) /
          (1000 * 60 * 60 * 24)
        )
      : 0;
      const invalidDates = nights <= 0;

      const totalPrice =
        !invalidDates
          ? nights * listing.price
          : 0;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : null;
  return (

    <div className="details-page container">

      <h1>{listing.title}</h1>

      <div className="listing-meta">

        {averageRating && (
          <span>
            ⭐ {averageRating}
            {" · "}
            {reviews.length} review
            {reviews.length !== 1
              ? "s"
              : ""}
          </span>
        )}

      </div>

      <p>{listing.location}</p>


      {/* IMAGE */}

      <div className="airbnb-gallery">

        {listing.images?.slice(0, 3).map(
          (image, index) => (

            <div
              key={index}
              className="gallery-item"
            >

              <img
                src={image}
                alt={`${listing.title}-${index}`}
                onClick={() => {
                  setSelectedImage(index);
                  setShowGallery(true);
                }}
              />

              {index === 2 && (

                <button
                  className="show-photos-btn"
                  onClick={() =>
                    setShowGallery(true)
                  }
                >
                  Show all photos
                </button>

              )}

            </div>

          )
        )}

      </div>

      <div className="property-highlights">

        <div>👥 {listing.guests} Guests</div>

        <div>🛏 {listing.bedrooms} Bedrooms</div>

        <div>🚿 {listing.bathrooms} Bathrooms</div>

        <div>🏠 {listing.type}</div>

      </div>
      
      <hr />
      
      <div className="host-section">

        <h3>
         👤 Hosted by {listing.host?.username}
        </h3>

      </div>
      
      <hr />


      {/* CONTENT */}

      <div className="details-content">

        {/* LEFT */}

        <div className="details-left">

          <h2>{listing.type}</h2>

          <hr />

          <h3>Description</h3>

          <p>{listing.description}</p>

          <h3>Amenities</h3>

          <div className="amenities">

            {listing.amenities?.map(
              (amenity, index) => (
                <div key={index}>
                  ✅ {amenity}
                </div>
              )
            )}

          </div>

        </div>


        {/* RIGHT */}

        <div className="reservation-box">

          <h2>
            R {listing.price}
            <span>/night</span>
          </h2>


          <label>Check In</label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              setCheckIn(e.target.value)
            }
          />


          <label>Check Out</label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) =>
              setCheckOut(e.target.value)
            }
          />

          {invalidDates && 
            checkIn &&
            checkOut && (
              <p className="date-error">
                Check-out date must be after check-in date.
              </p>
            )}

          <label>Guests</label>

          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) =>
              setGuests(e.target.value)
            }
          />

          { !invalidDates && nights > 0 && (

            <div className="booking-summary">

              <p>
                R {listing.price} × {nights} night(s)
              </p>

              <h3>
                Total: R {totalPrice}
              </h3>

            </div>

          )}

          <button
            onClick={reservationHandler}
            disabled={invalidDates || nights <= 0}
          >
            Reserve
          </button>

        </div>

            </div>

      <hr />

      <h2>Reviews</h2>

      {localStorage.getItem("userInfo") && (

        <div className="review-form">

          <div className="star-rating">

            {[1, 2, 3, 4, 5].map((star) => (

              <span
                key={star}
                className={
                  star <= rating
                    ? "star active"
                    : "star"
                }
                onClick={() =>
                  setRating(star)
                }
              >
                ★
              </span>

            ))}

          </div>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button
            onClick={reviewHandler}
          >
            Submit Review
          </button>

        </div>

      )}

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="review-card"
          >
            <h4>
              {review.user?.username}
            </h4>

            <div className="review-rating">
              {"★".repeat(review.rating)}
            </div>

            <p>
              {review.comment}
            </p>
          </div>
        ))
      )}

      {showGallery && (

        <div
          className="gallery-modal"
          onClick={() =>
            setShowGallery(false)
          }
        >

          <button
            className="close-gallery"
            onClick={() =>
              setShowGallery(false)
            }
          >
            ✕
          </button>

          <button
            className="gallery-nav prev"
            onClick={(e) => {

              e.stopPropagation();

              setSelectedImage(
                (prev) =>
                  prev === 0
                    ? listing.images.length - 1
                    : prev - 1
              );
            }}
          >
            ❮
          </button>

          <img
            className="gallery-image"
            src={
              listing.images[selectedImage]
            }
            alt="Gallery"
            onClick={(e) =>
              e.stopPropagation()
            }
          />

          <button
            className="gallery-nav next"
            onClick={(e) => {

              e.stopPropagation();

              setSelectedImage(
                (prev) =>
                  prev ===
                  listing.images.length - 1
                    ? 0
                    : prev + 1
              );
            }}
          >
            ❯
          </button>

        </div>

      )}

    </div>
  );
}

export default ListingDetailsPage;