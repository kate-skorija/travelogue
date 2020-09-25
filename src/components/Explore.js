import React, { useState, useRef, useEffect } from "react";
import Nav from './Nav';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
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
  const draw = null;
  const snap = null;

  useEffect( () => {

    // const initialFeaturesLayer = new VectorLayer({
    //   source: new VectorSource()
    // });

    const raster = new TileLayer({
      source: {
        source: new Stamen({
          layer: 'toner',
        }),
      }
    })

    const source = new VectorSource();
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    })
    
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        raster,
        vector
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      target: 'map',
      controls: []
    });

    const modify = new Modify({source: source});
    map.addInteraction(modify);

    function addInteractions() {
      const draw = new Draw({
        source: source,
        type: "Circle"
      });
      initialMap.addInteraction(draw);
      const snap = new Snap({source: source});
      map.addInteraction(snap);
    }

    const handleMapClick = (event) => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      addInteractions();
      const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
      const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');
      setSelectedCoord(transformedCoord);
      console.log(transformedCoord)
    }

    initialMap.on('click', handleMapClick)

    setMap(initialMap);
    setFeaturesLayer(vector, source);
    addInteractions();

  }, [])  

  return (
    <React.Fragment>
      <Nav />
      <div ref={mapElement} className={styles.map} id='map'></div> 
    </React.Fragment>
  )
}

export default Explore;

// useEffect( () => {

//   const initialFeaturesLayer = new VectorLayer({
//     source: new VectorSource()
//   });
  
//   const initialMap = new Map({
//     target: mapElement.current,
//     layers: [

//       new TileLayer({
//         source: new Stamen({
//           layer: 'toner',
//         }),
//       }),

//       initialFeaturesLayer

//     ],
//     view: new View({
//       center: [0, 0],
//       zoom: 2
//     }),
//     target: 'map',
//     controls: []
//   })
  
//   initialMap.on('click', handleMapClick)

//   setMap(initialMap);
//   setFeaturesLayer(initialFeaturesLayer);

// }, [])