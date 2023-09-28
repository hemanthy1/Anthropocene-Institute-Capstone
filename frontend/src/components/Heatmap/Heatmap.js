import "./Heatmap.css"
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// bind our personal access token to the 
mapboxgl.accessToken = 'pk.eyJ1IjoiamhvbHNjaDI5IiwiYSI6ImNsbjJjaWllNzAwcDQyam1wYnF6NHQ0Z24ifQ.TYll92t4SavsRHHFUhU-UA';

function Heatmap() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(3.4);


  const sw = new mapboxgl.LngLat(-45, -35);
  const ne = new mapboxgl.LngLat(45, 35);
  const llb = new mapboxgl.LngLatBounds(sw, ne);

  useEffect(() => {
    if(map.current) return; // prevent multiple instances of map

    map.current = new mapboxgl.Map( {
      container: mapContainer.current,
      style: 'mapbox://styles/jholsch29/cln2e89yr06mc01qb2p5jegml',
      center: [lng, lat],
      zoom: zoom,
      minZoom: 3.4,
      maxZoom: 10,
      maxBounds: llb
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Heatmap;