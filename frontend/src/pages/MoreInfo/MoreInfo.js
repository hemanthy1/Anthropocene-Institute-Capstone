import React, {useState} from 'react'
import Accordion from "../../components/Accordion/Accordion";
import "../../components/Accordion/Accordion.css";
import "./MoreInfo.css"


/**
 * Holds the questions and answers of the FAQs.
 *
 * @returns The contents of the FAQ page
 */
function MoreInfo() {

    return (
        <div>
            <div>
                <h1 className="more-info-title">More Info</h1>
                <hr className="more-info-line"/>
                <h2 className="type-title">Kelp Farms</h2>
                <h3 className="feature"> Land Prices</h3>
                <h3 className="feature"> Palmer-z Index</h3>
                <h3 className="feature"> Population</h3>
                <h3 className="feature"> Precipitation</h3>
                <h3 className="feature"> Temperature</h3>
            </div>


        </div>
    )
}


export default MoreInfo