import {
  useEffect,
  useState,
} from "react";

import axios from "axios";


function HostReservationsPage() {

  const [reservations, setReservations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  useEffect(() => {

    const fetchReservations =
      async () => {

      try {

        const { data } = await axios.get(

          "https://nestaway-88b31453dcd5.herokuapp.com/api/reservations/host",

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
          "Failed to fetch host reservations"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchReservations();

  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


  return (

    <div className="reservations-page container">

      <h1>Host Reservations</h1>


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
                  Guest:
                  {" "}
                  {
                    reservation
                    .user
                    ?.username
                  }
                </p>

                <p>
                  Email:
                  {" "}
                  {
                    reservation
                    .user
                    ?.email
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

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default HostReservationsPage;