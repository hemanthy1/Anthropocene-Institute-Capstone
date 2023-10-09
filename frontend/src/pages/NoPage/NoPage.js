import "./NoPage.css"
import logo from "../../assets/logoNormal.png"

function NoPage() {
  return(
    <>
      <h1 id="error-title">Oops! 404, Page Not Found!</h1>
      <h2 id="error-message"> 
        We apologize for the inconvenience. 
        <a href="/" id="return-link"> Click here </a>
        to return to the home page.
      </h2>
      <img
        src={logo}
        alt="Anthropocene Logo"
        loading="lazy"
        id="error-logo"
      />
    </>
  );
};

export default NoPage;