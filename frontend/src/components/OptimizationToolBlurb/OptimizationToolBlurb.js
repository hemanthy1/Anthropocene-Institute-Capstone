import React from "react";
import { Link } from "react-router-dom";
import "./OptimizationToolBlurb.css"
import algaeBloomMapImage from "../../assets/algaebloomsmapimg.png";
import reforestationMapImage from "../../assets/reforestationmapimg.png";
import dacMapImage from "../../assets/dacmapimg.png";



/**
 * Entire "Optimization Tools" section of the homepage
 *
 * @returns HTML for this section
 */ 
function OptimizationToolBlurb() {
  return (
    <div className="blurb-container">
      <h1>Optimization Tools</h1>
      <hr />
        <div className="blurb-row">
            <div className= "colLeft">
                <AlgaeBloomMapImage/>
            </div>
            <div className="colRight">
              <Link to="algaeblooms">
                <h2 className="toolTitle">Algae Blooms</h2>
              </Link>
              <AlgaeBloomText/>
            </div>
        </div>

        <hr />

        <div className="blurb-row">
            <div className= "colLeft">
                <ReforestationMapImage/>
            </div>
            <div className="colRight">
              <Link to="reforestation">
                <h2 className="toolTitle">Reforestation</h2>
              </Link>
              <ReforestationText/>
            </div>
        </div>

        <hr />

        <div className="blurb-row">
            <div className= "colLeft">
                <DACMapImage/>
            </div>
            <div className="colRight">
              <Link to="dac">
                <h2 className="toolTitle">Direct Air Capture</h2>
              </Link>
              <DACText/>
            </div>
        </div>
    </div>
  )
}

/**
 * The image next to the algae bloom section on this page
 * 
 * @returns This image as an html object
 */
  function AlgaeBloomMapImage() {
    return (
      <a href="/">
        <img 
          src={algaeBloomMapImage}
          alt="Algae Bloom Map Image"
          loading="lazy"
          id="mapimg"
        />
      </a>
    )
  }


/**
 * The text for the algae bloom section of this page
 * 
 * @returns An HTML object of this text
 */
    function AlgaeBloomText() {
      return (
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
      )
    }

/**
 * The image next to the reforestation section on this page
 * 
 * @returns This image as an html object
 */
  function ReforestationMapImage() {
    return (
      <a href="/">
        <img 
          src={reforestationMapImage}
          alt="Reforestation Map Image"
          loading="lazy"
          id="mapimg"
        />
      </a>
    )
  }

/**
 * The text for the algae bloom section of this page
 * 
 * @returns An HTML object of this text
 */
      function ReforestationText() {
        return (
          <p className="homePageText" >Reforestation plays a crucial role in carbon removal and 
          ecosystem restoration efforts. Planting trees and restoring forests not onnly enhances 
          biodiversity but also serves as a powerful carbon sink. As trees grow, they absorb carbon 
          dioxide from the atmosphere during photosynthesis, coverting it into organic matter and 
          locking it away in their biomass. This process helps combat climate change by reducing the 
          concentration of greenhouse gases in the atmosphere. Additionally, mature forests act as 
          long-term carbon resevoirs, storing carbon for decades or even centuries. Reforestation 
          projects also offer numerous co-benefits, such as improving air and water quality, 
          and providing hatibats for wildlife.</p>
        )
      }

/**
 * The image next to the dac section on this page
 * 
 * @returns This image as an html object
 */
  function DACMapImage() {
    return (
      <a href="/">
        <img 
          src={dacMapImage}
          alt="Direct Air Capture Map Image"
          loading="lazy"
          id="mapimg"
        />
      </a>
    )
  }


/**
 * The text for the algae bloom section of this page
 * 
 * @returns An HTML object of this text
 */
      function DACText() {
        return (
          <p className="homePageText" >Direct Air Capture (DAC) is an interesting and effective 
          approach to carbon removal. As the name suggests, this method entails setting up a facility 
          to suck carbon dioxide from the air and store it in one form or another. Ti's possible to 
          store it in tanks in underground caverns, chemically treat it and transform it into stones, 
          and so much more. DAC is one of the most innovative approaches to carbon removal today.</p>
        )
      }

export default OptimizationToolBlurb