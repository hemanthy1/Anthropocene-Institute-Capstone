import "./Heatmap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


function ChoroplethMap(props) {

    const mapContainer = useRef(null);
    const [legendDisplay] = useState('block');
    const [dropdownDisplay] = useState('block');
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
                url: "mapbox://jholsch29.a47vgwym",
                generateId: true
                //
                // type: 'geojson',
                // data: "https://cdn.rawgit.com/ebrelsford/geojson-examples/master/596acres-02-18-2014-queens.geojson"
                //
            });

            // county data vector tileset
            map.addSource('county', {
                type: 'vector',
                url: "mapbox://jholsch29.5vi92hxq",
                generateId: true
            });

            // add choropleth layer for state level
            map.addLayer({
                id: 'state-data',
                source: 'state',
                'source-layer': 'stateReforestation-2v0akk',  // vector tileset name
                maxzoom: zoomThreshold,
                type: 'fill',
                filter: ['==', 'isState', "yes"],
                paint: {
                    'fill-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        '#FFFF00', // Color to use when the condition is true (clicked)
                        ['boolean', ['feature-state', 'click'], false],
                        '#FFFF00', // Color to use when the condition is true (clicked)
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
                    'fill-opacity': .85
                },

            });

            map.addLayer({
                id: 'county-data',
                source: 'county',
                'source-layer': 'countyReforestation-4ser7q',  // vector tileset name
                minzoom: zoomThreshold,
                type: 'fill',
                filter: ['==', 'isState', "no"],
                paint: {
                    'fill-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        '#FFFF00', // Color to use when the condition is true (clicked)
                        ['boolean', ['feature-state', 'click'], false],
                        '#FFFF00', // Color to use when the condition is true (clicked)
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
                'source-layer': 'stateReforestation-2v0akk',
                type: 'line',
                paint: {
                    'line-color': '#000',
                    'line-width': 1
                }
            });


            // define boundary lines for counties so that
            // divisions are always obvious regardless of zoom
            map.addLayer({
                id: 'county-boundaries',
                source: 'county',
                'source-layer': 'countyReforestation-4ser7q',
                type: 'line',
                paint: {
                    'line-color': '#000',
                    'line-width': .5
                }
            });
        });

        let hoveredPolygonId = null;
        let clickedPolygonId = null;


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

            if (clickedPolygonId !== null) {
                // Reset the state of the previously clicked feature
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateReforestation-2v0akk', id: clickedPolygonId},
                    {click: false}
                );
            }

            // Set the state of the clicked feature to 'click'
            clickedPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'state', sourceLayer: 'stateReforestation-2v0akk', id: clickedPolygonId},
                {click: true}
            );

        });

        map.on('mousemove', 'state-data', (e) => {
            if (hoveredPolygonId !== null) {
                // Reset the state of the previously clicked feature
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateReforestation-2v0akk', id: hoveredPolygonId},
                    {hover: false}
                );
            }

            // Set the state of the clicked feature to 'click'
            hoveredPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'state', sourceLayer: 'stateReforestation-2v0akk', id: hoveredPolygonId},
                {hover: true}
            );

        });


        map.on('mouseleave', 'state-data', () => {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateReforestation-2v0akk', id: hoveredPolygonId},
                    {hover: false}
                );
            }
            hoveredPolygonId = null;
        });

        map.on('mousemove', 'county-data', (e) => {
            if (hoveredPolygonId !== null) {
                // Reset the state of the previously clicked feature in the 'county-data' layer
                map.setFeatureState(
                    {source: 'county', sourceLayer: 'countyReforestation-4ser7q', id: hoveredPolygonId},
                    {hover: false}
                );
            }

            // Set the state of the hovered feature in the 'county-data' layer to 'hover'
            hoveredPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'county', sourceLayer: 'countyReforestation-4ser7q', id: hoveredPolygonId},
                {hover: true}
            );
        });
        map.on('mouseleave', 'county-data', () => {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'county', sourceLayer: 'countyReforestation-4ser7q', id: hoveredPolygonId},
                    {hover: false}
                );
            }
            hoveredPolygonId = null;
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


            //display the property values
            nameDisplay.textContent = countyName;
            costDisplay.textContent = countyCost;
            landDisplay.textContent = countyLand;
            zDisplay.textContent = countyZ;
            popDisplay.textContent = countyPop;
            preDisplay.textContent = countyPre;
            tempDisplay.textContent = countyTemp;
            if (clickedPolygonId !== null) {
                // Reset the state of the previously clicked feature in the 'county-data' layer
                map.setFeatureState(
                    {source: 'county', sourceLayer: 'countyReforestation-4ser7q', id: clickedPolygonId},
                    {click: false}
                );
            }

            // Set the state of the clicked feature in the 'county-data' layer to 'click'
            clickedPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'county', sourceLayer: 'countyReforestation-4ser7q', id: clickedPolygonId},
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
                <div><strong>County Name:</strong> <span id='name'></span></div>
                <div><strong>Cost Efficiency:</strong> <span id='cost'></span></div>
                <div><strong>Land prices:</strong> <span id='land'></span></div>
                <div><strong>Palmer-z index:</strong> <span id='z'></span></div>
                <div><strong>Population:</strong> <span id='pop'></span></div>
                <div><strong>Precipitation:</strong> <span id='pre'></span></div>
                <div><strong>Temperature:</strong> <span id='temp'></span></div>
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