import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useState } from "react";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser, user, toggleSideBar } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">DashBoard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <FaUserCircle>{user?.name}</FaUserCircle>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown "}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
