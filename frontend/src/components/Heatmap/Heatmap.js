import "./Heatmap.css";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Link } from "react-router-dom";

function ChoroplethMap(props) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const zoomThreshold = 3;
  const [geojsonData, setGeojsonData] = useState(null);
  const [legendDisplay] = useState("block");

  // Fetch GeoJSON data
  useEffect(() => {
    fetch("http://34.42.91.15/hardcode.geojson")
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

        //             map.addLayer({
        //                 id: 'county-data',
        //                 source: 'county',
        //                 'source-layer': 'countyReforestation-dszxt3',  // vector tileset name
        //                 minzoom: zoomThreshold,
        //                 type: 'fill',
        //                 filter: ['==', 'isState', "no"],
        //                 paint: {
        //                     'fill-color': [
        //                         'case',
        //                         ['boolean', ['feature-state', 'hover'], false],
        //                         '#ffe37a', // Color to use when the condition is true (clicked)
        //                         ['boolean', ['feature-state', 'click'], false],
        //                         '#ffe37a', // Color to use when the condition is true (clicked)
        //                         [
        //                             'interpolate',
        //                             ['linear'],
        //                             ['get', 'class'],
        //                             0,
        //                             props.colors.color0,
        //                             1,
        //                             props.colors.color1,
        //                             2,
        //                             props.colors.color2,
        //                             3,
        //                             props.colors.color3,
        //                             4,
        //                             props.colors.color4,
        //                             5,
        //                             props.colors.color5,
        //                             6,
        //                             props.colors.color6,
        //                             7,
        //                             props.colors.color7
        //                         ] // Default color based on the 'class' property
        //                     ],
        //                     'fill-opacity': .85,
        //                 },
        //             });

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

        //             // define boundary lines for counties so that
        //             // divisions are always obvious regardless of zoom
        // map.addLayer({
        // id: 'county-boundaries',
        // source: 'county',
        // 'source-layer': 'countyReforestation-dszxt3',
        // type: 'line',
        // paint: {
        //     'line-color': '#000',
        //     'line-width': .1
        // }
        // });
      }

      // });
 
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
        // Commented out code that was used when we had the dropdown option
        //let dropdown = document.getElementById("dropdown");
        //let title = dropdown.options[dropdown.selectedIndex].text
        //title + ": " + e.features[0].properties[dropdown.value]
        // Get the feature's properties
        //The features at the coordinate that was picked

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

      

        // map.on("mouseleave", "state-data", () => {
        //   map.getCanvas().style.cursor = '';
  
        //   if (stateHoveredPolygonId !== null) {
        //     map.setFeatureState(
        //       { source: "state", id: stateHoveredPolygonId },
        //       { hover: false }
        //     );
        //   }
        //   stateHoveredPolygonId = null;
        
        //   map.getCanvas().style.cursor = '';
        // });

      

      // map.on('mousemove', 'county-data', (e) => {
      // if (countyHoveredPolygonId !== null) {
      // // Reset the state of the previously clicked feature in the 'county-data' layer
      // map.setFeatureState(
      //     {source: 'county', id: countyHoveredPolygonId},
      //     {hover: false}
      // );
      // }

      // Set the state of the hovered feature in the 'county-data' layer to 'hover'
      // countyHoveredPolygonId = e.features[0].id;
      // map.setFeatureState(
      // {source: 'county', id: countyHoveredPolygonId},
      // {hover: true}
      // );
      // // });
      // map.on('mouseleave', 'county-data', () => {
      // if (countyHoveredPolygonId !== null) {
      // map.setFeatureState(
      //     {source: 'county',  id: countyHoveredPolygonId},
      //     {hover: false}
      // );
      // }
      // countyHoveredPolygonId = null;
      // });
      // When the map is clicked display a popup
      // map.on('click', 'county-data', (e) => {

      // // the span elements used in the sidebar
      // const nameDisplay = document.getElementById('name');
      // const costDisplay = document.getElementById('cost');
      // const landDisplay = document.getElementById('land');
      // const zDisplay = document.getElementById('z');
      // const popDisplay = document.getElementById('pop');
      // const preDisplay = document.getElementById('pre');
      // const tempDisplay = document.getElementById('temp');

      // // the properties of the feature
      // const properties = e.features[0].properties;

      // // the current features properties
      // const countyName = properties['NAME'];
      // const countyCost = parseFloat(properties['cost']);
      // const countyLand = parseFloat(properties['land']);
      // const countyZ = parseFloat(properties['palmer']);
      // const countyPop = parseFloat(properties['population']);
      // const countyPre = parseFloat(properties['precipitation']);
      // const countyTemp = parseFloat(properties['temperature']);

      // // Function to format currency with dollar sign and commas
      // function formatCurrency(value) {
      // return '$' + value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      // }

      // //Function to format percent
      // function formatPercent(value) {
      // value = value * 100;
      // return value.toFixed(0) + '%';
      // }
      // // Function to add commas as thousands separators
      // function addCommas(value) {
      // return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      // }

      // // Display the property values
      // nameDisplay.textContent = countyName;
      // costDisplay.textContent = formatPercent(countyCost);
      // landDisplay.textContent = formatCurrency(countyLand);
      // zDisplay.textContent = countyZ.toFixed(2);
      // popDisplay.textContent = addCommas(countyPop);
      // preDisplay.textContent = countyPre.toFixed(2);
      // tempDisplay.textContent = countyTemp.toFixed(2);

      // if (countyClickedPolygonId !== null) {
      // // Reset the state of the previously clicked feature in the 'county-data' layer
      // map.setFeatureState(
      //     {source: 'county',  id: countyClickedPolygonId},
      //     {click: false}
      // );
      // }

      // // Set the state of the clicked feature in the 'county-data' layer to 'click'
      // countyClickedPolygonId = e.features[0].id;

      // map.setFeatureState(
      // {source: 'county',  id: countyClickedPolygonId},
      // {click: true}
      // );

      // });

      // map.on("mouseenter", "state-data", () => {
      //   map.getCanvas().style.cursor = "pointer";
      // });

      // map.on("mouseleave", "state-data", () => {
      //   map.getCanvas().style.cursor = "";
      // });
      
    }
  }}, [map, geojsonData]);

  return (
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
  );
}

