import Heatmap from "../../components/ReforestationMap/ReforestationMap"

import DACMap from "../../components/DACMap/DACMap"

import "./DirectAirCapture.css"

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
    color0: "#ffffff",
    color1: "#fbcfcf",
    color2: "#f79d9d",
    color3: "#f06262",
    color4: "#da3a3a",
    color5: "#bd2525",
    color6: "#a20c0c",
    color7: "#7a0000"
  }

  return (
    <div className="dac-container">
      <DACBanner></DACBanner>
      {/* <ReforestationMap colors={colors}/> */}
      <DACMap colors={colors} />
    </div>
  );
}

/**
 * The banner image component for the DAC tool page
 * The webpage contains the heatmap for the most optimal locations
 * for direct air capture facilities
 * 
 * @returns The banner image with proper formatting
 */
function DACBanner() {
  return (
      <div className="dac-banner-image">
          <div className="dac-banner-text">
              <h1>Direct Air Capture</h1>
              <p>Facilities to Filter and Process Carbon Dioxide Out of the Air</p>
          </div>
      </div>
  )
}

export default DirectAirCapture