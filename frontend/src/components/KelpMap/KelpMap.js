import "../ReforestationMap/ReforestationMap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Link} from "react-router-dom";
import kelpData from "./stateKelpFarm.geojson"


function KelpMap(props) {

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
            map.addSource('kelp', {
                type: 'geojson',
                data: kelpData,
                generateId: true // This ensures that all features have unique IDs
            });

            map.addLayer({
                id: 'kelp-data',
                type: 'circle',
                source: 'kelp',
                paint: {
                    'circle-radius': 6,
                    'circle-color': [
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
                }
            });
        });

        map.on('mouseenter', 'kelp-data', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'kelp-data', () => {
            map.getCanvas().style.cursor = '';
        });

        let stateHoveredPolygonId = null;
        let stateClickedPolygonId = null;

        map.on('click', 'kelp-data', (e) => {

            // the span elements used in the sidebar
            const nameDisplay = document.getElementById('name');
            const depthDisplay = document.getElementById('depth');
            const phDisplay = document.getElementById('ph');
            const tempDisplay = document.getElementById('temp');
            const locDisplay = document.getElementById('loc');


            // the properties of the feature
            const properties = e.features[0].properties;

            // the current features properties
            const kelpLat = properties['lat'];
            const kelpLong = properties['long'];
            const kelpDepth = properties['depth'];
            const kelpPH = properties['ph'];
            const kelpLoc = properties['loc'];
            const kelpTemp = properties['temperature'];

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
                return value + "°C";
            }

            // Function to format lat and long coords
            function formatCoordinates(lat, long) {
                return `Lat: ${lat.toFixed(4)}°, Long: ${long.toFixed(2)}°`;
            }

            nameDisplay.textContent = formatCoordinates(kelpLat, kelpLong)
            locDisplay.textContent = formatPercent(kelpLoc);
            depthDisplay.textContent = addCommas(kelpDepth);
            phDisplay.textContent = addCommas(kelpPH);
            tempDisplay.textContent = formatTemp(kelpTemp);

            if (stateClickedPolygonId !== null) {
                map.setFeatureState(
                    {source: 'kelp', id: stateClickedPolygonId},
                    {click: false}
                );
            }

            stateClickedPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'kelp', id: stateClickedPolygonId},
                {click: true}
            );

            map.on('mousemove', 'kelp-data', (e) => {

                if (stateHoveredPolygonId !== null) {
                    // Reset the state of the previously clicked feature
                    map.setFeatureState(
                        {source: 'kelp', id: stateHoveredPolygonId},
                        {hover: false}
                    );
                }

                // Set the state of the clicked feature to 'click'
                stateHoveredPolygonId = e.features[0].id;
                map.setFeatureState(
                    {source: 'kelp', id: stateHoveredPolygonId},
                    {hover: true}
                );

            });

            map.on('mouseleave', 'kelp-data', () => {
                if (stateHoveredPolygonId !== null) {
                    map.setFeatureState(
                        {source: 'kelp', id: stateHoveredPolygonId},
                        {hover: false}
                    );
                }
                stateHoveredPolygonId = null;
            });
        });
    }, []);

    return (

        <div ref={mapContainer} className="map-container">

            <div className='info-section'>
                <div className='state-name'><span id='name'> Select a Data Point </span></div>
                <hr className='name-line'/>
                <div><strong>Relative Efficiency:</strong> <span id='loc'></span></div>
                <div><strong>Depth:</strong> <span id='depth'></span></div>
                <div><strong>PH:</strong> <span id='ph'></span></div>
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

export default KelpMap;