import "./HomePage.css";

function HomePage() {

  const trips = [

    {
      title: "Cape Town",
      image:
        "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8b",
    },

    {
      title: "Johannesburg",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    },

    {
      title: "Durban",
      image:
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    },

    {
      title: "Pretoria",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
  ];


  return (

    <div className="home-page">

      {/* HERO */}

      <section className="hero">

        <div className="hero-overlay">

          <h1>
            Find your next stay
          </h1>

          <p>
            Discover amazing places
            around South Africa
          </p>

          <button>
            Explore Nearby
          </button>

        </div>

      </section>


      {/* TRIPS */}

      <section className="trips-section">

        <h2>
          Inspiration for your next trip
        </h2>

        <div className="trips-grid">

          {trips.map((trip, index) => (

            <div
              key={index}
              className="trip-card"
            >

              <img
                src={trip.image}
                alt={trip.title}
              />

              <h3>{trip.title}</h3>

            </div>

          ))}

        </div>

      </section>


      {/* EXPERIENCE */}

      <section className="experience-section">

        <div className="experience-card">

          <h2>
            Discover Airbnb Experiences
          </h2>

          <p>
            Unique activities with
            local experts.
          </p>

          <button>
            Explore
          </button>

        </div>

      </section>


      {/* HOSTING */}

      <section className="hosting-section">

        <div className="hosting-content">

          <h2>
            Try hosting
          </h2>

          <p>
            Earn extra income and
            unlock new opportunities.
          </p>

          <button>
            Learn More
          </button>

        </div>

      </section>

    </div>
  );
}

export default HomePage;