import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";


function ListingDetailsPage() {

  const { id } = useParams();

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


  useEffect(() => {

    const fetchListing = async () => {

      try {

        const { data } = await axios.get(
          `http://127.0.0.1:5000/api/accommodations/${id}`
        );

        setListing(data);

      } catch (error) {

        setError("Failed to load listing");

      } finally {

        setLoading(false);
      }
    };

    fetchListing();

  }, [id]);


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

        "http://127.0.0.1:5000/api/reservations",

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

      alert("Reservation successful!");

    } catch (error) {

      alert("Reservation failed");
    }
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


  return (

    <div className="details-page">

      <h1>{listing.title}</h1>

      <p>{listing.location}</p>


      {/* IMAGE */}

      <img
        src={
          listing.images?.[0] ||
          "https://via.placeholder.com/800"
        }
        alt={listing.title}
        className="details-image"
      />


      {/* CONTENT */}

      <div className="details-content">

        {/* LEFT */}

        <div className="details-left">

          <h2>{listing.type}</h2>

          <p>
            {listing.guests} guests ·{" "}
            {listing.bedrooms} bedrooms ·{" "}
            {listing.bathrooms} bathrooms
          </p>

          <hr />

          <h3>Description</h3>

          <p>{listing.description}</p>

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


          <label>Guests</label>

          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) =>
              setGuests(e.target.value)
            }
          />


          <button
            onClick={reservationHandler}
          >
            Reserve
          </button>

        </div>

      </div>

    </div>
  );
}

export default ListingDetailsPage;