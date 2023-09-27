import environmentalBackground from "../../assets/EnvironmentalBackground.png"
import "./HomeBodyIntro.css"


/**
 * The first portion of the home page
 * 
 * @returns HTML that lays out the page
 */
function HomeBodyIntro() {
    return (
      <div className="homebody-intro">
          <EnvironmentalBackground/>

          <h1>Climate Solutions - Optimized</h1>
          <h3> 
              We provide companies and agencies with the artificial intelligence tools 
              necessary for completing their sustainability projects in the most efficient 
              and optimal way possible.
          </h3>
      </div>
    )
  }
  
/**
 * The background image of the top of the home page
 * 
 * @returns The image as an HTML element
 */
function EnvironmentalBackground() {
  return (
    <a href="/">
      <img 
        src={environmentalBackground}
        alt="Environmental Backgronud"
        loading="lazy"
        id="environmental-bg"
      />
    </a>
  )
}
  export default HomeBodyIntro