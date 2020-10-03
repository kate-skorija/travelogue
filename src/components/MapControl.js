import React from "react";
import Nav from './Nav';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {transform} from 'ol/proj'
import Stamen from 'ol/source/Stamen';
import styles from './MapControl.module.css';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { useFirestore } from 'react-redux-firebase';
import firebase from "firebase/app";
import PropTypes from 'prop-types';
import { Feature, Overlay } from "ol";
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj';
import { withFirestore } from 'react-redux-firebase';
import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import 'ol/ol.css'

class MapControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      features: [],
      selectedPoint: null
    };
  }
  
  componentDidMount() {
  
    const map = new Map({
      target: 'map',
      controls: [],
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner',
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    const popUpOverlay = new Overlay({
      element: this.popup.nativeElement,
      offset: [9,9]
    });

    map.addOverlay(popUpOverlay)

    map.on('pointermove', this.handleFeatureClick.bind(this));

    map.on('click', this.handleMapClick.bind(this));
  
    this.setState({
      map: map,
    });

  }

  handleFeatureClick(event) {
    let features = [];
    this.map.forEachFeatureAtPixel(event.pixel,
      (feature, layer) => {
        features = feature.get('features');
        const valuesToShow = [];
        if (features && features.length > 0) {
          valuesToShow.push(features.get('userId'));
          this.popup.nativeElement.innerHTML = valuesToShow;
          this.popup.nativeElement.hidden = false;
          this.popupOverlay.setPosition(event.coordinate);
        }

      });
    if (!features || features.length === 0) {
      this.popup.nativeElement.innerHtml = '';
      this.popup.nativeElement.hidden = true;
    }
  }
  
  handleMapClick(event) {
    const coord = event.coordinate;
    const transformedCoord = transform(coord, 'EPSG:3857', 'EPSG:4326');

    const user = firebase.auth().currentUser;

    const newPoint = new Feature({
      geometry: new Point(coord),
      userId: user.uid
    })

    this.setState({
      features: [...this.state.features, newPoint]
    })

    this.props.firestore.collection('places').add(
      {
        latitude: transformedCoord[1],
        longitute: transformedCoord[0],
        userId: user.uid
      }
    );
    
    this.displayPoints();
  }

  // getUserPoints = () => {
  //   console.log("get user points!")
  //   const user = firebase.auth().currentUser;
  //   this.props.firestore.collection('points').where('userId', '==', user.uid).get()
  //     .then(function(querySnapshot) {      
  //       console.log(querySnapshot)                                    
  //       const result = querySnapshot.docs.map((doc) => {
  //         return { ...doc.data(), id: doc.id }
  //       }); 
  //       console.log(result);
  //       // this.displayUserPoints(result)
  //     });
  //     // this.displayUserPoints(userPoints);
  // } 

  displayPoints() {
    console.log("display points!")
    const pointStyle = new Style({
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
    });

    const vectorSource = new VectorSource({
      features: this.state.features
    });

    const pointsVectorLayer = new VectorLayer({
      source: vectorSource,
      style: pointStyle
    });

    this.state.map.addLayer(pointsVectorLayer);
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <div className={styles.map} id='map'></div>
        <div className="popup" hidden="true"></div>
      </React.Fragment>
    )
  }
}

export default withFirestore(MapControl);






// --------------- Adding Points ------------------ //
// in the handleMapClick:

// var pointStyle = new Style({
    //   fill: new Fill({
    //     color: 'rgba(255, 255, 255, 0.2)',
    //   }),
    //   stroke: new Stroke({
    //     color: '#ffcc33',
    //     width: 2,
    //   }),
    //   image: new CircleStyle({
    //     radius: 7,
    //     fill: new Fill({
    //       color: '#ffcc33',
    //     }),
    //   }),
    // })
    // var vectorSource = new VectorLayer({
    //   features: this.state.points
    // });
    // var pointsVectorLayer = new VectorLayer({
    //   source: vectorSource,
    //   style: pointStyle
    // })
    // this.setState({
    //   featuresLayer: pointsVectorLayer
    // })
    // const newPoint = new Feature({
    //     geometry: new Point(fromLonLat(coord)),
    //     name: "New Point",
    //   })

  // componentDidUpdate() {
  //   const vectorSource = new VectorLayer({
  //     features: this.state.points
  //   })

  //   this.state.featuresLayer = new VectorLayer({
  //       source: vectorSource,
  //       style: new Style({
  //         fill: new Fill({
  //           color: 'rgba(255, 255, 255, 0.2)',
  //         }),
  //         stroke: new Stroke({
  //           color: '#ffcc33',
  //           width: 2,
  //         }),
  //         image: new CircleStyle({
  //           radius: 7,
  //           fill: new Fill({
  //             color: '#ffcc33',
  //           }),
  //         }),
  //       })
  //     })
  // }


// --------------- Class Component ---------------------//

// class MapControl extends React.Component {

