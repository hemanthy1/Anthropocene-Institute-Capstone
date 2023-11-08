import Heatmap from "../../components/ReforestationMap/ReforestationMap"
import "./Reforestation.css"

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
            {/* <img class="reforestation-image" src={reforestationBanner}> */}
            <Heatmap colors={colors}/>
        </div>

    );
}


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