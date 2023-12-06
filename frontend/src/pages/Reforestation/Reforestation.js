import Heatmap from "../../components/ReforestationMap/ReforestationMap"
import "./Reforestation.css"

/**
 * A webpage for the Reforestation optimization tool.
 * The webpage contains the heatmap for the most optimal locations
 * to plant many trees.
 * 
 * @returns The webpage containing the reforestation
 *  optimization tool.
 */
function Reforestation() {

    const colors = {
        color0: "#ffffff",
        color1: "#effbed",
        color2: "#cff5c9",
        color3: "#a1e499",
        color4: "#75ed66",
        color5: "#3fa331",
        color6: "#1b780f",
        color7: "#083e00"
    }

    return (
        <div className="reforestation-container">
            <ReforestationBanner></ReforestationBanner>
            <Heatmap colors={colors}/>
        </div>
    );
}

/**
 * The banner image component for the Reforestation tool page
 * The webpage contains the heatmap for the most optimal locations
 * for reforestation
 * 
 * @returns The banner image with proper formatting
 */
function ReforestationBanner() {
    return (
        <div className="banner-image">
            <div className="banner-text">
                <h1>Reforestation</h1>
                <p>Planting Trees in Open Land</p>
            </div>
        </div>
    )
}

export default Reforestation