import { Link } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import logoImage from "../../assets/logo.png"
//import menuBar from "../../assets/menu-bar.png"
import "./Navbar.css"

function Navbar() {

  // useState hook to manage the dropdown state
  const [down, setDown] = useState(false);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const hamburgerClass = `hamburger-icon ${isMenuOpen ? 'open' : ''}`;

  /**
   * Hamburger icon functional component. The Hamburger Icon is made of spans.
   * 
   * @param {boolean} props the current state of the dropdown menu
   * 
   * @returns the clickable hamburger spans
   */
  function Hamburger(props) {
      const handleHamburgerClick = () => {
          setDown(!props.down); // Toggle the 'down' state
          toggleMenu(); // Toggle the 'isMenuOpen' state
      };
    return (
        <div id="hamburger-icon" className={hamburgerClass} onClick={handleHamburgerClick}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
    )
  }

  // Check the current state of the dropdown menu,
  // return the according navbar elements.
  if(down) {
    return (
      <>
        <nav className="navbar">
          <LogoImage />
          <Hamburger down={down} />
          <Menu />
        </nav>
        <DropdownMenu />
      </>
      
    )
  } else {
    return (
      <nav className="navbar">
        <LogoImage />
        <Hamburger down={down} />
        <Menu />
      </nav>
    )
  }
}

/**
 * Navbar link functional component
 * 
 * @param {String} props Contains the routing path and the link display text
 * in props.path and props.children, repsectively.
 * 
 * @returns The clickable navbar link as a list item tag
 */
function Navlink(props) {
  return (
    <li className="navbar-item">
      <Link to={props.path} className="navbar-link">
        {props.children}
      </Link>
    </li>
  );
}

/**
 * The Anthropocene Institute logo
 * 
 * @returns AI logo as a clickable link to the homepage
 */
function LogoImage() {
  return (
    <Link to="/">
      <img 
        src={logoImage}
        alt="Anthropocene Institute Logo"
        loading="lazy"
        id="anth-logo"
      />
    </Link>
  )
}

/**
 * Dropdown Navbar Menu
 * 
 * While this is very similar to the regular navbar menu, I believe
 * it makes sense to have a separate component for styling purposes
 * 
 * @returns Dropdown menu as an unordered list of Navlinks,
 * wrapped in a div tag for styling
 */
function DropdownMenu() {
  return (
    <div className="dropdown-wrap">
      <ul className="navbar-dropdown">
        <Navlink path="/"> Home </Navlink>
        <Navlink path="/about"> About </Navlink>
        <Navlink path="/faq"> FAQ </Navlink>
        <Navlink path="/data"> Data </Navlink>
        <Navlink path="/articles"> Articles </Navlink>
      </ul>
    </div>
  )
}

/**
 * Standard navbar menu for larger screens
 * @returns Navbar menu as an unordered list of Navlinks
 */
function Menu() {
  return (
    <ul className="navbar-nav">
      <Navlink path="/"> Home </Navlink>
      <Navlink path="/about"> About </Navlink>
      <Navlink path="/faq"> FAQ </Navlink>
      <Navlink path="/data"> Data </Navlink>
      <Navlink path="/articles"> Articles </Navlink>
    </ul>
  )
}

export default Navbar