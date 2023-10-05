import Heatmap from "../../components/Heatmap/Heatmap"
import reforestationBanner from "../../assets/ReforestationBanner.png";


function Reforestation() {
  return (
      <div>
        <div className="reforestation_banner">
            <h3> Reforestation </h3>
        </div>

        <Heatmap/>
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