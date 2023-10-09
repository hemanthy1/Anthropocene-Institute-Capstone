import Heatmap from "../../components/Heatmap/Heatmap"

function AlgaeBlooms() {

  const colors =  {
    color1: "#d6e0fa",
    color2: "#afc6fc",
    color3: "#86a7f9",
    color4: "#5988fb",
    color5: "#3164de",
    color6: "#113da7",
    color7: "#00247c"
  }

  return (
    <Heatmap colors={colors} />
  );
}

export default AlgaeBlooms