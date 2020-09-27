import React from "react";
import Nav from './Nav';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
// import {transform} from 'ol/proj'
import Stamen from 'ol/source/Stamen';
import styles from './MapControl.module.css';
// import { useFirestore } from 'react-redux-firebase';
// import firebase from "firebase/app";
// import { render } from "@testing-library/react";
// import PropTypes from 'prop-types';

class MapControl extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const featuresLayer = new VectorLayer({
      source: new VectorSource({
        features:[]
      })
    });
  
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner',
          }),
        }),
        featuresLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  
    map.on('click', this.handleMapClick.bind(this));
  
    this.setState({
      map: map,
      featuresLayer: featuresLayer
    });
  }
  
  handleMapClick() {
    console.log("Map clicked!")
  }
  

  render() {
    return (
      <React.Fragment>
        <Nav />
        <div className={styles.map} id='map'></div>
      </React.Fragment>
    )
  }

}


export default MapControl;









// Class Component

// constructor (props) {
//   super(props);
//   this.state = {
//     map: null,
//     featuresLayer: null
//   };
// }

// componentDidMount() {
//   const featuresLayer = new VectorLayer({
//     source: new VectorSource({
//       features:[]
//     })
//   });

//   const map = new Map({
//     target: 'map',
//     layers: [
//       new TileLayer({
//         source: new Stamen({
//           layer: 'toner',
//         }),
//       }),
//       featuresLayer
//     ],
//     view: new View({
//       center: [0, 0],
//       zoom: 2
//     })
//   });

//   map.on('click', this.handleMapClick.bind(this));

//   this.setState({
//     map: map,
//     featuresLayer: featuresLayer
//   });
// }

// handleMapClick() {
//   console.log("Map clicked!")
// }

// render() {
//   return (
//     <React.Fragment>
//       <Nav />
//       <div className='map'></div>
//     </React.Fragment>
//   );
// }


// Functional Map with Hooks

// const [ map, setMap ] = useState();
// const [ featuresLayer, setFeaturesLayer ] = useState();
// const [ selectedCoord, setSelectedCoord ] = useState();

// const mapElement = useRef();
// const mapRef = useRef();
// mapRef.current = map;

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

// const firestore = useFirestore();
// const user = firebase.auth().currentUser;

// const handleMapClick = (event) => {
//   const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
//   const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');
//   setSelectedCoord(transformedCoord);
//   console.log(transformedCoord)

//   // return firestore.collection('places').add(
//   //   {
//   //     latitude: transformedCoord[0],
//   //     longitute: transformedCoord[1],
//   //     userId: user.uid
//   //   }
//   // );
// }

// return (
//   <React.Fragment>
//     <Nav />
//     <div ref={mapElement} className={styles.map} id='map'></div> 
//   </React.Fragment>
// )
// }
