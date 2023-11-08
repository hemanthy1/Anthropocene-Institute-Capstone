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
      <div className="kelpfarms-banner-image">
          <div className="kelpfarms-banner-text">
              <h1>Kelp Farms</h1>
              <p>Planting Flora to Absorb Carbon Dioxide</p>
          </div>
      </div>
  )
}

export default KelpFarms