export default ChoroplethMap;

// function ChoroplethMap(props) {

//     const mapContainer = useRef(null);
//     const [legendDisplay] = useState('block');
//     const zoomThreshold = 3;

//     useEffect(() => {
//         mapboxgl.accessToken = 'pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbjJjaWllNzAwcDQyam1wYnF6NHQ0Z24ifQ.TYll92t4SavsRHHFUhU-UA';

//         const map = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/light-v11',
//             center: [-98, 38.88],
//             minZoom: 2,
//             zoom: 2.2,
//         });
//         // Add Geocoder which creates the search bar
//         const geocoder = new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken,
//             mapboxgl: mapboxgl,
//         });

//         // Add the search bar to the heatmap
//         map.addControl(geocoder);

//         map.on('load', () => {
//             // state data vector tileset
//             map.addSource('state', {
//                 // type: 'vector',
//                 // url: "mapbox://jholsch29.6l4kskpb",
//                 // "promoteId": {"stateReforestation-ad4r41": "NAME"},

//                 type: 'geojson',
//                 data: "http://34.42.91.15/hardcode.geojson"

//             });

//             // county data vector tileset
//             map.addSource('county', {
//                 type: 'vector',
//                 url: "mapbox://jholsch29.7n25de6t",
//                 "promoteId": {"countyReforestation-dszxt3": "GEO_ID"},
//             });

