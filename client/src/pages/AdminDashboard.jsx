import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";


function AdminDashboard() {

  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  const fetchListings = async () => {

    try {

      const { data } = await axios.get(
        "http://127.0.0.1:5000/api/accommodations"
      );

      setListings(data);

    } catch (error) {

      setError("Failed to fetch listings");

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchListings();

  }, []);


  const deleteHandler = async (id) => {

    if (
      !window.confirm(
        "Delete this listing?"
      )
    ) {
      return;
    }

    try {

      await axios.delete(
        `http://127.0.0.1:5000/api/accommodations/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchListings();

    } catch (error) {

      alert("Failed to delete listing");
    }
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


  return (

    <div className="dashboard-page container">

      <div className="dashboard-header">

        <h1>Admin Dashboard</h1>

        <Link
          to="/admin/create"
          className="create-btn"
        >
          + Create Listing
        </Link>

      </div>


      <div className="dashboard-grid">

        {listings.map((listing) => (

          <div
            className="dashboard-card"
            key={listing._id}
          >

            <img
              src={
                listing.images?.[0] ||
                "https://via.placeholder.com/300"
              }
              alt={listing.title}
            />

            <div className="dashboard-info">

              <h3>{listing.title}</h3>

              <p>{listing.location}</p>

              <h4>
                R {listing.price}
                <span> / night</span>
              </h4>

            </div>


            <div className="dashboard-actions">

              <Link
                to={`/admin/edit/${listing._id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteHandler(listing._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;