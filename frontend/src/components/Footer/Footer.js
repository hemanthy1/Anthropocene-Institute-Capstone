
import React from "react";
import "./Footer.css"



/**
 * The footer
 *
 */

function Footer() {
  return (
      <div className="container">
        <div className="row">
          <div className="col">
              <ul className="names">
                  <li className="title">Contributors</li>
                  <li className="link"><a href="https://www.linkedin.com/in/eden-haase-90b688212/">Jack Holscher</a></li>
                  <li className="link"><a href="https://www.linkedin.com/in/eden-haase-90b688212/">Ishita Kokil</a></li>
                  <li className="link"><a href="https://www.linkedin.com/in/eden-haase-90b688212/">Nick Wang</a></li>
                  <li className="link"><a href="https://www.linkedin.com/in/eden-haase-90b688212/">Edie Haase</a></li>
                  <li className="link"><a href="https://hemanthyalamanchili.com/ ">Hemanth Yalamanchili</a></li>
              </ul>
          </div>
            <div className="col">
              <ul className="names">
                  <li className="title">Tools</li>
                  <li className="link">Algae</li>
                  <li className="link">Reforestation</li>
                  <li className="link">Solar</li>

              </ul>
          </div>
            <div className="col">
              <ul className="names">
                  <li className="title">Anthropocene Institute</li>
                  <li className>855 EL Camino Real<br/>Ste 13A N399<br/>Palo Alto, CA 94301</li>
                  <li>+1 (888) 863-8730</li>

              </ul>
          </div>
            <div className="col">
                <p className="footerText">@ Anthropocene Institute, All Rights Reserved</p>
          </div>
        </div>
      </div>

  )
}

export default Footer