import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  
  const userInfo = JSON.parse(

    localStorage.getItem("userInfo")
    );

    const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/login");
    };

  return (
    <header className="header">

      {/* LEFT */}
      <div className="header__left">
        <Link to="/" className="logo">
          Airbnb
        </Link>
      </div>


      {/* CENTER */}
      <div className="header__center">
        <input
          type="text"
          placeholder="Start your search"
        />
      </div>


      {/* RIGHT */}
      <div className="header__right">

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/listings" className="nav-link">
          Listings
        </Link>

        <Link to="/reservations" className="nav-link">
          Reservations
        </Link>

        <Link to="/admin" className="nav-link">
          Dashboard
        </Link>

        <Link
            to="/host/reservations"
            className="nav-link">
            Host Reservations
        </Link>

        <Link
            to="/admin/create"
            className="nav-link"
            >
            Create Listing
        </Link>

        {userInfo ? (
            <button
                className="login-btn"
                onClick={logoutHandler}
            >
                Logout
            </button>
            ) : (
            <>
                <Link
                to="/login"
                className="login-btn"
                >
                Login
                </Link>

                <Link
                to="/register"
                className="nav-link"
                >
                Register
                </Link>
            </>
            )}

      </div>

    </header>
  );
}

export default Header;