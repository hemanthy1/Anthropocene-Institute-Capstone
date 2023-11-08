import KelpMap from "../../components/KelpMap/KelpMap"
import "./KelpFarms.css"

function KelpFarms() {

  const colors =  {
    color0: "#ffffff",
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
      <KelpFarmBanner></KelpFarmBanner>
      <KelpMap colors={colors} />
    </>
  );
}


function KelpFarmBanner() {
  return (
      <div className="algaeblooms-banner-image">
          <div className="algaeblooms-banner-text">
              <h1>Kelp Farms</h1>
              <p>Some text here about Algae Blooms probably, I'm not sure</p>
          </div>
      </div>
  )
}

export default KelpFarms