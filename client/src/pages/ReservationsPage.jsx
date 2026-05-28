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

    <div className="reservations-page">

      <h1>My Reservations</h1>


      {reservations.length === 0 ? (

        <p>No reservations found.</p>

      ) : (

        <div className="reservations-grid">

          {reservations.map(
            (reservation) => (

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

                <p>
                  Check In:
                  {" "}
                  {reservation.checkIn}
                </p>

                <p>
                  Check Out:
                  {" "}
                  {reservation.checkOut}
                </p>

                <p>
                  Guests:
                  {" "}
                  {reservation.guests}
                </p>


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

          ))}

        </div>

      )}

    </div>
  );
}

export default ReservationsPage;