//             // add choropleth layer for state level
//             map.addLayer({
//                 id: 'state-data',
//                 source: 'state',
//                 // 'source-layer': 'stateReforestation-ad4r41',  // vector tileset name
//                 maxzoom: zoomThreshold,
//                 type: 'fill',
//                 filter: ['==', 'isState', "yes"],
//                 paint: {
//                     'fill-color': [
//                         'case',
//                         ['boolean', ['feature-state', 'hover'], false],
//                         '#ffe37a', // Color to use when the condition is true (clicked)
//                         ['boolean', ['feature-state', 'click'], false],
//                         '#ffe37a', // Color to use when the condition is true (clicked)
//                         [
//                             'interpolate',
//                             ['linear'],
//                             ['get', 'class'],
//                             0,
//                             props.colors.color0,
//                             1,
//                             props.colors.color1,
//                             2,
//                             props.colors.color2,
//                             3,
//                             props.colors.color3,
//                             4,
//                             props.colors.color4,
//                             5,
//                             props.colors.color5,
//                             6,
//                             props.colors.color6,
//                             7,
//                             props.colors.color7
//                         ]
//                     ],
//                     'fill-opacity': .85
//                 },

//             });

//             map.addLayer({
//                 id: 'county-data',
//                 source: 'county',
//                 'source-layer': 'countyReforestation-dszxt3',  // vector tileset name
//                 minzoom: zoomThreshold,
//                 type: 'fill',
//                 filter: ['==', 'isState', "no"],
//                 paint: {
//                     'fill-color': [
//                         'case',
//                         ['boolean', ['feature-state', 'hover'], false],
//                         '#ffe37a', // Color to use when the condition is true (clicked)
//                         ['boolean', ['feature-state', 'click'], false],
//                         '#ffe37a', // Color to use when the condition is true (clicked)
//                         [
//                             'interpolate',
//                             ['linear'],
//                             ['get', 'class'],
//                             0,
//                             props.colors.color0,
//                             1,
//                             props.colors.color1,
//                             2,
//                             props.colors.color2,
//                             3,
//                             props.colors.color3,
//                             4,
//                             props.colors.color4,
//                             5,
//                             props.colors.color5,
//                             6,
//                             props.colors.color6,
//                             7,
//                             props.colors.color7
//                         ] // Default color based on the 'class' property
//                     ],
//                     'fill-opacity': .85,
//                 },
//             });

//             // define boundary lines for states so that
//             // divisions are always obvious regardless of zoom
//             map.addLayer({
//                 id: 'state-boundaries',
//                 source: 'state',
//                 'source-layer': 'stateReforestation-ad4r41',
//                 type: 'line',
//                 paint: {
//                     'line-color': '#000',
//                     'line-width': .1
//                 }
//             });

//             // define boundary lines for counties so that
//             // divisions are always obvious regardless of zoom
//             map.addLayer({
//                 id: 'county-boundaries',
//                 source: 'county',
//                 'source-layer': 'countyReforestation-dszxt3',
//                 type: 'line',
//                 paint: {
//                     'line-color': '#000',
//                     'line-width': .1
//                 }
//             });

//         });

//         let stateHoveredPolygonId = null;
//         let stateClickedPolygonId = null;
//         let countyHoveredPolygonId = null;
//         let countyClickedPolygonId = null;
//         // When the map is clicked display a popup
//         map.on('click', 'state-data', (e) => {
//             // Commented out code that was used when we had the dropdown option
//             //let dropdown = document.getElementById("dropdown");
//             //let title = dropdown.options[dropdown.selectedIndex].text
//             //title + ": " + e.features[0].properties[dropdown.value]
//             // Get the feature's properties
//             //The features at the coordinate that was picked

//             // the span elements used in the sidebar
//             const nameDisplay = document.getElementById('name');
//             const costDisplay = document.getElementById('cost');
//             const landDisplay = document.getElementById('land');
//             const zDisplay = document.getElementById('z');
//             const popDisplay = document.getElementById('pop');
//             const preDisplay = document.getElementById('pre');
//             const tempDisplay = document.getElementById('temp');

