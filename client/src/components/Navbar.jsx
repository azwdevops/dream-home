import { Link } from "react-router-dom";
import "@/styles/Navbar.scss";

import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "@/styles/variables.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/redux/features/authSlice";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <Link to="/">
        Dream <span>Home</span>
      </Link>
      <div className="navbar-search">
        <input type="text" placeholder="search..." />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>
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
            <Link to="">Trip List</Link>
            <Link to="">Wish List</Link>
            <Link to="">Property List</Link>
            <Link to="">Reservation List</Link>
            <Link to="">Become A Host</Link>
            <Link to="/login" onClick={() => dispatch(setLogout())}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
