import "../components/Heatmap/Heatmap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


function DACMap(props) {

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

        // map.on('load', () => {
        //     map.addSource('population', {
        //         type: 'vector',
        //         url: 'mapbox://mapbox.660ui7x6',
        //     });

        //     map.addLayer({
        //         id: 'state-population',
        //         source: 'population',
        //         'source-layer': 'state_county_population_2014_cen',
        //         maxzoom: zoomThreshold,
        //         type: 'fill',
        //         filter: ['==', 'isState', true],
        //         paint: {
        //             'fill-color': [
        //                 'interpolate',
        //                 ['linear'],
        //                 ['get', 'population'],
        //                 1000,
        //                 props.colors.color1,
        //                 5000,
        //                 props.colors.color2,
        //                 10000,
        //                 props.colors.color3,
        //                 50000,
        //                 props.colors.color4,
        //                 100000,
        //                 props.colors.color5,
        //                 500000,
        //                 props.colors.color6,
        //                 1000000,
        //                 props.colors.color7,
        //             ],
        //             'fill-opacity': .85,
        //         },
        //     });

        //     map.addLayer({
        //         id: 'county-population',
        //         source: 'population',
        //         'source-layer': 'state_county_population_2014_cen',
        //         minzoom: zoomThreshold,
        //         type: 'fill',
        //         filter: ['==', 'isCounty', true],
        //         paint: {
        //             'fill-color': [
        //                 'interpolate',
        //                 ['linear'],
        //                 ['get', 'population'],
        //                 1000,
        //                 props.colors.color1,
        //                 5000,
        //                 props.colors.color2,
        //                 10000,
        //                 props.colors.color3,
        //                 50000,
        //                 props.colors.color4,
        //                 100000,
        //                 props.colors.color5,
        //                 500000,
        //                 props.colors.color6,
        //                 1000000,
        //                 props.colors.color7,
        //             ],
        //             'fill-opacity': .85,
        //         },
        //     });
        // });

        map.on('load', () => {
            // state data vector tileset
            map.addSource('state', {
                type: 'vector',
                url: "mapbox://jholsch29.4gfqi3ew",

                //
                // type: 'geojson',
                // data: "https://cdn.rawgit.com/ebrelsford/geojson-examples/master/596acres-02-18-2014-queens.geojson"
                //
            });

            // county data vector tileset
            map.addSource('county', {
                type: 'vector',
                url: "mapbox://jholsch29.5kpx78c7",
            });

            // add choropleth layer for state level
            map.addLayer({
                id: 'state-data',
                source: 'state',
                'source-layer': 'stateDAC-1m13bh',  // vector tileset name
                maxzoom: zoomThreshold,
                type: 'fill',
                filter: ['==', 'isState', "yes"],
                paint: {
                    'fill-color': [
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
                    ],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        .85,
                        1
                    ]
                },

                //'fill-opacity': .85,
                // 'id': 'population',
                // 'type': 'circle',
                // source: 'state',
                // 'paint': {
                //     'circle-radius': {
                //         'base': 1.75,
                //         'stops': [[12, 2], [22, 180]]
                //     },
                // 'circle-color': '#f00'

                // }
                //
            });

            map.addLayer({
                id: 'county-data',
                source: 'county',
                'source-layer': 'countyDAC-68q8mt',  // vector tileset name
                minzoom: zoomThreshold,
                type: 'fill',
                filter: ['==', 'isState', "no"],
                paint: {
                    'fill-color': [
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
                    ],
                    'fill-opacity': .85,
                },
            });

            // define boundary lines for states so that
            // divisions are always obvious regardless of zoom
            map.addLayer({
                id: 'state-boundaries',
                source: 'state',
                'source-layer': 'stateDAC-1m13bh',
                type: 'line',
                paint: {
                    'line-color': '#000',
                    'line-width': 0.1
                }
            });

            // define boundary lines for counties so that
            // divisions are always obvious regardless of zoom
            map.addLayer({
                id: 'county-boundaries',
                source: 'county',
                'source-layer': 'countyDAC-68q8mt',
                type: 'line',
                paint: {
                    'line-color': '#000',
                    'line-width': 0.1,
                    'line-opacity': 0.5
                }
            });
        });
        let hoveredPolygonId = null;
        // When the map is clicked display a popup
        map.on('mousemove', 'state-data', (e) => {
            // Commented out code that was used when we had the dropdown option
            //let dropdown = document.getElementById("dropdown");
            //let title = dropdown.options[dropdown.selectedIndex].text
            //title + ": " + e.features[0].properties[dropdown.value]
            // Get the feature's properties
            //The features at the coordinate that was picked

            // the span elements used in the sidebar
            const nameDisplay = document.getElementById('name');
            const costDisplay = document.getElementById('cost');
            const elecDisplay = document.getElementById('elec');
            const eleDisplay = document.getElementById('ele');
            const popDisplay = document.getElementById('pop');
            const preDisplay = document.getElementById('pre');
            const tempDisplay = document.getElementById('temp');

            // the properties of the feature
            const properties = e.features[0].properties;

            // the current features properties
            const countyName = properties['NAME'];
            const countyCost = properties['cost'];
            const countyElec = properties['electric'];
            const countyEle = properties['elevation'];
            const countyPop = properties['population'];
            const countyPre = properties['precipitation'];
            const countyTemp = properties['temperature'];


            //display the property values
            nameDisplay.textContent = countyName;
            costDisplay.textContent = countyCost;
            elecDisplay.textContent = countyElec;
            eleDisplay.textContent = countyEle;
            popDisplay.textContent = countyPop;
            preDisplay.textContent = countyPre;
            tempDisplay.textContent = countyTemp;

            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'state', sourceLayer: 'stateDAC-1m13bh', id: hoveredPolygonId},
                    {hover: false}
                );
            }
            hoveredPolygonId = e.features[0].id;
            map.setFeatureState(
                {source: 'state',sourceLayer: 'stateDAC-1m13bh',  id: hoveredPolygonId},
                {hover: true}
            );

        });

        map.on('mouseleave', 'state-data', () => {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    {source: 'state',sourceLayer: 'stateDAC-1m13bh', id: hoveredPolygonId},
                    {hover: false}
                );
            }
            hoveredPolygonId = null;
        });

        // When the map is clicked display a popup
        map.on('mousemove', 'county-data', (e) => {
            // Commented out code that was used when we had the dropdown option
            //let dropdown = document.getElementById("dropdown");
            //let title = dropdown.options[dropdown.selectedIndex].text
            //title + ": " + e.features[0].properties[dropdown.value]
            // Get the feature's properties
            //The features at the coordinate that was picked

            // the span elements used in the sidebar
            const nameDisplay = document.getElementById('name');
            const costDisplay = document.getElementById('cost');
            const landDisplay = document.getElementById('elec');
            const zDisplay = document.getElementById('ele');
            const popDisplay = document.getElementById('pop');
            const preDisplay = document.getElementById('pre');
            const tempDisplay = document.getElementById('temp');

            // the properties of the feature
            const properties = e.features[0].properties;

            // the current features properties
            const countyName = properties['NAME'];
            const countyCost = properties['cost'];
            const countyElec = properties['electric'];
            const countyEle = properties['elevation'];
            const countyPop = properties['population'];
            const countyPre = properties['precipitation'];
            const countyTemp = properties['temperature'];


            //display the property values
            nameDisplay.textContent = countyName;
            costDisplay.textContent = countyCost;
            landDisplay.textContent = countyElec;
            zDisplay.textContent = countyEle;
            popDisplay.textContent = countyPop;
            preDisplay.textContent = countyPre;
            tempDisplay.textContent = countyTemp;

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
                <div><strong>Land prices:</strong> <span id='elec'></span></div>
                <div><strong>Palmer-z index:</strong> <span id='ele'></span></div>
                <div><strong>Population:</strong> <span id='pop'></span></div>
                <div><strong>Precipitation:</strong> <span id='pre'></span></div>
                <div><strong>Temperature:</strong> <span id='temp'></span></div>
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

export default DACMap;