//             // the properties of the feature
//             const properties = e.features[0].properties;

//             // the current features properties
//             const stateName = properties['NAME'];
//             const stateCost = parseFloat(properties['cost']);
//             const stateLand = parseFloat(properties['land']);
//             const stateZ = parseFloat(properties['palmer']);
//             const statePop = parseFloat(properties['population']);
//             const statePre = parseFloat(properties['precipitation']);
//             const stateTemp = parseFloat(properties['temperature']);

//             // Function to format currency with dollar sign and commas
//             function formatCurrency(value) {
//                 return '$' + value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//             }

//             //Function to format percent
//             function formatPercent(value) {
//                 value = value * 100;
//                 return value.toFixed(0) + '%';
//             }

//             // Function to add commas as thousands separators
//             function addCommas(value) {
//                 return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//             }

//             // Display the property values
//             nameDisplay.textContent = stateName;
//             costDisplay.textContent = formatPercent(stateCost);
//             landDisplay.textContent = formatCurrency(stateLand);
//             zDisplay.textContent = stateZ.toFixed(2);
//             popDisplay.textContent = addCommas(statePop);
//             preDisplay.textContent = statePre.toFixed(2);
//             tempDisplay.textContent = stateTemp.toFixed(2);

//             if (stateClickedPolygonId !== null) {
//                 // Reset the state of the previously clicked feature
//                 map.setFeatureState(
//                     {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateClickedPolygonId},
//                     {click: false}
//                 );
//             }
//             // Set the state of the clicked feature to 'click'
//             stateClickedPolygonId = e.features[0].id;
//             map.setFeatureState(
//                 {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateClickedPolygonId},
//                 {click: true}
//             );

//         });

//         map.on('mousemove', 'state-data', (e) => {
//             const properties = e.features[0].properties;

//             // the current features properties
//             const countyName = properties['NAME'];
//             if (stateHoveredPolygonId !== null) {
//                 // Reset the state of the previously clicked feature
//                 map.setFeatureState(
//                     {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateHoveredPolygonId},
//                     {hover: false}
//                 );
//             }

//             // Set the state of the clicked feature to 'click'
//             stateHoveredPolygonId = e.features[0].id;
//             map.setFeatureState(
//                 {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateHoveredPolygonId},
//                 {hover: true}
//             );

//         });

//         map.on('mouseleave', 'state-data', () => {
//             if (stateHoveredPolygonId !== null) {
//                 map.setFeatureState(
//                     {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateHoveredPolygonId},
//                     {hover: false}
//                 );
//             }
//             stateHoveredPolygonId = null;
//         });

//         map.on('mousemove', 'county-data', (e) => {
//             if (countyHoveredPolygonId !== null) {
//                 // Reset the state of the previously clicked feature in the 'county-data' layer
//                 map.setFeatureState(
//                     {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyHoveredPolygonId},
//                     {hover: false}
//                 );
//             }

//             // Set the state of the hovered feature in the 'county-data' layer to 'hover'
//             countyHoveredPolygonId = e.features[0].id;
//             map.setFeatureState(
//                 {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyHoveredPolygonId},
//                 {hover: true}
//             );
//         });
//         map.on('mouseleave', 'county-data', () => {
//             if (countyHoveredPolygonId !== null) {
//                 map.setFeatureState(
//                     {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyHoveredPolygonId},
//                     {hover: false}
//                 );
//             }
//             countyHoveredPolygonId = null;
//         });
//         // When the map is clicked display a popup
//         map.on('click', 'county-data', (e) => {

//             // the span elements used in the sidebar
//             const nameDisplay = document.getElementById('name');
//             const costDisplay = document.getElementById('cost');
//             const landDisplay = document.getElementById('land');
//             const zDisplay = document.getElementById('z');
//             const popDisplay = document.getElementById('pop');
//             const preDisplay = document.getElementById('pre');
//             const tempDisplay = document.getElementById('temp');

