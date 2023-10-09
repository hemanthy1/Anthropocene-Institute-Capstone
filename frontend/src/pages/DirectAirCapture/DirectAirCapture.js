import Heatmap from "../../components/Heatmap/Heatmap"

/**
 * A webpage for the Direct Air Capture optimization tool.
 * The webpage contains the heatmap for the most optimal locations
 * to setup a direct air capture plant/site based on different factors
 * 
 * @returns The webpage containing the direct air capture
 *  optimization tool.
 */
function DirectAirCapture() {

  const colors = {
    color1: "#fbcfcf",
    color2: "#f79d9d",
    color3: "#f06262",
    color4: "#da3a3a",
    color5: "#bd2525",
    color6: "#a20c0c",
    color7: "#7a0000"
  }

  return (
    <Heatmap colors={colors}/>
  );
}

export default DirectAirCapture