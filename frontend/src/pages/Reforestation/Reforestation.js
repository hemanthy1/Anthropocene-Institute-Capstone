import Heatmap from "../../components/Heatmap/Heatmap"
/*import Dropdown from "../../components/Dropdown/Dropdown";*/
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
            <ReforestationBanner></ReforestationBanner>

            {/* <img class="reforestation-image" src={reforestationBanner}> */}
            <Heatmap colors={colors}/>
            <hr id="map-break"/>
            {/*<Dropdown criteria={criteria} />*/}
        </div>

    );
}


function ReforestationBanner() {
    return (
        <div className="banner-image">
            <div className="banner-text">
                <h1>Reforestation</h1>
                <p>Some text here about reforestation probably, I'm not sure</p>
            </div>
        </div>
    )
}

export default Reforestation