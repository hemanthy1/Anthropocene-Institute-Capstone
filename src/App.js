import React from 'react';

function App() {
  return (
    <div id="site-content">
      <Navbar></Navbar>
      <h1 className="hello">Hello, World!</h1>
      <Footer></Footer>
    </div>
  );
}

/**
 * Components relating to the navigation bar
 * 
 * Navbar - the parent element containing the links
 * NavLink - an individual link element on the navigation bar
 */
function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"></ul>
    </nav>
  );
}

function NavLink() {
  return (
    <li>
      <a className="navbar-link">

      </a>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">

    </footer>
  )
}

export default App;
