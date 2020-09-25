import React, { useState, useRef, useEffect } from "react";
import Nav from './Nav';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM';
// import XYZ from 'ol/source/XYZ'
import {transform} from 'ol/proj'
// import {toStringXY} from 'ol/coordinate';
import Stamen from 'ol/source/Stamen';

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
          source: new OSM()
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

  useEffect( () => {
    if (props.features.length) {
      featuresLayer.setSource(
        new VectorSource({
          features: props.features
        })
      )

      map.getview().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100]
      })

    }
  }, [props.features])

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
      <div ref={mapElement} id='map' clasName='map' style={{height: '70vh', width: '70%'}}></div> 
    </React.Fragment>
  )
}

export default Explore;


