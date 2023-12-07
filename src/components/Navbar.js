import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UIContext } from "../context/uiContext";
import DashboardBtn from "./UserDashboard/DashboardBtn";
import SignInModal from "./UserSignIn/SignInModal";

function Navbar() {
  const { handleSigninModal } = useContext(UIContext);
  const isLogged = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("accessToken");

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-white py-2"
        style={{ position: "sticky", top: "0", zIndex: "100" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav nav-underline mx-auto">
              <li className="nav-item mx-4">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link to="/services" className="nav-link">
                  Services
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link to="/find-experts" className="nav-link">
                  Find Experts
                </Link>
              </li>
            </ul>
            <div className="navbar-buttons">
              {isLogged ? (
                isAdmin ? (
                  <DashboardBtn />
                ) : null
              ) : (
                <>
                  <button
                    className="btn btn-primary px-3"
                    onClick={() => handleSigninModal(true)}
                    style={{ backgroundColor: "#145da0" }}
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <SignInModal />
    </>
  );
}

export default Navbar;
