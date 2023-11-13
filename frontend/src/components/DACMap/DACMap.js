import "../ReforestationMap/ReforestationMap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import loadingSpinner from '../../assets/loading.gif'; 

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Link} from "react-router-dom";


function DACMap(props) {

    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const zoomThreshold = 3;
    const [legendDisplay] = useState("block");
    const [isLoading, setIsLoading] = useState(false); // New loading state

    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbjJjaWllNzAwcDQyam1wYnF6NHQ0Z24ifQ.TYll92t4SavsRHHFUhU-UA";


        const initializeMap = ({setMap, mapContainer}) => {


            if (mapContainer && !mapContainer.current.classList.contains('mapboxgl-map')) {
                const newMap = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/light-v11",
                    center: [-98, 38.88],
                    minZoom: 1,
                    zoom: 2.2,
                });
                const geocoder = new MapboxGeocoder({
                  accessToken: mapboxgl.accessToken,
                  mapboxgl: mapboxgl,
              });
              newMap.addControl(geocoder);
                newMap.on("load", () => {
                    setMap(newMap);
                    newMap.resize();

                });
            }
        };

        if (!map) initializeMap({setMap, mapContainer});
    }, [map]);
    useEffect(() => {
        if (map) {

            if (map.getSource("state")) {
                // If it does, update its data
                map.getSource("state").setData("http://34.69.213.194/dacstategeojson.geojson");

            }
            if (map.getSource("county")) {
                // If it does, update its data
                map.getSource("county").setData("http://34.69.213.194/daccountygeojson.geojson");
            }
            if (!map.getSource("state")) {
                map.addSource("state", {
                    type: "geojson",
                    data: "http://34.69.213.194/dacstategeojson.geojson",
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
            if (!map.getSource("county")) {
                setIsLoading(true);

                map.addSource("county", {
                    type: "geojson",
                    data: "http://34.69.213.194/daccountygeojson.geojson",
                    promoteId: "GEO_ID",
                });
                map.addLayer({
                    id: 'county-data',
                    source: 'county',
                    // 'source-layer': 'countyReforestation-dszxt3',  // vector tileset name
                    minzoom: zoomThreshold,
                    type: 'fill',
                    filter: ['==', 'isState', "no"],
                    paint: {
                        'fill-color': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            '#ffe37a', // Color to use when the condition is true (clicked)
                            ['boolean', ['feature-state', 'click'], false],
                            '#ffe37a', // Color to use when the condition is true (clicked)
                            [
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
                map.addLayer({
                    id: 'county-boundaries',
                    source: 'county',
                    // 'source-layer': 'countyReforestation-dszxt3',
                    type: 'line',
                    minzoom: zoomThreshold,
                    paint: {
                        'line-color': '#000',
                        'line-width': .1,
                        'line-opacity': 0.5
                    }
                });
            }

            let stateHoveredPolygonId = null;
            let stateClickedPolygonId = null;
            let countyHoveredPolygonId = null;
            let countyClickedPolygonId = null;
            map.getCanvas().style.cursor = "pointer";
            map.once('idle', () => {
                setIsLoading(false)
            });

            if (map.getLayer('state-data')) {


                map.on("mousemove", "state-data", (e) => {
                    // console.log("hovering")
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
                map.on("click", "state-data", (e) => {
    
    // useEffect(() => {


    //     // map.on('load', () => {
    //     //     map.addSource('population', {
    //     //         type: 'vector',
    //     //         url: 'mapbox://mapbox.660ui7x6',
    //     //     });

    //     //     map.addLayer({
    //     //         id: 'state-population',
    //     //         source: 'population',
    //     //         'source-layer': 'state_county_population_2014_cen',
    //     //         maxzoom: zoomThreshold,
    //     //         type: 'fill',
    //     //         filter: ['==', 'isState', true],
    //     //         paint: {
    //     //             'fill-color': [
    //     //                 'interpolate',
    //     //                 ['linear'],
    //     //                 ['get', 'population'],
    //     //                 1000,
    //     //                 props.colors.color1,
    //     //                 5000,
    //     //                 props.colors.color2,
    //     //                 10000,
    //     //                 props.colors.color3,
    //     //                 50000,
    //     //                 props.colors.color4,
    //     //                 100000,
    //     //                 props.colors.color5,
    //     //                 500000,
    //     //                 props.colors.color6,
    //     //                 1000000,
    //     //                 props.colors.color7,
    //     //             ],
    //     //             'fill-opacity': .85,
    //     //         },
    //     //     });

    //     //     map.addLayer({
    //     //         id: 'county-population',
    //     //         source: 'population',
    //     //         'source-layer': 'state_county_population_2014_cen',
    //     //         minzoom: zoomThreshold,
    //     //         type: 'fill',
    //     //         filter: ['==', 'isCounty', true],
    //     //         paint: {
    //     //             'fill-color': [
    //     //                 'interpolate',
    //     //                 ['linear'],
    //     //                 ['get', 'population'],
    //     //                 1000,
    //     //                 props.colors.color1,
    //     //                 5000,
    //     //                 props.colors.color2,
    //     //                 10000,
    //     //                 props.colors.color3,
    //     //                 50000,
    //     //                 props.colors.color4,
    //     //                 100000,
    //     //                 props.colors.color5,
    //     //                 500000,
    //     //                 props.colors.color6,
    //     //                 1000000,
    //     //                 props.colors.color7,
    //     //             ],
    //     //             'fill-opacity': .85,
    //     //         },
    //     //     });
    //     // });

    //     map.on('load', () => {
    //         // state data vector tileset
    //         map.addSource('state', {
    //             type: 'vector',
    //             url: "mapbox://jholsch29.4gfqi3ew",
    //             "promoteId": {"stateDAC-1m13bh": "NAME"},
    //             //
    //             // type: 'geojson',
    //             // data: "https://cdn.rawgit.com/ebrelsford/geojson-examples/master/596acres-02-18-2014-queens.geojson"
    //             //
    //         });

    //         // county data vector tileset
    //         map.addSource('county', {
    //             type: 'geojson',
    //             data: "127.0.0.1:5000/daccountygeojson.geojson",
    //             "promoteId": "GEO_ID",
    //         });

    //         // add choropleth layer for state level
    //         map.addLayer({
    //             id: 'state-data',
    //             source: 'state',
    //             // 'source-layer': 'stateDAC-1m13bh',  // vector tileset name
    //             maxzoom: zoomThreshold,
    //             type: 'fill',
    //             filter: ['==', 'isState', "yes"],
    //             paint: {
    //                 'fill-color': [
    //                     'case',
    //                     ['boolean', ['feature-state', 'hover'], false],
    //                     '#ffe37a', // Color to use when the condition is true (clicked)
    //                     ['boolean', ['feature-state', 'click'], false],
    //                     '#ffe37a', // Color to use when the condition is true (clicked)
    //                     [
    //                         'interpolate',
    //                         ['linear'],
    //                         ['get', 'class'],
    //                         0,
    //                         props.colors.color0,
    //                         1,
    //                         props.colors.color1,
    //                         2,
    //                         props.colors.color2,
    //                         3,
    //                         props.colors.color3,
    //                         4,
    //                         props.colors.color4,
    //                         5,
    //                         props.colors.color5,
    //                         6,
    //                         props.colors.color6,
    //                         7,
    //                         props.colors.color7
    //                     ]
    //                 ],
    //                 'fill-opacity': .85
    //             },

    //             //'fill-opacity': .85,
    //             // 'id': 'population',
    //             // 'type': 'circle',
    //             // source: 'state',
    //             // 'paint': {
    //             //     'circle-radius': {
    //             //         'base': 1.75,
    //             //         'stops': [[12, 2], [22, 180]]
    //             //     },
    //             // 'circle-color': '#f00'

    //             // }
    //             //
    //         });

    //         map.addLayer({
    //             id: 'county-data',
    //             source: 'county',
    //             // 'source-layer': 'countyDAC-68q8mt',  // vector tileset name
    //             minzoom: zoomThreshold,
    //             type: 'fill',
    //             filter: ['==', 'isState', "no"],
    //             paint: {
    //                 'fill-color': [
    //                     'case',
    //                     ['boolean', ['feature-state', 'hover'], false],
    //                     '#ffe37a', // Color to use when the condition is true (clicked)
    //                     ['boolean', ['feature-state', 'click'], false],
    //                     '#ffe37a', // Color to use when the condition is true (clicked)
    //                     [
    //                         'interpolate',
    //                         ['linear'],
    //                         ['get', 'class'],
    //                         0,
    //                         props.colors.color0,
    //                         1,
    //                         props.colors.color1,
    //                         2,
    //                         props.colors.color2,
    //                         3,
    //                         props.colors.color3,
    //                         4,
    //                         props.colors.color4,
    //                         5,
    //                         props.colors.color5,
    //                         6,
    //                         props.colors.color6,
    //                         7,
    //                         props.colors.color7
    //                     ]
    //                 ],
    //                 'fill-opacity': .85,
    //             },
    //         });

    //         // define boundary lines for states so that
    //         // divisions are always obvious regardless of zoom
    //         map.addLayer({
    //             id: 'state-boundaries',
    //             source: 'state',
    //             // 'source-layer': 'stateDAC-1m13bh',
    //             type: 'line',
    //             paint: {
    //                 'line-color': '#000',
    //                 'line-width': 0.05
    //             }
    //         });

    //         // define boundary lines for counties so that
    //         // divisions are always obvious regardless of zoom
    //         map.addLayer({
    //             id: 'county-boundaries',
    //             source: 'county',
    //             // 'source-layer': 'countyDAC-68q8mt',
    //             type: 'line',
    //             paint: {
    //                 'line-color': '#000',
    //                 'line-width': 0.1,
    //                 'line-opacity': 0.5
    //             }
    //         });
    //     });
    //     let stateHoveredPolygonId = null;
    //     let stateClickedPolygonId = null;
    //     let countyHoveredPolygonId = null;
    //     let countyClickedPolygonId = null;
    //     // When the map is clicked display a popup
    //     map.on('click', 'state-data', (e) => {

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


            //display the property values
            nameDisplay.textContent = stateName;
            costDisplay.textContent = formatPercent(stateCost);
            elecDisplay.textContent = addCommas(stateElec);
            elevDisplay.textContent = addCommas(stateElev);
            popDisplay.textContent = addCommas(statePop);
            preDisplay.textContent = addCommas(statePre);
            tempDisplay.textContent = formatTemp(stateTemp);

            if (stateClickedPolygonId !== null) {
                // Reset the state of the previously clicked feature
                map.setFeatureState(
                    {source: 'state',  id: stateClickedPolygonId},
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

        map.on('mousemove', 'state-data', (e) => {

            if (stateHoveredPolygonId !== null) {
                // Reset the state of the previously clicked feature
                map.setFeatureState(
                    {source: 'state',  id: stateHoveredPolygonId},
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


        map.on('mouseleave', 'state-data', () => {
            if (stateHoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'state',  id: stateHoveredPolygonId},
                    {hover: false}
                );
            }
            stateHoveredPolygonId = null;
        });

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
                {source: 'county',  id: countyHoveredPolygonId},
                {hover: true}
            );
        });
        map.on('mouseleave', 'county-data', () => {
            if (countyHoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'county',  id: countyHoveredPolygonId},
                    {hover: false}
                );
            }
            countyHoveredPolygonId = null;
        });
        // When the map is clicked display a popup
        map.on('click', 'county-data', (e) => {

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

            nameDisplay.textContent = countyName;
            costDisplay.textContent = formatPercent(countyCost);
            elecDisplay.textContent = addCommas(countyElec);
            elevDisplay.textContent = addCommas(countyElev);
            popDisplay.textContent = addCommas(countyPop);
            preDisplay.textContent = countyPre.toFixed(2);
            tempDisplay.textContent = formatTemp(countyTemp);
            if (countyClickedPolygonId !== null) {
                // Reset the state of the previously clicked feature in the 'county-data' layer
                map.setFeatureState(
                    {source: 'county',  id: countyClickedPolygonId},
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


        map.on('mouseenter', 'county-data', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'county-data', () => {
            map.getCanvas().style.cursor = '';
        });

    }
        }}

    , [map,"http://34.69.213.194/dacstategeojson.geojson"]);

    return (
<div className="map-container-wrapper">
            {isLoading && (
              <div className="loading-overlay">
               <div className="loading-content">
          <img src={loadingSpinner} alt="Loading..." />
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


            {/*
            <div className="map-overlay top" style={{display: dropdownDisplay}}>
                <div className="map-overlay-inner">
                    <fieldset>
                        <label>Chose Criteria</label>
                        <select id="layer" name="layer">
                            <option value="population">Population</option>
                            <option value="landPrices">Land Prices</option>
                            <option value="precipitation">Precipitation</option>
                        </select>
                    </fieldset>
                </div>
            </div>
           */}
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