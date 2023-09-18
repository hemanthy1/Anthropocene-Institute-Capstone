import logoImage from "./../assets/logo.png"
import menuBar from "./../assets/menu-bar.png"

function Navbar() {
  return (
    <nav className="navbar">
      
      <a href="/">
        <img 
          src={logoImage}
          alt="Anthropocene Institute Logo"
          loading="lazy"
          id="anth-logo"
       />
      </a>

      {/* Hamburger dropdown menu for smaller screen sizes */}
      <div className="dropdown-wrap">
        
        <img 
          src={menuBar}
          alt="Menu bar hamburger icon"
          loading="lazy"
          id="menubar"
        />

        <ul className="navbar-dropdown">
          <Navlink path="/"> Home </Navlink>
          <Navlink path="/about"> About </Navlink>
          <Navlink path="/tools"> Tools </Navlink>
          <Navlink path="/faq"> FAQ </Navlink>
          <Navlink path="/data"> Data </Navlink>
          <Navlink path="/articles"> Articles </Navlink>
        </ul>
      </div>
      
      
      {/* Regular nav menu for larger screen sizes */}
      <ul className="navbar-nav">
        <Navlink path="/"> Home </Navlink>
        <Navlink path="/about"> About </Navlink>
        <Navlink path="/tools"> Tools </Navlink>
        <Navlink path="/faq"> FAQ </Navlink>
        <Navlink path="/data"> Data </Navlink>
        <Navlink path="/articles"> Articles </Navlink>
      </ul>
    </nav>
  );
}

function Navlink(props) {
  return (
    <li className="navbar-item">
      <a href={props.path} className="navbar-link">
        {props.children}
      </a>
    </li>
  );
}

export default Navbar