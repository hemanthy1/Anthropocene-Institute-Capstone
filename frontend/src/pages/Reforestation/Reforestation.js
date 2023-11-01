import Heatmap from "../../components/Heatmap/Heatmap"
/*import reforestationBanner from "../../assets/ReforestationBanner.png";*/
/*import Dropdown from "../../components/Dropdown/Dropdown";*/


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
    /*
        const criteria = {
        value1: "population",
        option1: "Population",
        value2: "temperature",
        option2: "Temperature",
        value3: "precipitation",
        option3: "Precipitation",
        value4: "palmer",
        option4: "Palmer-Z Index",
        value5: "land",
        option5: "Land Price (per acre)",
        value6: "cost",
        option6: "Cost Efficiency"
    }
    */



    return (
        <div className="reforestation-container">
            {/*} <img
        src={reforestationBanner}
        alt="Reforestation Banner"
        loading="lazy"
        id="reforestation-banner"
        className="reforestation-image"

        />*/}
            {/*<div className="reforestation_banner">
            <h3> Reforestation </h3>
        </div>*/}

            <Heatmap colors={colors}/>
            <hr id="map-break"/>
            {/*<Dropdown criteria={criteria} />*/}
        </div>

    );
}

/*
function ReforestationBanner() {
    return (
        <img
            src={reforestationBanner}
            alt="Reforestation Banner"
            loading="lazy"
            id="reforestation-banner"
        />
    )
}

 */

export default Reforestation