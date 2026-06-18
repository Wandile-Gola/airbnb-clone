import "./Header.css";
import { useEffect, useState, useRef, } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef = useRef(null);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };


  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setShowMenu(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (
    <>
    <header className="header">

      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-icon">🏠</span>
            NestAway
        </Link>
      </div>

      <div className="header-center">
        
        <div className="airbnb-search">

          <div className="search-section">

            <span className="search-label">
              Where
            </span>

            <input
              type="text"
              placeholder="Search destinations"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  navigate(
                    `/listings?search=${search}`
                  );

                }

              }}
            />

          </div>

          <button
            className="search-btn"
            onClick={() =>
              navigate(
                `/listings?search=${search}`
              )
            }
          >
            🔍
          </button>

        </div>
      </div>

      <div className="header-right">

        <Link
          to="/register"
          className="host-link"
        >
          Become a Host
        </Link>

        <button className="globe-btn">
          🌐
        </button>

        <div
          className="profile-section"
          ref={menuRef}
        >

          <div
            className="profile-btn"
            onClick={() =>
              setShowMenu(
                (prev) => !prev
              )
            }
          >
            ☰ 👤
          </div>

          {showMenu && (

            <div className="dropdown-menu">

              {userInfo ? (
                <>

                  <Link to="/reservations">
                    My Reservations
                  </Link>

                  <Link to="/wishlist">
                    My Wishlist
                  </Link>

                  {userInfo.role === "host" && (
                    <>
                      <Link to="/admin">
                        Dashboard
                      </Link>

                      <Link to="/admin/create">
                        Create Listing
                      </Link>

                      <Link to="/host/reservations">
                        Host Reservations
                      </Link>
                    </>
                  )}

                  <hr />

                  <button
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>

                </>
              ) : (
                <>

                  <Link to="/login">
                    Login
                  </Link>

                  <Link to="/register">
                    Register
                  </Link>

                </>
              )}

            </div>

          )}

        </div>

      </div>

    </header>

    <div className="header-categories">

      <Link to="/listings">
        🏠 All
      </Link>

      <Link to="/listings?type=Beach">
        🏝️ Beach
      </Link>

      <Link to="/listings?type=Cabin">
        🏡 Cabin
        </Link>

      <Link to="/listings?type=Apartment">
        🏢 Apartment
      </Link>

      <Link to="/listings?type=Student Housing">
        🎓 Student Housing
      </Link>

      <Link to="/listings?type=Luxury">
        💎 Luxury
      </Link>

    </div>

  </>

  );
}

export default Header;