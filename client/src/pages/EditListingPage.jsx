import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";


function EditListingPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [type, setType] = useState("");

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [guests, setGuests] = useState("");

  const [bedrooms, setBedrooms] =
    useState("");

  const [bathrooms, setBathrooms] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchListing = async () => {

      try {

        const { data } = await axios.get(
          `https://nestaway-88b31453dcd5.herokuapp.com/api/accommodations/${id}`
        );

        setTitle(data.title);

        setLocation(data.location);

        setDescription(data.description);

        setPrice(data.price);

        setType(data.type);

        setGuests(data.guests);

        setBedrooms(data.bedrooms);

        setBathrooms(data.bathrooms);

        setImages(data.images || []);

      } catch (error) {

        setError("Failed to load listing");

      } finally {

        setLoading(false);
      }
    };

    fetchListing();

  }, [id]);

  const uploadImages = async () => {

    const formData = new FormData();

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    const { data } = await axios.post(
      "https://nestaway-88b31453dcd5.herokuapp.com/api/upload",
      formData
    );

    return data;
  };

  const removeImage = (indexToRemove) => {

    setImages(
      images.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      let uploadedImages = images;

      if (newImages.length > 0) {

        const cloudinaryImages =
          await uploadImages();

        uploadedImages = [
          ...images,
          ...cloudinaryImages,
        ];
      }

      await axios.put(

        `https://nestaway-88b31453dcd5.herokuapp.com/api/accommodations/${id}`,

        {
          title,
          location,
          description,
          price,
          type,
          guests,
          bedrooms,
          bathrooms,
          images: uploadedImages,
        },

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      navigate("/admin");

    } catch (error) {

      setError("Failed to update listing");
    }
  };


  if (loading) {
    return <h1>Loading...</h1>;
  }


  return (

    <div className="create-page container">

      <form
        className="create-form"
        onSubmit={submitHandler}
      >

        <h1>Edit Listing</h1>

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
        />


        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />


        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />


        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />


        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >

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

        <div className="image-preview-grid">

          {images.map((image, index) => (

            <div
              key={index}
              className="image-preview-card"
            >

              <img
                src={image}
                alt={`Preview ${index}`}
              />

              <button
                type="button"
                className="remove-image-btn"
                onClick={() =>
                  removeImage(index)
                }
              >
                ✕
              </button>

            </div>

          ))}

        </div>

        <div className="image-upload-box">

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setNewImages(
                Array.from(e.target.files)
              )
            }
          />

          <p>
            {newImages.length} image(s) selected
          </p>

        </div>


        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) =>
            setGuests(e.target.value)
          }
        />


        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) =>
            setBedrooms(e.target.value)
          }
        />


        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) =>
            setBathrooms(e.target.value)
          }
        />


        <button type="submit">
          Update Listing
        </button>

      </form>

    </div>
  );
}

export default EditListingPage;