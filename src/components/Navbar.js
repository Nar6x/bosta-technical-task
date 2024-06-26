import React, { useState, useRef } from "react";
import Logo_AR from "../assets/bosta_ar.svg";
import Logo_EN from "../assets/bosta_en.svg";
import TextData from "../data/TextData.json";
import { useLanguage } from "../context/LanguageContext";
import { useApi } from "../context/ApiContext";
import Hamburger from "hamburger-react";
import useOutsideClick from "../hooks/useOutsideClick";

const Navbar = () => {
  const { lang, toggleLanguage } = useLanguage();
  const { fetchData } = useApi();

  const [showDropdown, setShowDropdown] = useState(false);
  const [shipmentNumber, setShipmentNumber] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const { sales, pricing, home, login, trackShipment, language, mobileLang } =
    TextData.navbar[lang];
  const { trackingNumber } = TextData.misc[lang];

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(shipmentNumber);
    setShowDropdown(false);
  };

  const logoSrc = lang === "ar" ? Logo_AR : Logo_EN;

  return (
    <div className="navbar" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="navbar-container">
        <a href="/" className="logo">
          <img src={logoSrc} alt="Logo" />
        </a>
        <div className="navbar-middle-section">
          <ul>
            <li>{home}</li>
            <li>{pricing}</li>
            <li>{sales}</li>
          </ul>
        </div>
        <div className="navbar-menu-container">
          <ul>
            <div className="dropdown-container" ref={dropdownRef}>
              <div
                className={`dropdown-wrapper ${
                  showDropdown ? "border-active" : ""
                }`}
              >
                <li
                  className={`track-shipment ${showDropdown ? "active" : ""}`}
                  onClick={toggleDropdown}
                >
                  {trackShipment}
                </li>
                {showDropdown && (
                  <div className="track-shipment-dropdown">
                    <div className="dropdown-label">{trackShipment}</div>
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder={trackingNumber}
                        className="nav-dropdown-search"
                        value={shipmentNumber}
                        onChange={(e) => setShipmentNumber(e.target.value)}
                      />
                      <div className="search-icon" onClick={handleSubmit}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="burger-icon" onClick={toggleMobileMenu}>
              <Hamburger color="#475467" toggled={isOpen} toggle={setOpen} />
            </div>{" "}
            <li>{login}</li>
            <li onClick={toggleLanguage}>{language}</li>
          </ul>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>{home}</li>
            <li>{pricing}</li>
            <li>{sales}</li>
            <li onClick={toggleLanguage}>{mobileLang}</li>
            <div className="sign-in">
              <button className="mobileSignInBtn">{login}</button>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
