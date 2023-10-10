import React from 'react'
import "./Data.css"

function Data() {

  const links = {
    link1: "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/county/mapping",
    link2: "https://www.acrevalue.com/map/",
    link3: "https://www.census.gov/data/tables/time-series/demo/popest/2020s-counties-total.html"
  };

  const titles = {
    title1: "NCEI - NOAA: Climate Data at the County Level - Average Temperature, Precipitation, Palmer-Z Index",
    title2: "Land Prices by County - AcreValue.com",
    title3: "Population by County - Census.gov"
  }

  const descs = {
    desc1: "NOAA National Centers for Environmental information, \
            Climate at a Glance: County Mapping, published September 2023, \
            retrieved on October 4, 2023 from \
            https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/county/mapping",
    desc2: "Discover Land Values. acrevalue.com. (n.d.). https://www.acrevalue.com/map/ ",
    desc3: "Bureau, U. C. (2023, June 13). County population totals and components of \
            change: 2020-2022. Census.gov. \
            https://www.census.gov/data/tables/time-series/demo/popest/2020s-counties-total.html"
  }

  return (
    <div id="data-page">
      <div id="data-intro">
        <h2> Data Sources </h2>
        <h3> 
          In the effort to provide complete transparency and to ensure reliable outcomes,
          we've provided a comprehensive list of the different data sources that power
          the Carbon Mapp's machine learning models. These datasets have been carefully
          chosen and utilized to offer the most accurate and dependable insights. By accessing
          the links below, you can dive deeper into the origins of the data, understanding the
          basis of our models' predictions and results. 
        </h3>
        <hr id="intro-sep"/>
      </div>

      <div id="data-links-wrap">
      <DataLink 
        className="data-link"
        link={links.link1} 
        title={titles.title1} 
        desc={descs.desc1} 
        bg="var(--primary)" 
        tc="white"
      />

      <DataLink 
        className="data-link"
        link={links.link2} 
        title={titles.title2} 
        desc={descs.desc2} 
        bg="white" 
        tc="var(--secondary)"
      />

      <DataLink
        className="data-link"
        link={links.link3}
        title={titles.title3}
        desc={descs.desc3}
        bg="var(--primary)"
        tc="white"
      />
      
      {/* 
      
      Examples for how to add extra links:
      
      <DataLink link={links.link3} title="test3" desc="test desc3" bg="var(--primary)" tc="white"/>
      <DataLink link={links.link4} title="test4" desc="test desc4" bg="white" tc="var(--secondary)"/> 
      
      */}

      </div>
    </div>
  );
}

function DataLink(props) {

  const styles = {
    backgroundColor: props.bg,
    color: props.tc,
    boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.175)",
    margin: "1rem 0",
    height: "20vh",
    padding: "1rem"
  };

  return (
    <a href={props.link} target="_blank">
      <div className="data-link-content" style={styles}>

        <h4 className="data-link-header"> {props.title} </h4>
        <p className="data-link-desc"> {props.desc} </p>
      </div>
    </a>
  );
}

export default Data;