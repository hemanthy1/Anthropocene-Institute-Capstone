import "./Heatmap.css";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Link } from "react-router-dom";

/**
 * 
 * Defines the interactive heatmap component containing the best locations
 * to implement the reforestation carbon removal technology.
 * Also includes the more info box and the search bar features
 * 
 * @param {*} props Data object containing the heatmap colors
 * @returns The reforestation map component
 */
function ChoroplethMap(props) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const zoomThreshold = 3;
  const [geojsonData, setGeojsonData] = useState(null);
  const [legendDisplay] = useState("block");

  // Fetch GeoJSON data
  useEffect(() => {
    fetch("http://34.41.148.85/forestationstategeojson.geojson")
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);
  

  // Initialize the map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbjJjaWllNzAwcDQyam1wYnF6NHQ0Z24ifQ.TYll92t4SavsRHHFUhU-UA";

    const initializeMap = ({ setMap, mapContainer }) => {
     

      if (mapContainer && !mapContainer.current.classList.contains('mapboxgl-map')) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-98, 38.88],
        minZoom: 1,
        zoom: 2.2,
      });

      newMap.on("load", () => {
        setMap(newMap);
        newMap.resize();
        
      });
    }
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  // Load GeoJSON into the map
  useEffect(() => {
    if (map && geojsonData) {
      if (map.getSource("state")) {
        // If it does, update its data
        map.getSource("state").setData(geojsonData);
      } else {
        map.addSource("state", {
          type: "geojson",
          data: geojsonData,
          promoteId: "NAME",
        });

        map.addLayer({
          id: "state-data",
          source: "state",
          // 'source-layer': 'stateReforestation-ad4r41',  // vector tileset name
          maxzoom: zoomThreshold,
          type: "fill",
          filter: ["==", "isState", "yes"],
          paint: {
            "fill-color": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              "#ffe37a", // Color to use when the condition is true (clicked)
              ["boolean", ["feature-state", "click"], false],
              "#ffe37a", // Color to use when the condition is true (clicked)
              [
                "interpolate",
                ["linear"],
                ["get", "class"],
                0,
                props.colors.color0,
                1,
                props.colors.color1,
                2,
                props.colors.color2,
                3,
                props.colors.color3,
                4,
                props.colors.color4,
                5,
                props.colors.color5,
                6,
                props.colors.color6,
                7,
                props.colors.color7,
              ],
            ],
            "fill-opacity": 0.85,
          },
        });

        // define boundary lines for states so that
        // divisions are always obvious regardless of zoom
        map.addLayer({
          id: "state-boundaries",
          source: "state",
          type: "line",
          paint: {
            "line-color": "#000",
            "line-width": 0.1,
          },
        });
      }
 
      let stateHoveredPolygonId = null;
      let stateClickedPolygonId = null;
      let countyHoveredPolygonId = null;
      let countyClickedPolygonId = null;
      map.getCanvas().style.cursor = "pointer";
      if (map.getLayer('state-data')) {

      map.on("mousemove", "state-data",(e) => {
        // console.log("hovering")
        const properties = e.features[0].properties;

        // the current features properties
        const countyName = properties["NAME"];
        if (stateHoveredPolygonId !== null) {
          // Reset the state of the previously clicked feature
          map.setFeatureState(
            { source: "state", id: stateHoveredPolygonId },
            { hover: false }

          );
        }

        // Set the state of the clicked feature to 'click'
        stateHoveredPolygonId = e.features[0].id;
        if(stateHoveredPolygonId!==null){console.log(stateHoveredPolygonId)}
        map.setFeatureState(
          { source: "state", id: stateHoveredPolygonId },
          { hover: true }
        );
        });
        
      // When the map is clicked display a popup

      map.on("click", "state-data", (e) => {
        // the span elements used in the sidebar
        const nameDisplay = document.getElementById("name");
        const costDisplay = document.getElementById("cost");
        const landDisplay = document.getElementById("land");
        const zDisplay = document.getElementById("z");
        const popDisplay = document.getElementById("pop");
        const preDisplay = document.getElementById("pre");
        const tempDisplay = document.getElementById("temp");
        
        // the properties of the feature
        const properties = e.features[0].properties;

        // the current features properties
        const stateName = properties["NAME"];
        const stateCost = parseFloat(properties["cost"]);
        const stateLand = parseFloat(properties["land"]);
        const stateZ = parseFloat(properties["palmer"]);
        const statePop = parseFloat(properties["population"]);
        const statePre = parseFloat(properties["precipitation"]);
        const stateTemp = parseFloat(properties["temperature"]);

        // Function to format currency with dollar sign and commas
        function formatCurrency(value) {
          return (
            "$" + value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          );
        }

        //Function to format percent
        function formatPercent(value) {
          value = value * 100;
          return value.toFixed(0) + "%";
        }

        // Function to add commas as thousands separators
        function addCommas(value) {
          return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }

        // Display the property values
        nameDisplay.textContent = stateName;
        costDisplay.textContent = formatPercent(stateCost);
        landDisplay.textContent = formatCurrency(stateLand);
        zDisplay.textContent = stateZ.toFixed(2);
        popDisplay.textContent = addCommas(statePop);
        preDisplay.textContent = statePre.toFixed(2);
        tempDisplay.textContent = stateTemp.toFixed(2);
        if (stateClickedPolygonId !== null) {
          // Reset the state of the previously clicked feature
          map.setFeatureState(
            { source: "state", id: stateClickedPolygonId },
            { click: false }
          );
        }

        // Set the state of the clicked feature to 'click'
        stateClickedPolygonId = e.features[0].id;
        if (stateClickedPolygonId !== null) {
          console.log(stateClickedPolygonId);
        }
        map.setFeatureState(
          { source: "state", id: stateClickedPolygonId },
          { click: true }
        );
        
      });

      

        map.on("mouseleave", "state-data", () => {
          map.getCanvas().style.cursor = '';
  
          if (stateHoveredPolygonId !== null) {
            map.setFeatureState(
              { source: "state", id: stateHoveredPolygonId },
              { hover: false }
            );
          }
          stateHoveredPolygonId = null;
        
          map.getCanvas().style.cursor = '';
        });
    }
  }}, [map, geojsonData]);

  return (
    <div>
    {isLoading && <div className="loading-overlay">Loading...
    
    </div>} 
    
    <div ref={mapContainer} className="map-container">
      <div className="info-section">
        <div className="state-name">
          <span id="name"></span>
        </div>
        <hr className="name-line" />
        <div>
          <strong>Cost Efficiency:</strong> <span id="cost"></span>
        </div>
        <div>
          <strong>Land prices:</strong> <span id="land"></span>
        </div>
        <div>
          <strong>Palmer-z index:</strong> <span id="z"></span>
        </div>
        <div>
          <strong>Population:</strong> <span id="pop"></span>
        </div>
        <div>
          <strong>Precipitation:</strong> <span id="pre"></span>
        </div>
        <div>
          <strong>Temperature:</strong> <span id="temp"></span>
        </div>
        <Link to="/moreinfo">More Info</Link>
      </div>

      <div id="legend" className="legend" style={{ display: legendDisplay }}>
        <h4>Cost Efficency</h4>
        <h3>Most</h3>
        <div>
          <span
            className="b723122"
            style={{ backgroundColor: props.colors.color7 }}
          ></span>
        </div>
        <div>
          <span
            className="b8b4225"
            style={{ backgroundColor: props.colors.color6 }}
          ></span>
        </div>
        <div>
          <span
            className="ba25626"
            style={{ backgroundColor: props.colors.color5 }}
          ></span>
        </div>
        <div>
          <span
            className="bb86b25"
            style={{ backgroundColor: props.colors.color4 }}
          ></span>
        </div>
        <div>
          <span
            className="bca8323"
            style={{ backgroundColor: props.colors.color3 }}
          ></span>
        </div>
        <div>
          <span
            className="bda9c20"
            style={{ backgroundColor: props.colors.color2 }}
          ></span>
        </div>
        <div>
          <span
            className="be6b71e"
            style={{ backgroundColor: props.colors.color1 }}
          ></span>
        </div>
        <h3>Least</h3>
      </div>
    </div>
    </div>
  );
}

export default ChoroplethMap;
