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

  const [images, setImages] = useState([]);

  const [guests, setGuests] = useState("");

  const [bedrooms, setBedrooms] = useState("");

  const [bathrooms, setBathrooms] = useState("");

  const [amenities, setAmenities] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAmenityChange = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(
        amenities.filter((a) => a !== amenity)
      );
    }
      else {
      setAmenities([...amenities, amenity]);
    }
  };

  const uploadImages =
    async () => {

      const formData =
        new FormData();

      images.forEach((image) => {
        formData.append(
          "images",
          image
        );
      });

      const { data } =
        await axios.post(
          "http://127.0.0.1:5000/api/upload",
          formData
        );

    return data;
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const uploadedImages = await uploadImages();

      await axios.post(
        "http://127.0.0.1:5000/api/accommodations",

        {
          title,
          location,
          description,
          price,
          type,
          amenities,
          guests,
          bedrooms,
          bathrooms,

          images: uploadedImages,
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

    <div className="create-page container">

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


        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          required
        >

          <option value="">
            Select Type
          </option>

          <option value="Apartment">
            Apartment
          </option>

          <option value="Cabin">
            Cabin
          </option>

          <option value="Beach">
            Beach
          </option>

          <option value="Luxury">
            Luxury
          </option>

          <option value="Student Housing">
            Student Housing
          </option>

        </select>

      <div className="image-upload-box">

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setImages(
              Array.from(e.target.files)
            )
          }
        />

        <p>
          {images.length} image(s) selected
        </p>
        
      </div>

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

      <div className="amenities-group">

        <h3>Amenities</h3>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleAmenityChange("WiFi")
              }
            />
            WiFi
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleAmenityChange("Parking")
              }
            />
            Parking
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleAmenityChange("Kitchen")
              }
            />
            Kitchen
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleAmenityChange("Workspace")
              }
            />
            Workspace
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleAmenityChange("Pool")
              }
            />
            Pool
          </label>

      </div>
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