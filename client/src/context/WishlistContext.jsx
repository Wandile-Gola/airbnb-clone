import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };
  const toggleWishlist = async (listing) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));


    if (!user) {
      showMessage("Please login first");
      return;
    }

    const exists = wishlist.find(
      (item) => item.listingId === listing._id
    );

    try {
      if (exists) {
        const res = await axios.delete(
          "http://localhost:5000/api/wishlist/remove",
          {
            data: {
              userId: user._id,
              listingId: listing._id,
            },
          }
        );

        setWishlist(res.data);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/wishlist/add",
          {
            userId: user._id,
            listing: {
              listingId: listing._id,
              title: listing.title,
              image: listing.images?.[0],
              price: listing.price,
            },
          }
        );

        setWishlist(res.data);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (!user) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/wishlist/${user._id}`
        );

        setWishlist(res.data);
      } catch (error) {
        console.error("Fetch wishlist error:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        message,
        showMessage,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);