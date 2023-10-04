import React from 'react'
import "./About.css"
import ediepfp from "../../assets/ediepfp.jpeg"
import hemanthpfp from "../../assets/hemanthpfp.jpeg"
import nickpfp from "../../assets/nickpfp.jpeg"
import ishitapfp from "../../assets/ishitapfp.jpeg"
import jackpfp from "../../assets/jackpfp.jpeg"

function About() {
  return (
    <div>
      <div class="top-text">
        <h1>About Us</h1>
        <p>We are a group of Michigan State Students and made this website for our capstone project.... </p>
      </div>
      <hr class="about-hr"></hr>

        <h2 class="our-team">Our Team</h2>

        <div class="row-one">
          <div class="column">
            <div class="card">
              <EdiePfp></EdiePfp>
              <div class="containerr">
                <h2 class="name">Edie Haase</h2>
                <p class="role">Front End Developer</p>
                <p>Edie please fill in some text about you here if you want</p>
                <p>haaseede@msu.edu</p>
                <p><a href="https://google.com" target="_blank" class="button">LinkedIn</a></p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <JackPfp></JackPfp>
              <div class="containerr">
                <h2 class="name">Jack Holsher</h2>
                <p class="role">Front End Developer</p>
                <p>Jack please fill in some text about you here if you want</p>
                <p>holsche2@msu.edu</p>
                <p><a href="https://google.com" target="_blank" class="button">LinkedIn</a></p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <NickPfp></NickPfp>
              <div class="containerr">
                <h2 class="name">Nick Wang</h2>
                <p class="role">Front End Developer</p>
                <p>Nick please fill in some text about you here if you want</p>
                <p>wangnich@msu.edu</p>
                <p><a href="https://google.com" target="_blank" class="button">LinkedIn</a></p>
              </div>
            </div>
          </div>
        </div>


        <div class="row-two">
          <div class="column">
            <div class="card">
              <IshitaPfp></IshitaPfp>
              <div class="containerr">
                <h2 class="name">Ishita Kokil</h2>
                <p class="role">Back End Develeoper</p>
                <p>Ishita please fill in some text about you here if you want</p>
                <p>kokilish@msu.edu</p>
                <p><a href="https://google.com" target="_blank" class="button">LinkedIn</a></p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <HemanthPfp></HemanthPfp>
              <div class="containerr">
                <h2 class="name">Hemanth Yalamanchili</h2>
                <p class="role">Back End Developer</p>
                <p>Hemanth please fill in some text about you here if you want</p>
                <p>yalama12@msu.edu</p>
                <div>
                <p><a href="https://google.com" target="_blank" class="button">Website</a></p>

                </div>
              </div>
            </div>
          </div>
        </div>

        <hr></hr>


        <h2>Project overview</h2>
        <h2>Motivation?</h2>
        <h2>Methodology</h2>
        <h3>Algae Blooms</h3>
        <h3>Reforestation</h3>
        <h3>DAC</h3>
        <h2>Design Day Page</h2>
      </div>

  )
}

export default About

/**
 * Edie's picture in the about us page
 * 
 * @returns The image as an HTML element
 */
function EdiePfp() {
  return (
    <a href="/">
      <img 
        src={ediepfp}
        alt="Edie Haase"
        loading="lazy"
        id="pfp"
      />
    </a>
  )
}

/**
 * Nick's picture in the about us page
 * 
 * @returns The image as an HTML element
 */
function NickPfp() {
  return (
    <a href="/">
      <img 
        src={nickpfp}
        alt="Nick Wang"
        loading="lazy"
        id="pfp"
      />
    </a>
  )
}

/**
 * Jack's picture in the about us page
 * 
 * @returns The image as an HTML element
 */
function JackPfp() {
  return (
    <a href="/">
      <img 
        src={jackpfp}
        alt="Jack Holsher"
        loading="lazy"
        id="pfp"
      />
    </a>
  )
}

/**
 * Hemanths's picture in the about us page
 * 
 * @returns The image as an HTML element
 */
function HemanthPfp() {
  return (
    <a href="/">
      <img 
        src={hemanthpfp}
        alt="Hemanth Yalamanchili"
        loading="lazy"
        id="pfp"
      />
    </a>
  )
}

/**
 * Ishita's picture in the about us page
 * 
 * @returns The image as an HTML element
 */
function IshitaPfp() {
  return (
    <a href="/">
      <img 
        src={ishitapfp}
        alt="Ishita Kokil"
        loading="lazy"
        id="pfp"
      />
    </a>
  )
}