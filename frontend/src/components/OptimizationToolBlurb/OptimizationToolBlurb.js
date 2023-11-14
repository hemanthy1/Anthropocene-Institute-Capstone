import React from "react";
import {Link} from "react-router-dom";
import "./OptimizationToolBlurb.css"
import kelpFarmMapImage from "../../assets/kelpfarmsmapimage.png";
import reforestationMapImage from "../../assets/reforestationmap.jpg";
import dacMapImage from "../../assets/dacmap.jpg";


/**
 * Entire "Optimization Tools" section of the homepage
 *
 * @returns HTML for this section
 */
function OptimizationToolBlurb() {
    return (
        <div className="blurb-container">
            <h1>Optimization Tools</h1>
            <hr/>
            <div className="blurb-row">
                <div className="colLeft">
                    <KelpFarmMapImage/>
                </div>
                <div className="colRight">
                    <Link to="kelpfarms">
                        <h2 className="toolTitle">Kelp Farms</h2>
                    </Link>
                    <KelpFarmText/>
                </div>
            </div>

            <hr/>

            <div className="blurb-row">
                <div className="colLeft">
                    <ReforestationMapImage/>
                </div>
                <div className="colRight">
                    <Link to="reforestation">
                        <h2 className="toolTitle">Reforestation</h2>
                    </Link>
                    <ReforestationText/>
                </div>
            </div>

            <hr/>

            <div className="blurb-row">
                <div className="colLeft">
                    <DACMapImage/>
                </div>
                <div className="bottomColRight">
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
 * The image next to the kelp farm section on this page
 *
 * @returns This image as an html object
 */
function KelpFarmMapImage() {
    return (
        <Link to="/kelpfarms">
            <img
                src={kelpFarmMapImage}
                alt="Kelp Farm Map Image"
                loading="lazy"
                id="mapimg"
            />
        </Link>
    )
}


/**
 * The text for the kelp farm section of this page
 *
 * @returns An HTML object of this text
 */
function KelpFarmText() {
    return (
        <p className="homePageText">Kelp Farms hold significant potential for carbon removal and
            environmental restoration. Depending on the species, kelp can live up to a year or longer.
            During this time they can grow up to 98 feet tall. This fast rate of growth means that kelp
            have a large photosynthesis potential. During photosynthesis carbon dioxide is absorbed
            and locked in its tissues. It can be harvested or transported to the ocean floor after it dies.
            When harvested it can be used as compost, food source, and an ingredient in many products.</p>
    )
}

/**
 * The image next to the reforestation section on this page
 *
 * @returns This image as an html object
 */
function ReforestationMapImage() {
    return (
        <Link to="/reforestation">
            <img
                src={reforestationMapImage}
                alt="Reforestation Map Image"
                loading="lazy"
                id="mapimg"
            />
        </Link>
    )
}

/**
 * The text for the reforestation section of this page
 *
 * @returns An HTML object of this text
 */
function ReforestationText() {
    return (
        <p className="homePageText">Reforestation plays a crucial role in carbon removal and
            ecosystem restoration efforts. Planting trees and restoring forests not only enhances
            biodiversity but also serves as a powerful carbon sink. As trees grow, they absorb carbon
            dioxide from the atmosphere during photosynthesis, converting it into organic matter and
            locking it away in their biomass. This process helps combat climate change by reducing the
            concentration of greenhouse gases in the atmosphere. Additionally, mature forests act as
            long-term carbon resevoirs, storing carbon for decades or even centuries. Reforestation
            projects also offer numerous co-benefits, such as improving air and water quality,
            and providing habitats for wildlife.</p>
    )
}

/**
 * The image next to the dac section on this page
 *
 * @returns This image as an html object
 */
function DACMapImage() {
    return (
        <Link to="/dac">
            <img
                src={dacMapImage}
                alt="Direct Air Capture Map Image"
                loading="lazy"
                id="mapimg"
            />
        </Link>
    )
}


/**
 * The text for the DAC section of this page
 *
 * @returns An HTML object of this text
 */
function DACText() {
    return (
        <p className="homePageText">Direct Air Capture (DAC) is an promising and effective
            approach to carbon removal. A relatively new technology, direct air capture is the use of
            chemical or physical processes to extract carbon dioxide directly from the ambient air.
            Once captured, the carbon dioxide can be securely stored in underground caverns or repurposed
            and sold for sustainable applications. DAC stands out as one of today's most innovative strategies
            for carbon mitigation. </p>
    )
}

export default OptimizationToolBlurb