//             // the properties of the feature
//             const properties = e.features[0].properties;

//             // the current features properties
//             const countyName = properties['NAME'];
//             const countyCost = parseFloat(properties['cost']);
//             const countyLand = parseFloat(properties['land']);
//             const countyZ = parseFloat(properties['palmer']);
//             const countyPop = parseFloat(properties['population']);
//             const countyPre = parseFloat(properties['precipitation']);
//             const countyTemp = parseFloat(properties['temperature']);

//             // Function to format currency with dollar sign and commas
//             function formatCurrency(value) {
//                 return '$' + value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//             }

//             //Function to format percent
//             function formatPercent(value) {
//                 value = value * 100;
//                 return value.toFixed(0) + '%';
//             }
//             // Function to add commas as thousands separators
//             function addCommas(value) {
//                 return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//             }

//             // Display the property values
//             nameDisplay.textContent = countyName;
//             costDisplay.textContent = formatPercent(countyCost);
//             landDisplay.textContent = formatCurrency(countyLand);
//             zDisplay.textContent = countyZ.toFixed(2);
//             popDisplay.textContent = addCommas(countyPop);
//             preDisplay.textContent = countyPre.toFixed(2);
//             tempDisplay.textContent = countyTemp.toFixed(2);

//             if (countyClickedPolygonId !== null) {
//                 // Reset the state of the previously clicked feature in the 'county-data' layer
//                 map.setFeatureState(
//                     {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyClickedPolygonId},
//                     {click: false}
//                 );
//             }

//             // Set the state of the clicked feature in the 'county-data' layer to 'click'
//             countyClickedPolygonId = e.features[0].id;

//             map.setFeatureState(
//                 {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyClickedPolygonId},
//                 {click: true}
//             );

//         });

//         map.on('mouseenter', 'county-data', () => {
//             map.getCanvas().style.cursor = 'pointer';
//         });

//         map.on('mouseleave', 'county-data', () => {
//             map.getCanvas().style.cursor = '';
//         });

//     }, []);

//     return (

//         <div ref={mapContainer} className="map-container">
//             <div className='info-section'>
//                 <div className='state-name'><span id='name'></span></div>
//                 <hr className='name-line'/>
//                 <div><strong>Cost Efficiency:</strong> <span id='cost'></span></div>
//                 <div><strong>Land prices:</strong> <span id='land'></span></div>
//                 <div><strong>Palmer-z index:</strong> <span id='z'></span></div>
//                 <div><strong>Population:</strong> <span id='pop'></span></div>
//                 <div><strong>Precipitation:</strong> <span id='pre'></span></div>
//                 <div><strong>Temperature:</strong> <span id='temp'></span></div>
//                 <Link to="/moreinfo">More Info</Link>
//             </div>

//             <div id="legend" className="legend" style={{display: legendDisplay}}>
//                 <h4>Cost Efficency</h4>
//                 <h3>Most</h3>
//                 <div><span className="b723122" style={{backgroundColor: props.colors.color7}}></span></div>
//                 <div><span className="b8b4225" style={{backgroundColor: props.colors.color6}}></span></div>
//                 <div><span className="ba25626" style={{backgroundColor: props.colors.color5}}></span></div>
//                 <div><span className="bb86b25" style={{backgroundColor: props.colors.color4}}></span></div>
//                 <div><span className="bca8323" style={{backgroundColor: props.colors.color3}}></span></div>
//                 <div><span className="bda9c20" style={{backgroundColor: props.colors.color2}}></span></div>
//                 <div><span className="be6b71e" style={{backgroundColor: props.colors.color1}}></span></div>
//                 <h3>Least</h3>
//             </div>
//         </div>

//     );
// }

// export default ChoroplethMap;

