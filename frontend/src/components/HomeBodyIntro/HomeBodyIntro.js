import environmentalBackground from "../../assets/EnvironmentalBackground.png"
import "./HomeBodyIntro.css"

function HomeBodyIntro() {
    return (
      <div>
        <homebodyintro className="homebodyintro">
          <EnvironmentalBackground/>

          <h1>Climate Solutions - Optimized</h1>
          <h3> 
              We provide companies and agencies with the artificial intelligence tools 
              necessary for completing their sustainability projects in the most efficient 
              and optimal way possible.
          </h3>
        </homebodyintro>

      </div>
    )
  }
  
  /**
 * The Anthropocene Institute logo
 * 
 * @returns AI logo as a clickable link to the homepage
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