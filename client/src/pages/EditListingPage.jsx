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

  const [image, setImage] = useState("");

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
          `http://127.0.0.1:5000/api/accommodations/${id}`
        );

        setTitle(data.title);

        setLocation(data.location);

        setDescription(data.description);

        setPrice(data.price);

        setType(data.type);

        setGuests(data.guests);

        setBedrooms(data.bedrooms);

        setBathrooms(data.bathrooms);

        setImage(data.images?.[0] || "");

      } catch (error) {

        setError("Failed to load listing");

      } finally {

        setLoading(false);
      }
    };

    fetchListing();

  }, [id]);


  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

        `http://127.0.0.1:5000/api/accommodations/${id}`,

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

    <div className="create-page">

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


        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />


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