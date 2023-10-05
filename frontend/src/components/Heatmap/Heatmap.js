import "./Heatmap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function ChoroplethMap() {

  const mapContainer = useRef(null);

  const [legendDisplay] = useState('block');


  const zoomThreshold = 3.9;

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFhc2VlZGUiLCJhIjoiY2xuOTNwdmVxMDM0bjJtbjJxeHczYmhkbiJ9.LVjKKnnuccvPSd4rJG3uJQ';

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98, 38.88],
      minZoom: 2,
      zoom: 3,
    });

    map.on('load', () => {
      map.addSource('population', {
        type: 'vector',
        url: 'mapbox://mapbox.660ui7x6',
      });

      map.addLayer({
        id: 'state-population',
        source: 'population',
        'source-layer': 'state_county_population_2014_cen',
        maxzoom: zoomThreshold,
        type: 'fill',
        filter: ['==', 'isState', true],
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'population'],
            1000,
            '#e2f9df',
            5000,
            '#c3f5bb',
            10000,
            '#95ee89',
            50000,
            '#70fe5d',
            100000,
            '#50ed3a',
            500000,
            '#28d411',
            1000000,
            '#15aa00',
          ],
          'fill-opacity': .85,
        },
      });

      map.addLayer({
        id: 'county-population',
        source: 'population',
        'source-layer': 'state_county_population_2014_cen',
        minzoom: zoomThreshold,
        type: 'fill',
        filter: ['==', 'isCounty', true],
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'population'],
            1000,
            '#effbed',
            5000,
            '#cff5c9',
            10000,
            '#a1e499',
            50000,
            '#75ed66',
            100000,
            '#3fa331',
            500000,
            '#1b780f',
            1000000,
            '#083e00',
          ],
          'fill-opacity': .85,
        },
      });
    });

  }, []);

  return (

      <div ref={mapContainer} className="map-container">
        <div id="legend" className="legend" style={{ display: legendDisplay }}>
        <h4>Cost Efficency</h4>
            <h3>Most</h3>
            <div><span className= "b723122" ></span></div>
            <div><span className= "b8b4225"></span></div>
            <div><span className= "ba25626"></span></div>
            <div><span className= "bb86b25"></span></div>
            <div><span className= "bca8323"></span></div>
            <div><span className= "bda9c20"></span></div>
            <div><span className= "be6b71e"></span></div>
            <h3>Least</h3>
      </div>
     </div>

  );
}

export default ChoroplethMap;