// constructor(props) {
//   super(props);
//   this.state = {};
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
//       <div className={styles.map} id='map'></div>
//     </React.Fragment>
//   )
// }
//}


// ------------- Functional Map with Hooks -----------------//

// function MapControl (props) {
//   const [ map, setMap ] = useState();
//   const [ featuresLayer, setFeaturesLayer ] = useState();
//   const [ selectedCoord, setSelectedCoord ] = useState();

//   const mapElement = useRef();
//   const mapRef = useRef();
//   mapRef.current = map;

//   useEffect( () => {

//     const initialFeaturesLayer = new VectorLayer({
//       source: new VectorSource()
//     });
    
//     const initialMap = new Map({
//       target: mapElement.current,
//       layers: [

//         new TileLayer({
//           source: new Stamen({
//             layer: 'toner',
//           }),
//         }),

//         initialFeaturesLayer

//       ],
//       view: new View({
//         center: [0, 0],
//         zoom: 2
//       }),
//       target: 'map',
//       controls: []
//     })
    
//     initialMap.on('click', handleMapClick)

//     setMap(initialMap);
//     setFeaturesLayer(initialFeaturesLayer);

//   }, [])

//   const firestore = useFirestore();
//   const user = firebase.auth().currentUser;

//   const handleMapClick = (event) => {
//     const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
//     const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');
//     setSelectedCoord(transformedCoord);
//     console.log(transformedCoord)

//   // return firestore.collection('places').add(
//   //   {
//   //     latitude: transformedCoord[0],
//   //     longitute: transformedCoord[1],
//   //     userId: user.uid
//   //   }
//   // );
//   }

//   return (
//     <React.Fragment>
//       <Nav />
//       <div ref={mapElement} className={styles.map} id='map'></div> 
//     </React.Fragment>
//   )
// }

// export default MapControl;


// --------- Class Component with Methods ---------- //

// class MapControl extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       map: null,
//     };
//   }
  
//   componentDidMount() {
  
//     const map = new Map({
//       target: 'map',
//       controls: [],
//       layers: [
//         new TileLayer({
//           source: new Stamen({
//             layer: 'toner',
//           }),
//         }),
//       ],
//       view: new View({
//         center: [0, 0],
//         zoom: 2
//       })
//     });

    
  
//     map.on('click', this.handleMapClick.bind(this));
//     // this.getUserPoints = this.getUserPoints.bind(this)
//     // this.getUserPoints();
  
//     this.setState({
//       map: map,
//     });

//   }
  
//   handleMapClick(event) {
//     const coord = event.coordinate;
//     const transformedCoord = transform(coord, 'EPSG:3857', 'EPSG:4326');
//     console.log(transformedCoord);

//     const user = firebase.auth().currentUser;

//     this.props.firestore.collection('places').add(
//       {
//         latitude: transformedCoord[1],
//         longitute: transformedCoord[0],
//         userId: user.uid
//       }
//     );
//     this.getUserPoints();
//   }

//   getUserPoints = () => {
//     console.log("get user points!")
//     const user = firebase.auth().currentUser;
//     const userPoints = this.props.firestore.collection('points').where('userId', '==', user.uid).get()
//       .then(function(querySnapshot) {                                          
//         const result = querySnapshot.docs.map((doc) => {
//           return { ...doc.data(), id: doc.id }
//         }); 
//         console.log(result);
//         console.log(this);
//         // this.displayUserPoints(result)
//       });
//       // this.displayUserPoints(userPoints);
//   } 

//   displayUserPoints(result) {
//     console.log("display user points!")
//     var pointStyle = new Style({
//       fill: new Fill({
//         color: 'rgba(255, 255, 255, 0.2)',
//       }),
//       stroke: new Stroke({
//         color: '#ffcc33',
//         width: 2,
//       }),
//       image: new CircleStyle({
//         radius: 7,
//         fill: new Fill({
//           color: '#ffcc33',
//         }),
//       }),
//     });

//     var vectorSource = new VectorLayer({
//       features: result
//     });

//     var pointsVectorLayer = new VectorLayer({
//       source: vectorSource,
//       style: pointStyle
//     });

//     this.state.map.addLayer(pointsVectorLayer);
//   }

//   // componentDidUpdate() {
//   //   this.getUserPoints();
//   // }

//   render() {
//     return (
//       <React.Fragment>
//         <Nav />
//         <div className={styles.map} id='map'></div>
//       </React.Fragment>
//     )
//   }
// }

// export default withFirestore(MapControl);

// ---------- Select Element ------------------- //

 // var selectClick = new Select({
    //   condition: click,
    // });

    // var selectPoint = function() {
    //   var value = selectElement.value;
    //   if (value == 'click') {
    //     select = selectClick;
    //   } else {
    //     select = null;
    //   }
    //   if (select !== null) {
    //     map.addInteraction(select);
    //     select.on('select', function(event) {
    //       console.log("selected!")
    //     })
    //   }
    // }

    // selectPoint();
