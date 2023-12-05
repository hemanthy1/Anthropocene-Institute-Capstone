import React from 'react'
import "./Data.css"

function Data() {

    const links = {
        link1: "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/county/mapping",
        link2: "https://www.acrevalue.com/map/",
        link3: "https://www.census.gov/data/tables/time-series/demo/popest/2020s-counties-total.html",
        link4: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a",
        link5: "https://drive.google.com/file/d/0BxjSQHrKLmoxVHRnRU9WQmRkeVk/view?resourcekey=0-3iIDU3zuL97omcO-m64LUw",
        link6: "https://tillable.camo.ag/land-value",
        link7: "https://essd.copernicus.org/articles/13/2777/2021/"
    };

    const titles = {
        title1: "NCEI - NOAA: Climate Data at the County Level - Average Temperature, Precipitation, Palmer-Z Index",
        title2: "Land Prices by County - AcreValue.com",
        title3: "Population by County - Census.gov",
        title4: "Electricity Cost by State - EIA",
        title5: "County Elevation Stats - Google Drive",
        title6: "Land Prices by County - Tillable.camo.ag",
        title7: "Depth, pH, Temperature of Costal Waters - Earth System Science Data"
    }

    const descs = {
        desc1: "NOAA National Centers for Environmental information, \
          Climate at a Glance: County Mapping, published September 2023, \
          retrieved on October 4, 2023 from \
          https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/county/mapping",
        desc2: "Discover Land Values. acrevalue.com. (n.d.). https://www.acrevalue.com/map/ ",
        desc3: "Bureau, U. C. (2023, June 13). County population totals and components of \
          change: 2020-2022. Census.gov. \
          https://www.census.gov/data/tables/time-series/demo/popest/2020s-counties-total.html",
        desc4: "U.S. Energy Information Administration. (n.d.). Electric Power Monthly - U.S. \
          Energy Information Administration (EIA). https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a",
        desc5: "Jay, S. (2015, January 12). County_elev_stats.zip. Google Drive. \
          https://drive.google.com/file/d/0BxjSQHrKLmoxVHRnRU9WQmRkeVk/view?resourcekey=0-3iIDU3zuL97omcO-m64LUw",
        desc6: "Tillable. (n.d.). Farm Real Estate - Browse, Buy, Sell, Rent; Finance Farmland. Land Value and Farm Prices \
          - Camo Ag. https://tillable.camo.ag/land-value",
        desc7: "Jiang, L.-Q., Feely, R. A., Wanninkhof, R., Greeley, D., Barbero, L., Alin, S., Carter, \
          B. R., Pierrot, D., Featherstone, C., Hooper, J., Melrose, C., Monacci, N., Sharp, J. D., Shellito, \
          S., Xu, Y.-Y., Kozyr, A., Byrne, R. H., Cai, W.-J., Cross, J., … Townsend, D. W. (2021, June 15). \
          Coastal Ocean Data Analysis Product in North America (CODAP-na) – an internally consistent data \
          product for discrete inorganic carbon, oxygen, and nutrients on the North American ocean margins. \
          Earth System Science Data. https://essd.copernicus.org/articles/13/2777/2021/"
    }

    return (
        <div id="data-page">
            <div id="data-intro">
                <h2 className="data-title"> Data Sources </h2>
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

                <DataLink 
                  className="data-link"
                  link={links.link4}
                  title={titles.title4}
                  desc={descs.desc4}
                  bg="white)"
                  tc="var(--secondary)"
                />

                <DataLink 
                  className="data-link"
                  link={links.link5}
                  title={titles.title5}
                  desc={descs.desc5}
                  bg="var(--primary)"
                  tc="white"
                />

                <DataLink 
                  className="data-link"
                  link={links.link6}
                  title={titles.title6}
                  desc={descs.desc6}
                  bg="white)"
                  tc="var(--secondary)"
                />

                <DataLink 
                  className="data-link"
                  link={links.link7}
                  title={titles.title7}
                  desc={descs.desc7}
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