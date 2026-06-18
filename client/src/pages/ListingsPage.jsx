import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import ListingCard from "../components/ListingCard";

function ListingsPage() {

  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("type") || "All";

  const searchFromUrl =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(searchFromUrl);


  const [selectedType, setSelectedType] =
    useState(categoryFromUrl);

  const navigate = useNavigate();

  const categories = [
    { name: "All", icon: "🏠" },
    { name: "Beach", icon: "🏝️" },
    { name: "Cabin", icon: "🏡" },
    { name: "Apartment", icon: "🏢" },
    { name: "Student Housing", icon: "🎓" },
    { name: "Luxury", icon: "💎" }
  ];

  useEffect(() => {

    setSelectedType(categoryFromUrl);

  }, [categoryFromUrl]);

  useEffect(() => {

    setSearch(searchFromUrl);

  }, [searchFromUrl]);

  useEffect(() => {

    const fetchListings = async () => {

      try {

        const { data } = await axios.get(
          "http://127.0.0.1:5000/api/accommodations"
        );

        setListings(data);

      } catch (error) {
          console.error(error);
          setError(
            "Failed to fetch listings"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchListings();

  }, []);

  const filteredListings =
    listings.filter((listing) => {

      const matchesSearch =

        listing.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        listing.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesType =
        selectedType === "All" ||
        listing.type?.toLowerCase() ===
        selectedType.toLowerCase();

      return (
        matchesSearch &&
        matchesType
      );
    });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (

    <div className="container">
      <div className="listings-page">

        <h1>Explore Stays</h1>

        <div className="search-container">

          <input
            type="text"
            placeholder="Search location or propertiy..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="categories">

          {categories.map((category) => (

            <button
              key={category.name}
              className={`category-btn ${
                selectedType === category.name
                  ? "active"
                  : ""
              }`}
              onClick={() => {

                setSelectedType(category.name);

                if (category.name === "All") {
                  navigate("/listings");
                } else {
                  navigate(
                    `/listings?type=${category.name}`
                  );
                }

              }}
            >
              <span>{category.icon}</span>

              <span>
                {category.name}
              </span>

            </button>

          ))}

        </div>

        <p className="results-count">
          {filteredListings.length} stays found
        </p>

        <div className="listings-grid">

          {filteredListings.length > 0 ? (

            filteredListings.map(
              (listing) => (

                <ListingCard 
                  key={listing._id}
                  listing={listing}
                />

              )
            )

          ) : (

            <p>
              No listings found.
            </p>

          )}

        </div>

      </div>
    </div>

  );
}

export default ListingsPage;