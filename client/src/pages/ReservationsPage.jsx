import {
  useEffect,
  useState,
} from "react";

import axios from "axios";


function ReservationsPage() {

  const [reservations, setReservations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  const fetchReservations = async () => {

    try {

      const { data } = await axios.get(

        "http://127.0.0.1:5000/api/reservations/user",

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      setReservations(data);

    } catch (error) {

      setError(
        "Failed to fetch reservations"
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchReservations();

  }, []);


  const cancelReservation = async (
    id
  ) => {

    if (
      !window.confirm(
        "Cancel this reservation?"
      )
    ) {
      return;
    }

    try {

      await axios.delete(

        `http://127.0.0.1:5000/api/reservations/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchReservations();

    } catch (error) {

      alert(
        "Failed to cancel reservation"
      );
    }
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


  return (

    <div className="reservations-page container">

      <h1>My Reservations</h1>


      {reservations.length === 0 ? (

        <div className="empty-state">

        <h2>No trips yet</h2>

        <p>
          Start exploring and book your
          first stay.
        </p>

      </div>

      ) : (

        <div className="reservations-grid">

          {reservations.map((reservation) => {

            const nights =
              Math.ceil(
                (
                  new Date(
                    reservation.checkOut
                  ) -
                  new Date(
                    reservation.checkIn
                  )
                ) /
                (1000 * 60 * 60 * 24)
              );

              const totalPrice =
                nights *
                reservation.accommodation?.price;

            return (

            <div
              key={reservation._id}
              className="reservation-card"
            >

              <img
                src={
                  reservation
                    .accommodation
                    ?.images?.[0] ||
                  "https://via.placeholder.com/300"
                }
                alt="Accommodation"
              />


              <div
                className="reservation-info"
              >

                <h2>
                  {
                    reservation
                    .accommodation
                    ?.title
                  }
                </h2>

                <p>
                  {
                    reservation
                    .accommodation
                    ?.location
                  }
                </p>              

                <div className="trip-details">

                  <p>
                    📅 Check In:
                    {" "}
                    {new Date(
                      reservation.checkIn
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    📅 Check Out:
                    {" "}
                    {new Date(
                      reservation.checkOut
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    👥 Guests:
                    {" "}
                    {reservation.guests}
                  </p>

                  <p>
                     🌙 {nights} night
                     {nights > 1 ? "s" : ""}
                  </p>

                  <p>
                    💰 Total:
                    {" "}
                    R {totalPrice}
                  </p>

                </div>


                <button
                  onClick={() =>
                    cancelReservation(
                      reservation._id
                    )
                  }
                >
                  Cancel Reservation
                </button>

              </div>

            </div>

          );
          })}

        </div>

      )}

    </div>
  );
}

export default ReservationsPage;