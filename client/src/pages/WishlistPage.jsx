import { useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "../components/ListingCard";
import "./WishlistPage.css";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (!user) return;

      try {
        const res = await axios.get(
          `https://nestaway-88b31453dcd5.herokuapp.com/api/wishlist/${user._id}`
        );


        setWishlist(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="container">
    <div className="wishlist-page">
      <h2 className="wishlist-title">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h3>No saved listings yet 💔</h3>
          <p>Start exploring and save your favourite places.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <ListingCard
              key={item.listingId}
              listing={{
                _id: item.listingId,
                title: item.title,
                images: [item.image],
                price: item.price,
              }}
            />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default WishlistPage;