import React, { useState, useRef, useEffect } from "react";
import Nav from './Nav';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import {transform} from 'ol/proj'
import Stamen from 'ol/source/Stamen';
import styles from './Explore.module.css';

function Explore(props) {

  const [ map, setMap ] = useState();
  const [ featuresLayer, setFeaturesLayer ] = useState();
  const [ selectedCoord, setSelectedCoord ] = useState();

  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect( () => {

    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    });
    
    const initialMap = new Map({
      target: mapElement.current,
      layers: [

        new TileLayer({
          source: new Stamen({
            layer: 'toner',
          }),
        }),

        initialFeaturesLayer

      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      target: 'map',
      controls: []
    })
    
    initialMap.on('click', handleMapClick)

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);

  }, [])

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');
    setSelectedCoord(transformedCoord);

    console.log(transformedCoord)
  }

  return (
    <React.Fragment>
      <Nav />
      <p>Map will be here soon!</p>
      <div ref={mapElement} className={styles.map} id='map'></div> 
    </React.Fragment>
  )
}

export default Explore;


