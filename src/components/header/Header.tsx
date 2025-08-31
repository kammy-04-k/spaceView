import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", end: true },
    { path: "/mars", label: "Mars Rovers" },
    { path: "/neo", label: "NEO Tracker" },
    { path: "/about", label: "About" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          SpaceScope
        </NavLink>
      </div>

      {/* Hamburger icon for small screens */}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ path, label, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => setMenuOpen(false)} // close menu on link click
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
