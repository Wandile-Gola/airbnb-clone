import { useEffect, useState } from "react";

import axios from "axios";

import ListingCard from "../components/ListingCard";


function ListingsPage() {

  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

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

    fetchListings();

  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


  return (

    <div className="listings-page">

      <h1>Available Listings</h1>

      <div className="listings-grid">

        {listings.map((listing) => (

          <ListingCard
            key={listing._id}
            listing={listing}
          />

        ))}

      </div>

    </div>
  );
}

export default ListingsPage;