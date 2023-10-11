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
        <div className="column">
          <div className="card">
          <GeneralPfp src={carlpfp} alt="Carl Page Pfp"></GeneralPfp>
            <div className="containerr">
              <h2 className="name">Carl Page</h2>
              <p className="role">President</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
          <GeneralPfp src={frankpfp} alt="Frank Ling Pfp"></GeneralPfp>
            <div className="containerr">
              <h2 className="name">Frank Hiroshi Ling</h2>
              <p className="role">Chief Scientist</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
          <GeneralPfp src={melindapfp} alt="Melinda Alankar Pfp"></GeneralPfp>
            <div className="containerr">
              <h2 className="name">Melinda Chow Alankar</h2>
              <p className="role">Director of Investment and Funding Opportunities</p>
            </div>
          </div>
        </div>
      </div>





        <h2 className="our-team">Our Team</h2>

        <div className="row-one">
          <div className="column">
            <div className="card">
            <GeneralPfp src={ediepfp} alt="Edie Haase Pfp"></GeneralPfp>
              <div className="containerr">
                <h2 className="name">Edie Haase</h2>
                <p className="role">Front End Developer</p>
                <p>Edie is pursing a major in computer science and a minor in environmental sustainability at Michigan State University </p>
                <p>haaseede@msu.edu</p>
                <p><a href="https://www.linkedin.com/in/eden-haase-90b688212/" target="_blank" className="button">LinkedIn</a></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
            <GeneralPfp src={jackpfp} alt="Jack Holscher Pfp"></GeneralPfp>
              <div className="containerr">
                <h2 className="name">Jack Holsher</h2>
                <p className="role">Front End Developer</p>
                <p>Jack Holscher, a fourth-year MSU computer science major, complemented by a minor in data science and a cognate in psychology.</p>
                <p>holsche2@msu.edu</p>
                <p><a href="https://www.linkedin.com/in/jackson-holscher/" target="_blank" className="button">LinkedIn</a></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
            <GeneralPfp src={nickpfp} alt="Nick Wang Pfp"></GeneralPfp>
              <div className="containerr">
                <h2 className="name">Nick Wang</h2>
                <p className="role">Front End Developer</p>
                <p>Nick Wang is a senior Computer Science student at MSU with a minor in Cognitive Science pursuing a career in Software Engineering.</p>
                <p>wangnich@msu.edu</p>
                <p><a href="https://www.linkedin.com/in/nicholas-wang7190/" target="_blank" className="button">LinkedIn</a></p>
              </div>
            </div>
          </div>
        </div>


        <div className="row-two">
          <div className="column">
            <div className="card">
            <GeneralPfp src={ishitapfp} alt="Ishita Kokil Pfp"></GeneralPfp>
              <div className="containerr">
                <h2 className="name">Ishita Kokil</h2>
                <p className="role">Back End Develeoper</p>
                <p>Ishita is pursuing a dual degree in Computer Science and Data Science at Michigan State University</p>
                <p>kokilish@msu.edu</p>
                <p><a href="https://www.linkedin.com/in/ishitakokil/" target="_blank" className="button">LinkedIn</a></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
            <GeneralPfp src={hemanthpfp} alt="Hemanth Yalamanchili Pfp"></GeneralPfp>
              <div className="containerr">
                <h2 className="name">Hemanth Yalamanchili</h2>
                <p className="role">Back End Developer</p>
                <p>Hemanth Yalamanchili, a passionate computer science student with a minor in game design and development at Michigan State University.</p>
                <p>yalama12@msu.edu</p>
                <div>
                <p><a href="https://hemanthyalamanchili.com/" target="_blank" className="button">Website</a></p>

                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="about-hr"></hr>



        <h2>Design Day Page</h2>
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