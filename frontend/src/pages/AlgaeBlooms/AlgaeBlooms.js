import Heatmap from "../../components/Heatmap/Heatmap"
import Dropdown from "../../components/Dropdown/Dropdown";

import "./AlgaeBlooms.css"

function AlgaeBlooms() {

  const colors =  {
    color0: "ffffff",
    color1: "#d6e0fa",
    color2: "#afc6fc",
    color3: "#86a7f9",
    color4: "#5988fb",
    color5: "#3164de",
    color6: "#113da7",
    color7: "#00247c"
  }

  return (
    <>

      <ReforestationBanner></ReforestationBanner>

      <Heatmap colors={colors} />
      {/* <hr id="map-break"/>
      <Dropdown criteria={criteria} /> */}
    </>
  );
}


function ReforestationBanner() {
  return (
      <div className="algaeblooms-banner-image">
          <div className="algaeblooms-banner-text">
              <h1>Algae Blooms</h1>
              <p>Some text here about Algae Blooms probably, I'm not sure</p>
          </div>
      </div>
  )
}

export default AlgaeBlooms