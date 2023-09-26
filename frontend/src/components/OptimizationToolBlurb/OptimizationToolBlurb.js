
import React from "react";
import "./OptimizationToolBlurb.css"
import environmentalBackground from "../../assets/EnvironmentalBackground.png";



/**
 * Image on the left words on the right
 *
 */
function OptimizationToolBlurb() {
  return (
    <div className="blurb-container">
        <hr />
        <div className="blurb-row">
            <div className= "colLeft">
                <img   src="../../assets/map-image.png" alt="Map Image"/>
            </div>
            <div className="colRight">
                <h2 className="toolTitle">Algae Blooms</h2>
                <p className="homePageText" >Algae blooms hold significant potential for carbon removal and
                environmental restoration. These blooms, typically consisting
                of micro algae or cyanobacteria, are adept at photosynthesis,
                converting carbon dioxide (CO2) and sunlight into organic matter.
                By cultivating algae on a large scale in controlled environments such
                as bioreactors or open ponds, we can harness their natural ability
                to sequester carbon. As algae grow, they capture CO2 from the
                atmosphere, helping to mitigate climate change. Moreover, once
                harvested, algae biomass can be used in various applications,
                including biofuels, livestock feed, and even as a carbon-negative
                building material.</p>
            </div>
        </div>

    </div>
  )
}



export default OptimizationToolBlurb