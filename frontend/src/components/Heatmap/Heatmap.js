import "./Heatmap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function ChoroplethMap() {

  const mapContainer = useRef(null);

  const [legendDisplay] = useState('block');


  const zoomThreshold = 4;

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
            0,
            '#F2F12D',
            500000,
            '#EED322',
            750000,
            '#E6B71E',
            1000000,
            '#DA9C20',
            2500000,
            '#CA8323',
            5000000,
            '#B86B25',
            7500000,
            '#A25626',
            10000000,
            '#8B4225',
            25000000,
            '#723122',
          ],
          'fill-opacity': 0.75,
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
            0,
            '#F2F12D',
            100,
            '#EED322',
            1000,
            '#E6B71E',
            5000,
            '#DA9C20',
            10000,
            '#CA8323',
            50000,
            '#B86B25',
            100000,
            '#A25626',
            500000,
            '#8B4225',
            1000000,
            '#723122',
          ],
          'fill-opacity': 0.75,
        },
      });
    });

  }, []);

  return (

      <div ref={mapContainer} className="map-container">
        <div id="legend" className="legend" style={{ display: legendDisplay }}>
        <h4>Population</h4>
            <div><span className= "b723122" ></span>25,000,000</div>
            <div><span className= "b8b4225"></span>10,000,000</div>
            <div><span className= "ba25626"></span>7,500,000</div>
            <div><span className= "bb86b25"></span>5,000,000</div>
            <div><span className= "bca8323"></span>2,500,000</div>
            <div><span className= "bda9c20"></span>1,000,000</div>
            <div><span className= "be6b71e"></span>750,000</div>
            <div><span className= "beed322"></span>500,000</div>
            <div><span className= "bf2f12d"></span>0</div>
      </div>
     </div>

  );
}

export default ChoroplethMap;