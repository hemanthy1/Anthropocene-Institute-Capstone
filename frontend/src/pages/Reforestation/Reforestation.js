import Heatmap from "../../components/Heatmap/Heatmap"
import reforestationBanner from "../../assets/ReforestationBanner.png";


function Reforestation() {

  const colors = {
    color1: "#effbed",
    color2: "#cff5c9",
    color3: "#a1e499",
    color4: "#75ed66",
    color5: "#3fa331",
    color6: "#1b780f",
    color7: "#083e00"
  }
  

  return (
      <div>
        {/* <div className="reforestation_banner">
            <h3> Reforestation </h3>
        </div> */}

        <Heatmap colors={colors}/>
      </div>

  );
}

function ReforestationBanner(){
    return(
        <img
        src={reforestationBanner}
        alt="Reforestation Banner"
        loading="lazy"
        id="reforestation-banner"
        />
        )
}
export default Reforestation