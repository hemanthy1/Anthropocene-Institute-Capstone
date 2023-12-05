import "../ReforestationMap/ReforestationMap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import loadingSpinner from '../../assets/loading.gif';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Link} from "react-router-dom";

/**
 *
 * Defines the interactive heatmap component containing the best locations
 * to implement the direct air capture carbon removal technology.
 * Also includes the more info box and the search bar features
 *
 * @param {*} props Data object containing the heatmap colors
 * @returns The direct air capture map component
 */
function DACMap(props) {
    //Initializing the map constants
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const zoomThreshold = 3;
    const [legendDisplay] = useState("block");
    const [isLoading, setIsLoading] = useState(false); // New loading state

    useEffect(() => {
        //our mapbox api access token
        mapboxgl.accessToken =
            "pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbjJjaWllNzAwcDQyam1wYnF6NHQ0Z24ifQ.TYll92t4SavsRHHFUhU-UA";

        //initializing the map that will apear on the screen
        const initializeMap = ({setMap, mapContainer}) => {


            if (mapContainer && !mapContainer.current.classList.contains('mapboxgl-map')) {
                const newMap = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/light-v11",
                    center: [-98, 38.88],
                    minZoom: 1,
                    zoom: 2.2,
                });

                //Adds the search function to the map using an existing component
                // https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                });
                // add the searchbar to the map
                newMap.addControl(geocoder);
                //Where the map is located and how it is sized when it is rendered
                newMap.on("load", () => {
                    setMap(newMap);
                    newMap.resize();
                });
            }
        };
        // if there is no map then initialize it
        if (!map) initializeMap({setMap, mapContainer});
    }, [map]);

    //This adds the appropriate data
    useEffect(() => {
            if (map) {
                // fetching state outlines
                if (map.getSource("state")) {
                    // If it does, update its data
                    map.getSource("state").setData("http://34.133.43.211/dacstategeojson.geojson");

                }
                // fetching county outlines
                if (map.getSource("county")) {
                    // If it does, update its data
                    map.getSource("county").setData("http://34.133.43.211/daccountygeojson.geojson");
                }
                // fetching state classification data
                if (!map.getSource("state")) {
                    map.addSource("state", {
                        type: "geojson",
                        data: "http://34.133.43.211/dacstategeojson.geojson",
                        promoteId: "NAME",
                    });
                    // Add the classification state data as a layer to the map
                    map.addLayer({
                        id: "state-data",
                        source: "state",
                        // 'source-layer': 'stateReforestation-ad4r41',  // vector tileset name
                        // putting a threshold for when it switches to county data
                        maxzoom: zoomThreshold,
                        // fill the color
                        type: "fill",
                        filter: ["==", "isState", "yes"],
                        paint: {
                            // determining what color the state should be
                            "fill-color": [
                                "case",
                                ["boolean", ["feature-state", "hover"], false],
                                "#ffe37a", // When state is hovered on change it to yellow
                                ["boolean", ["feature-state", "click"], false],
                                "#ffe37a", // when the state is clicked on change it to a yellow color
                                [
                                    // if the state is not hovered or clicked on then determine the color
                                    // based on the classifications determined by the machine learning model
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
                            // making the colors less harsh
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

                //Add county level data to the map
                if (!map.getSource("county")) {
                    // set the loading to true so that we can have the loading gif
                    setIsLoading(true);

                    // add the county level source data
                    map.addSource("county", {
                        type: "geojson",
                        data: "http://34.133.43.211/daccountygeojson.geojson",
                        promoteId: "GEO_ID",
                    });
                    // adding the count-level data from the machine learning model
                    map.addLayer({
                        id: 'county-data',
                        source: 'county',
                        // Setting the minimum zoom threshold
                        // this allows this data to only show when the map is zoomed into the threshold
                        minzoom: zoomThreshold,
                        type: 'fill',
                        filter: ['==', 'isState', "no"],
                        paint: {
                            'fill-color': [
                                'case',
                                ['boolean', ['feature-state', 'hover'], false],
                                '#ffe37a', // When the county is hovered change the color to yellow
                                ['boolean', ['feature-state', 'click'], false],
                                '#ffe37a', // When the county is clicked change the color to yellow
                                [
                                    // If the county is not clicked or hover make the color correspond to
                                    // to the classificiation done by the machine learning model
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'class'],
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
                                    props.colors.color7
                                ] // Default color based on the 'class' property
                            ],
                            'fill-opacity': .85,
                        },
                    });
                    // adding the boundaries of the counties as a layer to the map
                    map.addLayer({
                        id: 'county-boundaries',
                        source: 'county',
                        type: 'line',
                        // it will only show when a user is zoomed in
                        // making it so the state and the counties will not both show at the same time
                        minzoom: zoomThreshold,
                        paint: {
                            'line-color': '#000',
                            'line-width': .1,
                            'line-opacity': 0.5
                        }
                    });
                }

                // initial state of the states and counties is that they are not hovered or clicked
                let stateHoveredPolygonId = null;
                let stateClickedPolygonId = null;
                let countyHoveredPolygonId = null;
                let countyClickedPolygonId = null;
                // change the curser to a pointer
                map.getCanvas().style.cursor = "pointer";
                // Changing the loading sate to false when the data is done loading
                map.once('idle', () => {
                    setIsLoading(false)
                });

                if (map.getLayer('state-data')) {

                    // What to do when a polygon is hovered
                    map.on("mousemove", "state-data", (e) => {
                        // grabbing the properties of the hovered polygon
                        const properties = e.features[0].properties;

                        // the current features properties
                        const countyName = properties["NAME"];
                        if (stateHoveredPolygonId !== null) {
                            // Reset the state of the previously clicked feature
                            map.setFeatureState(
                                {source: "state", id: stateHoveredPolygonId},
                                {hover: false}
                            );
                        }

                        // Set the state of the clicked feature to 'click'
                        stateHoveredPolygonId = e.features[0].id;
                        if (stateHoveredPolygonId !== null) {
                            console.log(stateHoveredPolygonId)
                        }
                        map.setFeatureState(
                            {source: "state", id: stateHoveredPolygonId},
                            {hover: true}
                        );
                    });
                    // What to do when a state is clicked
                    map.on("click", "state-data", (e) => {
                        //Function to format percent
                        function formatPercent(value) {
                            value = value * 100;
                            return value.toFixed(0) + '%';
                        }

                        // Function to add commas as thousands separators
                        function addCommas(value) {
                            return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                        }

                        function formatTemp(value) {
                            value = value.toFixed(2);
                            return value + "°F";
                        }

                        // the span elements used in the sidebar
                        const nameDisplay = document.getElementById('name');
                        const costDisplay = document.getElementById('cost');
                        const elecDisplay = document.getElementById('elec');
                        const elevDisplay = document.getElementById('elev');
                        const popDisplay = document.getElementById('pop');
                        const preDisplay = document.getElementById('pre');
                        const tempDisplay = document.getElementById('temp');

                        // the properties of the feature
                        const properties = e.features[0].properties;


                        // the current features properties
                        const stateName = properties['NAME'];
                        const stateCost = properties['cost'];
                        const stateElec = properties['electric'];
                        const stateElev = properties['elevation'];
                        const statePop = properties['population'];
                        const statePre = properties['precipitation'];
                        const stateTemp = properties['temperature'];

                        //catch if data is not found and display no data found
                        if (isNaN(stateCost)) {
                            costDisplay.textContent = "No Data Found";
                        } else {
                            costDisplay.textContent = formatPercent(stateCost);
                        }
                        if (isNaN(stateElec)) {
                            elecDisplay.textContent = "No Data Found";
                        } else {
                            elecDisplay.textContent = addCommas(stateElec);
                        }
                        if (isNaN(stateElev)) {
                            elevDisplay.textContent = "No Data Found";
                        } else {
                            elevDisplay.textContent = addCommas(stateElev);
                        }
                        if (isNaN(statePop)) {
                            popDisplay.textContent = "No Data Found";
                        } else {
                            popDisplay.textContent = addCommas(statePop);
                        }
                        if (isNaN(statePre)) {
                            preDisplay.textContent = "No Data Found";
                        } else {
                            preDisplay.textContent = addCommas(statePre);
                        }
                        if (isNaN(stateTemp)) {
                            tempDisplay.textContent = "No Data Found";
                        } else {
                            tempDisplay.textContent = formatTemp(stateTemp);
                        }

                        //display the property values
                        nameDisplay.textContent = stateName;


                        if (stateClickedPolygonId !== null) {
                            // Reset the state of the previously clicked feature
                            map.setFeatureState(
                                {source: 'state', id: stateClickedPolygonId},
                                {click: false}
                            );
                        }
                        // Set the state of the clicked feature to 'click'
                        stateClickedPolygonId = e.features[0].id;
                        map.setFeatureState(
                            {source: 'state', id: stateClickedPolygonId},
                            {click: true}
                        );

                    });

                    //change the color when hovered over
                    map.on('mousemove', 'state-data', (e) => {

                        if (stateHoveredPolygonId !== null) {
                            // Reset the state of the previously clicked feature
                            map.setFeatureState(
                                {source: 'state', id: stateHoveredPolygonId},
                                {hover: false}
                            );
                        }

                        // Set the state of the clicked feature to 'click'
                        stateHoveredPolygonId = e.features[0].id;
                        map.setFeatureState(
                            {source: 'state', id: stateHoveredPolygonId},
                            {hover: true}
                        );

                    });

                    //reset the color of the state after it is no longer being hovered
                    map.on('mouseleave', 'state-data', () => {
                        if (stateHoveredPolygonId !== null) {
                            map.setFeatureState(
                                {source: 'state', id: stateHoveredPolygonId},
                                {hover: false}
                            );
                        }
                        stateHoveredPolygonId = null;
                    });

                    //hover state for the county data
                    map.on('mousemove', 'county-data', (e) => {
                        if (countyHoveredPolygonId !== null) {
                            // Reset the state of the previously clicked feature in the 'county-data' layer
                            map.setFeatureState(
                                {source: 'county', id: countyHoveredPolygonId},
                                {hover: false}
                            );
                        }

                        // Set the state of the hovered feature in the 'county-data' layer to 'hover'
                        countyHoveredPolygonId = e.features[0].id;
                        map.setFeatureState(
                            {source: 'county', id: countyHoveredPolygonId},
                            {hover: true}
                        );
                    });

                    //resetting the color on the county when no longer hovered
                    map.on('mouseleave', 'county-data', () => {
                        if (countyHoveredPolygonId !== null) {
                            map.setFeatureState(
                                {source: 'county', id: countyHoveredPolygonId},
                                {hover: false}
                            );
                        }
                        countyHoveredPolygonId = null;
                    });
                    // When the map is clicked display a popup
                    map.on('click', 'county-data', (e) => {
                        //Function to format percent
                        function formatPercent(value) {
                            value = value * 100;
                            return value.toFixed(0) + '%';
                        }

                        // Function to add commas as thousands separators
                        function addCommas(value) {
                            return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                        }

                        function formatTemp(value) {
                            value = value.toFixed(2);
                            return value + "°F";
                        }

                        // the span elements used in the sidebar
                        const nameDisplay = document.getElementById('name');
                        const costDisplay = document.getElementById('cost');
                        const elecDisplay = document.getElementById('elec');
                        const elevDisplay = document.getElementById('elev');
                        const popDisplay = document.getElementById('pop');
                        const preDisplay = document.getElementById('pre');
                        const tempDisplay = document.getElementById('temp');

                        // the properties of the feature
                        const properties = e.features[0].properties;

                        console.log(e.features)

                        // the current features properties
                        const countyName = properties['NAME'];
                        const countyCost = parseFloat(properties['cost']);
                        const countyElec = parseFloat(properties['electric']);
                        const countyElev = parseFloat(properties['elevation']);
                        const countyPop = parseFloat(properties['population']);
                        const countyPre = parseFloat(properties['precipitation']);
                        const countyTemp = parseFloat(properties['temperature']);

                        // displaying no data if there is no data found for the county
                        if (isNaN(countyCost)) {
                            costDisplay.textContent = "No Data Found";
                        } else {
                            costDisplay.textContent = formatPercent(countyCost);
                        }
                        if (isNaN(countyElec)) {
                            elecDisplay.textContent = "No Data Found";
                        } else {
                            elecDisplay.textContent = addCommas(countyElec);
                        }
                        if (isNaN(countyElev)) {
                            elevDisplay.textContent = "No Data Found";
                        } else {
                            elevDisplay.textContent = addCommas(countyElev);
                        }
                        if (isNaN(countyPop)) {
                            popDisplay.textContent = "No Data Found";
                        } else {
                            popDisplay.textContent = addCommas(countyPop);
                        }
                        if (isNaN(countyPre)) {
                            preDisplay.textContent = "No Data Found";
                        } else {
                            preDisplay.textContent = addCommas(countyPre);
                        }
                        if (isNaN(countyTemp)) {
                            tempDisplay.textContent = "No Data Found";
                        } else {
                            tempDisplay.textContent = formatTemp(countyTemp);
                        }


                        nameDisplay.textContent = countyName;

                        // reset county
                        if (countyClickedPolygonId !== null) {
                            // Reset the state of the previously clicked feature in the 'county-data' layer
                            map.setFeatureState(
                                {source: 'county', id: countyClickedPolygonId},
                                {click: false}
                            );
                        }

                        // Set the state of the clicked feature in the 'county-data' layer to 'click'
                        countyClickedPolygonId = e.features[0].id;

                        map.setFeatureState(
                            {source: 'county', id: countyClickedPolygonId},
                            {click: true}
                        );


                    });

                    // changing the mouse on hover
                    map.on('mouseenter', 'county-data', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });
                    //changing the mouse when no longer hovering over a county
                    map.on('mouseleave', 'county-data', () => {
                        map.getCanvas().style.cursor = '';
                    });

                }
            }
        }

        , [map, "http://34.133.43.211/dacstategeojson.geojson"]);

    return (

        <div className="map-container-wrapper">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <img src={loadingSpinner} alt="Loading..."/>
                        <span className="loading-text">Loading AI Model</span>
                    </div>
                </div>
            )}
            <div ref={mapContainer} className="map-container">

                <div className='info-section'>
                    <div className='state-name'><span id='name'> Select a State or County </span></div>
                    <hr className='name-line'/>
                    <div><strong>Cost Efficiency:</strong> <span id='cost'></span></div>
                    <div><strong>Electric:</strong> <span id='elec'></span></div>
                    <div><strong>Elevation in Feet:</strong> <span id='elev'></span></div>
                    <div><strong>Population:</strong> <span id='pop'></span></div>
                    <div><strong>Precipitation:</strong> <span id='pre'></span></div>
                    <div><strong>Temperature:</strong> <span id='temp'></span></div>
                    <Link to="/moreinfo">More Info</Link>
                </div>

                <div id="legend" className="legend" style={{display: legendDisplay}}>
                    <h3>Cost Efficiency</h3>
                    <h4>Most Efficient</h4>
                    <div><span className="b723122" style={{backgroundColor: props.colors.color7}}></span></div>
                    <div><span className="b8b4225" style={{backgroundColor: props.colors.color6}}></span></div>
                    <div><span className="ba25626" style={{backgroundColor: props.colors.color5}}></span></div>
                    <div><span className="bb86b25" style={{backgroundColor: props.colors.color4}}></span></div>
                    <div><span className="bca8323" style={{backgroundColor: props.colors.color3}}></span></div>
                    <div><span className="bda9c20" style={{backgroundColor: props.colors.color2}}></span></div>
                    <div><span className="be6b71e" style={{backgroundColor: props.colors.color1}}></span></div>
                    <h4>Least Efficient</h4>
                </div>
            </div>
        </div>
    );
}

export default DACMap;