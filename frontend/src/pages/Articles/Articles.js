import React from 'react'
import "./Articles.css"
import ArticleLink from '../../components/ArticleLink/ArticleLink'
import article1 from '../../assets/article1.jpeg'
import article2 from '../../assets/article2.jpeg'
import article3 from '../../assets/article3.webp'
import article4 from "../../assets/article4.png"
import article5 from "../../assets/article5.jpeg"
import article6 from "../../assets/article6.jpeg"
import article7 from "../../assets/article7.jpeg"
import article8 from "../../assets/article8.png"


function Articles() {

  const links = {
    link1: "https://www.wri.org/insights/direct-air-capture-resource-considerations-and-costs-carbon-removal",
    link2: "https://earth.org/kelp-forests-carbon-sequestration",
    link3: "https://www.american.edu/sis/centers/carbon-removal/fact-sheet-forestation.cfm",
    link4: "https://anthinst003.wpengine.com/about/",
    link5: "https://oceanacidification.noaa.gov/carbon-dioxide-removal/",
    link6: "https://anthropoceneinstitute.com/2023/07/oppenheimer-manhattan-project/",
    link7: "https://www.nytimes.com/interactive/2022/10/26/magazine/climate-change-warming-world.html",
    link8: "http://www.capstone.cse.msu.edu/2023-08/projects/anthropocene-institute/"
  }

  return (
      <>
        <h2 className="articles-title"> Articles </h2>
        <div className='articles'>
            <ArticleLink link={links.link1} image={article1}>
            Direct Air Capture - Learn More!
            </ArticleLink>
            <ArticleLink link={links.link2} image={article2}>
            Kelp Farms - Learn More!
            </ArticleLink>
            <ArticleLink link={links.link3} image={article3}>
            Reforestation - Learn More!
            </ArticleLink>
            <ArticleLink link={links.link4} image={article4}>
            More About the Anthropocene Institute
            </ArticleLink>
            <ArticleLink link={links.link5} image={article5}>
            The Importance of Carbon Dioxide Removal (CDR)
            </ArticleLink>
            <ArticleLink link={links.link6} image={article6}>
            Oppenheimer: Manhattan Project for a Decarbonized Future
            </ArticleLink>
            <ArticleLink link={links.link7} image={article7}>
            The Reality of the Climate Crisis
            </ArticleLink>
            <ArticleLink link={links.link8} image={article8}>
            Check Out the Capstone Experience at MSU!
            </ArticleLink>
        </div>
    </>
  )
}

export default Articles