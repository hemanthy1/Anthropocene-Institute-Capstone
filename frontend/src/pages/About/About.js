import React from 'react'
import "./About.css"
import ediepfp from "../../assets/ediepfp.jpeg"
import hemanthpfp from "../../assets/hemanthpfp.jpeg"
import nickpfp from "../../assets/nickpfp.jpeg"
import ishitapfp from "../../assets/ishitapfp.jpeg"
import jackpfp from "../../assets/jackpfp.jpeg"
import carlpfp from "../../assets/carlpagepfp.jpeg"
import frankpfp from "../../assets/frankpfp.png"
import melindapfp from "../../assets/melindapfp.jpeg"
import designdaypage from "../../assets/designdaypage.png"

function About() {
  return (
    <div>
      <div className="top-text">
        <h1 className="about-title">About Us</h1>
        <div className="about-us-text">
          <p className="about-us-text">We are a group of Michigan State Students and made this website for our capstone project with the guidance of our amazing sponsors at the Anthropocene Institute.  </p>
        </div>
      </div>

      <hr className="about-hr"></hr>

      <h2 className="our-team">Our Sponsors</h2>
      
      <div className="row-one">
        <GeneralSponsorColumn className="Carl"
          pfp={carlpfp} 
          alt="Carl Page Pfp" 
          name="Carl Page" 
          role="President">
        </GeneralSponsorColumn>

        <GeneralSponsorColumn className="Frank"
          pfp={frankpfp} 
          alt="Frank Ling Pfp" 
          name="Frank Hiroshi Ling" 
          role="Chief Scientist">
        </GeneralSponsorColumn>

        <GeneralSponsorColumn className="Melinda"
          pfp={melindapfp} 
          alt="Melinda Alankar Pfp" 
          name="Melinda Chow Alankar" 
          role="Director of Investment and Funding Opportunities">
        </GeneralSponsorColumn>
      </div>

      <hr className='about-hr'></hr>

      <h2 className="our-team">Our Team</h2>

      <div className="row-one">
        <GeneralColumn className="Edie"
          pfp={ediepfp} 
          alt="Edie Haase Pfp" 
          name="Edie Haase" 
          role="Front End Developer" 
          text="Edie is pursing a major in computer science and a minor in environmental sustainability at Michigan State University." 
          email="haaseede@msu.edu" 
          link="https://www.linkedin.com/in/eden-haase-90b688212/" 
          buttontext="LinkedIn">
        </GeneralColumn>

        <GeneralColumn className="Jack"
          pfp={jackpfp} 
          alt="Jack Holscher Pfp" 
          name="Jack Holscher" 
          role="Front End Developer" 
          text="Jack Holscher, a fourth-year MSU computer science major, complemented by a minor in data science and a cognate in psychology." 
          email="holsche2@msu.edu" 
          link="https://www.linkedin.com/in/jackson-holscher/" 
          buttontext="LinkedIn">
        </GeneralColumn>

        <GeneralColumn className="Nick"
          pfp={nickpfp} 
          alt="Nick Wang Pfp" 
          name="Nick Wang" 
          role="Front End Developer" 
          text="Nick Wang is a senior Computer Science student at MSU with a minor in Cognitive Science pursuing a career in Software Engineering." 
          email="wangnich@msu.edu" 
          link="https://www.linkedin.com/in/nicholas-wang7190/" 
          buttontext="LinkedIn">
        </GeneralColumn>
      </div>

      <div className="row-two">
        <GeneralColumn className="Ishita"
          pfp={ishitapfp} 
          alt="Ishita Kokil Pfp" 
          name="Ishita Kokil" 
          role="Back End Developer" 
          text="Ishita is pursuing a dual degree in Computer Science and Data Science at Michigan State University." 
          email="kokilish@msu.edu" 
          link="https://www.linkedin.com/in/ishitakokil/" 
          buttontext="LinkedIn">
        </GeneralColumn>

        <GeneralColumn className="Hemanth"
          pfp={hemanthpfp} 
          alt="Hemanth Yalamanchili Pfp" 
          name="Hemanth Yalamanchili" 
          role="Back End Developer" 
          text="Hemanth Yalamanchili, a passionate computer science student with a minor in game design and development at Michigan State University." 
          email="yalama12@msu.edu" 
          link="https://hemanthyalamanchili.com/" 
          buttontext="Website">
        </GeneralColumn>
      </div>

      <hr className="about-hr"></hr>

      <div className="bottom-text">
        <h1 className="about-title">Our Design Day Booklet Page</h1>
      </div>
      
      <DesignDayPage></DesignDayPage>
    </div>
  )
}

export default About


/**
 * General profile pic
 * 
 * @returns The image as an HTML element
 */
function GeneralPfp(props) {
  return (
    <a href="/">
      <img 
        src={props.src}
        alt={props.alt}
        loading="lazy"
        id="pfp"
      />
    </a>
  )
}

/**
 * General personal card element
 * 
 * @returns The image as an HTML element
 */
function GeneralColumn(props) {
  return (
    <div className="column">
    <div className="card">
    <GeneralPfp src={props.pfp} alt={props.alt}></GeneralPfp>
      <div className="containerr">
        <h2 className="name">{props.name}</h2>
        <p className="role">{props.role}</p>
        <p>{props.text}</p>
        <p>{props.email}</p>
        <p><a href={props.link} target="_blank" className="button">{props.buttontext}</a></p>
      </div>
    </div>
  </div>
  )
}


/**
 * General sponsor card element
 * 
 * @returns The image as an HTML element
 */
function GeneralSponsorColumn(props) {
  return (
    <div className="column">
      <div className="card">
        <GeneralPfp src={props.pfp} alt={props.alt}></GeneralPfp>
        <div className="containerr">
          <h2 className="name">{props.name}</h2>
          <p className="role">{props.role}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Design day document image
 * 
 * @returns The image as an HTML element
 */
function DesignDayPage() {
  return (
    <a href="/">
      <img 
        src={designdaypage}
        alt="Design Day Page"
        loading="lazy"
        id="ddp"
      />
    </a>
  )
}