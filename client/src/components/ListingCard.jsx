import "./ListingCard.css";

import { Link } from "react-router-dom";

function ListingCard({ listing }) {

  return (

    <Link
      to={`/listings/${listing._id}`}
      className="listing-card"
    >

      <img
        src={
          listing.images?.[0] ||
          "https://via.placeholder.com/300"
        }
        alt={listing.title}
      />

      <div className="listing-card__info">

        <h3>{listing.title}</h3>

        <p>{listing.location}</p>

        <p>{listing.type}</p>

        <h4>R {listing.price} / night</h4>

      </div>

    </Link>
  );
}

export default ListingCard;