import "./Heatmap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function ChoroplethMap(props) {

  const mapContainer = useRef(null);
  const [legendDisplay] = useState('block');
  const zoomThreshold = 2;

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
            props.colors.color1,
            5000,
            props.colors.color2,
            10000,
            props.colors.color3,
            50000,
            props.colors.color4,
            100000,
            props.colors.color5,
            500000,
            props.colors.color6,
            1000000,
            props.colors.color7,
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
            props.colors.color1,
            5000,
            props.colors.color2,
            10000,
            props.colors.color3,
            50000,
            props.colors.color4,
            100000,
            props.colors.color5,
            500000,
            props.colors.color6,
            1000000,
            props.colors.color7,
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
            <div><span className= "b723122" style={{backgroundColor: props.colors.color7}}></span></div>
            <div><span className= "b8b4225" style={{backgroundColor: props.colors.color6}}></span></div>
            <div><span className= "ba25626" style={{backgroundColor: props.colors.color5}}></span></div>
            <div><span className= "bb86b25" style={{backgroundColor: props.colors.color4}}></span></div>
            <div><span className= "bca8323" style={{backgroundColor: props.colors.color3}}></span></div>
            <div><span className= "bda9c20" style={{backgroundColor: props.colors.color2}}></span></div>
            <div><span className= "be6b71e" style={{backgroundColor: props.colors.color1}}></span></div>
            <h3>Least</h3>
      </div>
     </div>

  );
}

export default ChoroplethMap;