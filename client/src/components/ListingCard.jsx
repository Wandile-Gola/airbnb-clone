import "./ListingCard.css";

import { useWishlist } from "../context/WishlistContext";

import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  const { wishlist, toggleWishlist } = useWishlist();

  const isSaved = wishlist.some(
    (item) => item.listingId === listing._id
  );
    
  return (

    <Link
      to={`/listings/${listing._id}`}
      className="listing-card"
    >

      <button
        className="wishlist-btn"
        onClick={(e) => {
          e.preventDefault(); 
          toggleWishlist(listing);
        }}
      >
        {isSaved ? "❤️" : "🤍"}
      </button>

      <img
        src={
          listing.image ||
          listing.images?.[0] ||
          "https://via.placeholder.com/600x400"
        }
        alt={listing.title}
      />

      <div className="listing-card__info">

        <div className="listing-card__top">

          <div className="listing-card__location">
            {listing.location}
          </div>

          <div className="listing-card__rating">
            {listing.numReviews > 0
              ? `⭐ ${listing.averageRating} (${listing.numReviews})`
              : "⭐ New"}
          </div>

        </div>

        <div className="listing-card__title">
          {listing.title}
        </div>

        <div className="listing-card__type">
          {listing.type}
        </div>

        <div className="listing-card__price">
          R {listing.price}
          <span> / night</span>
        </div>

      </div>

    </Link>
  );
}

export default ListingCard;