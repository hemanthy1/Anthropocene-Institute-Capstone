import "./Heatmap.css"
import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Link} from "react-router-dom";


function ChoroplethMap(props) {

    const mapContainer = useRef(null);
    const [legendDisplay] = useState('block');
    const zoomThreshold = 3;


    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbjJjaWllNzAwcDQyam1wYnF6NHQ0Z24ifQ.TYll92t4SavsRHHFUhU-UA';

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-98, 38.88],
            minZoom: 2,
            zoom: 2.2,
        });
        // Add Geocoder which creates the search bar
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
        });

        // Add the search bar to the heatmap
        map.addControl(geocoder);


        map.on('load', () => {
            // state data vector tileset
            map.addSource('state', {
                type: 'vector',
                url: "mapbox://jholsch29.6l4kskpb",
                "promoteId": {"stateReforestation-ad4r41": "NAME"},
                //
                // type: 'geojson',
                // data: "https://cdn.rawgit.com/ebrelsford/geojson-examples/master/596acres-02-18-2014-queens.geojson"
                //
            });

            // county data vector tileset
            map.addSource('county', {
                type: 'vector',
                url: "mapbox://jholsch29.7n25de6t",
                "promoteId": {"countyReforestation-dszxt3": "GEO_ID"},
            });

            // add choropleth layer for state level
            map.addLayer({
                id: 'state-data',
                source: 'state',
                'source-layer': 'stateReforestation-ad4r41',  // vector tileset name
                maxzoom: zoomThreshold,
                type: 'fill',
                filter: ['==', 'isState', "yes"],
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
                        ]
                    ],
                    'fill-opacity': .85
                },

            });

            map.addLayer({
                id: 'county-data',
                source: 'county',
                'source-layer': 'countyReforestation-dszxt3',  // vector tileset name
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

            // define boundary lines for states so that
            // divisions are always obvious regardless of zoom
            map.addLayer({
                id: 'state-boundaries',
                source: 'state',
                'source-layer': 'stateReforestation-ad4r41',
                type: 'line',
                paint: {
                    'line-color': '#000',
                    'line-width': .1
                }
            });


            // define boundary lines for counties so that
            // divisions are always obvious regardless of zoom
            map.addLayer({
                id: 'county-boundaries',
                source: 'county',
                'source-layer': 'countyReforestation-dszxt3',
                type: 'line',
                paint: {
                    'line-color': '#000',
                    'line-width': .1
                }
            });

        });

        let stateHoveredPolygonId = null;
        let stateClickedPolygonId = null;
        let countyHoveredPolygonId = null;
        let countyClickedPolygonId = null;
        // When the map is clicked display a popup
        map.on('click', 'state-data', (e) => {
            // Commented out code that was used when we had the dropdown option
            //let dropdown = document.getElementById("dropdown");
            //let title = dropdown.options[dropdown.selectedIndex].text
            //title + ": " + e.features[0].properties[dropdown.value]
            // Get the feature's properties
            //The features at the coordinate that was picked

            // the span elements used in the sidebar
            const nameDisplay = document.getElementById('name');
            const costDisplay = document.getElementById('cost');
            const landDisplay = document.getElementById('land');
            const zDisplay = document.getElementById('z');
            const popDisplay = document.getElementById('pop');
            const preDisplay = document.getElementById('pre');
            const tempDisplay = document.getElementById('temp');

            // the properties of the feature
            const properties = e.features[0].properties;

            // the current features properties
            const countyName = properties['NAME'];
            const countyCost = properties['cost'];
            const countyLand = properties['land'];
            const countyZ = properties['palmer'];
            const countyPop = properties['population'];
            const countyPre = properties['precipitation'];
            const countyTemp = properties['temperature'];

            //display the property values
            nameDisplay.textContent = countyName;
            costDisplay.textContent = countyCost;
            landDisplay.textContent = countyLand;
            zDisplay.textContent = countyZ;
            popDisplay.textContent = countyPop;
            preDisplay.textContent = countyPre;
            tempDisplay.textContent = countyTemp;

            if (stateClickedPolygonId !== null) {
                // Reset the state of the previously clicked feature
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateClickedPolygonId},
                    {click: false}
                );
            }
            // Set the state of the clicked feature to 'click'
            stateClickedPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateClickedPolygonId},
                {click: true}
            );

        });

        map.on('mousemove', 'state-data', (e) => {
            const properties = e.features[0].properties;

            // the current features properties
            const countyName = properties['NAME'];
            if (stateHoveredPolygonId !== null) {
                // Reset the state of the previously clicked feature
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateHoveredPolygonId},
                    {hover: false}
                );
            }

            // Set the state of the clicked feature to 'click'
            stateHoveredPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateHoveredPolygonId},
                {hover: true}
            );

        });


        map.on('mouseleave', 'state-data', () => {
            if (stateHoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateReforestation-ad4r41', id: stateHoveredPolygonId},
                    {hover: false}
                );
            }
            stateHoveredPolygonId = null;
        });

        map.on('mousemove', 'county-data', (e) => {
            if (countyHoveredPolygonId !== null) {
                // Reset the state of the previously clicked feature in the 'county-data' layer
                map.setFeatureState(
                    {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyHoveredPolygonId},
                    {hover: false}
                );
            }

            // Set the state of the hovered feature in the 'county-data' layer to 'hover'
            countyHoveredPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyHoveredPolygonId},
                {hover: true}
            );
        });
        map.on('mouseleave', 'county-data', () => {
            if (countyHoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyHoveredPolygonId},
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
            const landDisplay = document.getElementById('land');
            const zDisplay = document.getElementById('z');
            const popDisplay = document.getElementById('pop');
            const preDisplay = document.getElementById('pre');
            const tempDisplay = document.getElementById('temp');

            // the properties of the feature
            const properties = e.features[0].properties;

            // the current features properties
            const countyName = properties['NAME'];
            const countyCost = properties['cost'];
            const countyLand = properties['land'];
            const countyZ = properties['palmer'];
            const countyPop = properties['population'];
            const countyPre = properties['precipitation'];
            const countyTemp = properties['temperature'];

            nameDisplay.textContent = countyName;
            costDisplay.textContent = countyCost;
            landDisplay.textContent = countyLand;
            zDisplay.textContent = countyZ;
            popDisplay.textContent = countyPop;
            preDisplay.textContent = countyPre;
            tempDisplay.textContent = countyTemp;
            if (countyClickedPolygonId !== null) {
                // Reset the state of the previously clicked feature in the 'county-data' layer
                map.setFeatureState(
                    {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyClickedPolygonId},
                    {click: false}
                );
            }

            // Set the state of the clicked feature in the 'county-data' layer to 'click'
            countyClickedPolygonId = e.features[0].id;

            map.setFeatureState(
                {source: 'county', sourceLayer: 'countyReforestation-dszxt3', id: countyClickedPolygonId},
                {click: true}
            );


        });


        map.on('mouseenter', 'county-data', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'county-data', () => {
            map.getCanvas().style.cursor = '';
        });

    }, []);

    return (

        <div ref={mapContainer} className="map-container">
            <div className='info-section'>
                <div><strong>Name:</strong> <span id='name'></span></div>
                <div><strong>Cost Efficiency:</strong> <span id='cost'></span></div>
                <div><strong>Land prices:</strong> <span id='land'></span></div>
                <div><strong>Palmer-z index:</strong> <span id='z'></span></div>
                <div><strong>Population:</strong> <span id='pop'></span></div>
                <div><strong>Precipitation:</strong> <span id='pre'></span></div>
                <div><strong>Temperature:</strong> <span id='temp'></span></div>
                <Link to="/moreinfo">More Info</Link>
            </div>

            <div id="legend" className="legend" style={{display: legendDisplay}}>
                <h4>Cost Efficency</h4>
                <h3>Most</h3>
                <div><span className="b723122" style={{backgroundColor: props.colors.color7}}></span></div>
                <div><span className="b8b4225" style={{backgroundColor: props.colors.color6}}></span></div>
                <div><span className="ba25626" style={{backgroundColor: props.colors.color5}}></span></div>
                <div><span className="bb86b25" style={{backgroundColor: props.colors.color4}}></span></div>
                <div><span className="bca8323" style={{backgroundColor: props.colors.color3}}></span></div>
                <div><span className="bda9c20" style={{backgroundColor: props.colors.color2}}></span></div>
                <div><span className="be6b71e" style={{backgroundColor: props.colors.color1}}></span></div>
                <h3>Least</h3>
            </div>
        </div>

    );
}

export default ChoroplethMap;