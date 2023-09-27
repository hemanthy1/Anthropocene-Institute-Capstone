import "./Heatmap.css"
import {useState, useEffect, useRef} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// bind our personal access token to the 
mapboxgl.accessToken = 'pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbXM2bWQwczAxNjYyam43ODhpcTJqOXcifQ.YX_SzlMj6UPrqTMTweWLog';

function Heatmap() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-65.0);
  const [lat, setLat] = useState(45.0);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if(map.current) return; // prevent multiple instances of map

    map.current = new mapboxgl.Map( {
      container: mapContainer.current,
      style: 'mapbox://styles/jholsch29/cln0ugv9e066g01mady6n3hlg',
      center: [lat, lng],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div ref={mapContainer} className="map-container" />
  );
}

export default Heatmap