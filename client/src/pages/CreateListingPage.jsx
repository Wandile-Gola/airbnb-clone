import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";


function CreateListingPage() {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [type, setType] = useState("");

  const [image, setImage] = useState("");

  const [guests, setGuests] = useState("");

  const [bedrooms, setBedrooms] = useState("");

  const [bathrooms, setBathrooms] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      await axios.post(
        "http://127.0.0.1:5000/api/accommodations",

        {
          title,
          location,
          description,
          price,
          type,
          guests,
          bedrooms,
          bathrooms,

          images: [image],
        },

        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      navigate("/listings");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to create listing"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="create-page">

      <form
        className="create-form"
        onSubmit={submitHandler}
      >

        <h1>Create Listing</h1>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}


        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />


        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          required
        />


        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          required
        />


        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          required
        />


        <input
          type="text"
          placeholder="Accommodation Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          required
        />


        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          required
        />


        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) =>
            setGuests(e.target.value)
          }
          required
        />


        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) =>
            setBedrooms(e.target.value)
          }
          required
        />


        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) =>
            setBathrooms(e.target.value)
          }
          required
        />


        <button type="submit">

          {loading
            ? "Creating..."
            : "Create Listing"}

        </button>

      </form>

    </div>
  );
}

export default CreateListingPage;