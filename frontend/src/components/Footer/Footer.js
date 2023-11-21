import React from "react";
import "./Footer.css"
import {Link} from "react-router-dom";


/**
 * 
 * Defines the footer found at the bottom of each webpage. The footer
 * contains extra links for providing the users with extra information
 * and an additional way to navigate the website.
 * 
 * Footer with columns and rows containing supplemental links
 * @returns The footer component
 */

function Footer() {
    return (
        <div className="container">
            <div className="row" id="footer-top">
                <div className="col">
                    <ul className="names">
                        <li className="title">Contributors</li>
                        <li className="link"><a href="https://www.linkedin.com/in/jackson-holscher/">Jack Holscher</a>
                        </li>
                        <li className="link"><a href="https://www.linkedin.com/in/ishitakokil/">Ishita Kokil</a></li>
                        <li className="link"><a href="https://www.linkedin.com/in/nicholas-wang7190/">Nick Wang</a></li>
                        <li className="link"><a href="https://www.linkedin.com/in/eden-haase-90b688212/">Edie Haase</a>
                        </li>
                        <li className="link"><a href="https://hemanthyalamanchili.com/ ">Hemanth Yalamanchili</a></li>
                    </ul>
                </div>
                <div className="col">
                    <ul className="names">
                        <li className="title">Tools</li>
                        <li className="link"><Link to="/kelpfarms"> Kelp Farms </Link></li>
                        <li className="link"><Link to="/reforestation"> Reforestation </Link></li>
                        <li className="link"><Link to="/dac"> Direct Air Capture </Link></li>
                    </ul>
                </div>

                <div className="col">
                    <ul className="names">
                        <li className="title"> Get Involved </li>
                        <li className="link"> <Link to="/feedback"> Feedback & Suggestions </Link> </li>
                        <li className="link"> <Link to="/action"> Take Action! </Link> </li>
                    </ul>
                </div>

                <div className="col">
                    <ul className="names">
                        <li className="title">Anthropocene Institute</li>
                        <li className="link"><a href="https://anthropoceneinstitute.com/" target="_blank">855 EL Camino
                            Real<br/>Ste 13A N399<br/>Palo Alto, CA 94301</a></li>
                        <li className="link"><a href="tel:+1888-863-8730">+1 (888) 863-8730</a></li>

                    </ul>
                </div>
            </div>
            
            <div id="footer-break"> <hr /> </div>

            <div className="row" id="footer-bottom">
                <div className="col">
                    <p className="footerText">© Anthropocene Institute, All Rights Reserved</p>
                </div>
            </div>

        </div>

    )
}

export default Footer