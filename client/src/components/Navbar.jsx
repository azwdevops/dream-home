import { Link, useNavigate } from "react-router-dom";
import "@/styles/Navbar.scss";
import { persistor } from "@/redux/app/store";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "@/styles/variables.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState } from "@/redux/features/authSlice";
import { clearBookingState } from "@/redux/features/bookingSlice";
import { clearListingState, setListings } from "@/redux/features/listingSlice";
import APIClient from "@/utils/APIClient";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    dispatch(clearAuthState());
    dispatch(clearBookingState());
    dispatch(clearListingState());

    // now we need to clear persisted state to avoid data inconsistency if a different user logs in
    persistor.pause();
    await persistor.flush().then(() => {
      return persistor.purge();
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await APIClient.get(`/listings/search/${searchTerm}`)
      .then((res) => {
        dispatch(setListings({ listings: res.data }));
        navigate(`/listings/search/${searchTerm}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Dream<span>Home</span>
      </Link>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trim())}
          required
        />
        <IconButton type="submit">
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </form>
      <div className="navbar-right">
        {user ? (
          <Link to="/create-listing">Become A Host</Link>
        ) : (
          <Link to="/login">Become A Host</Link>
        )}
        <button
          className="navbar-right-account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "var(--darkgrey)" }} />
          {!user ? (
            <Person sx={{ color: "var(--darkgrey)" }} />
          ) : (
            <img
              src={`${
                import.meta.env.VITE_APP_BASE_URL
              }${user.profileImagePath.replace("public", "")}`}
              alt="profile image"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropdownMenu && !user && (
          <div className="navbar-right-accountmenu">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        {dropdownMenu && user && (
          <div className="navbar-right-accountmenu">
            <Link to={`/trip-list/${user?._id}`}>Trip List</Link>
            <Link to={`/my-wishlist/${user?._id}`}>Wish List</Link>
            <Link to={`/my-properties/${user?._id}`}>Property List</Link>
            <Link to={`/reservations/${user?._id}`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>
            <Link to="/login" onClick={handleLogout}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
