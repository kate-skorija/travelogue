
import React from "react";
import Nav from './Nav';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {transform, fromLonLat} from 'ol/proj'
import { Zoom } from 'ol/control';
import Stamen from 'ol/source/Stamen';
import styles from './MapControl.module.css';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import firebase from "firebase/app";
import { Feature } from "ol";
import { Point } from 'ol/geom'
import { withFirestore } from 'react-redux-firebase';
// import Select from 'ol/interaction/Select';
// import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import 'ol/ol.css'
import { Modal } from 'react-bootstrap';
// import NewPlaceForm from './NewPlaceForm';
import { v4 } from 'uuid';

class MapControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      features: [],
      // featuresLayer: null,
      modalVisible: false,
      selectedFeature: null
    };
  }
  
  componentDidMount() {

    // Get user's previously added points from firestore and add them to features array
    const user = firebase.auth().currentUser;
    
    const previousPlaces = this.props.firestore.collection('places').where('userId', '==', user.uid).get()
      .then((querySnapshot) => {                                    
      const result = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })

      result.forEach((place) => {
        
        const oldPlace = new Feature ({
          geometry: new Point([place.longitude, place.latitude]),
          userId: place.userId,
          name: place.name,
          country: place.country,
          notes: place.notes,
          longitude: place.longitude,
          latitude: place.latitude,
          featureId: place.id
        });

        this.setState({
          features: [...this.state.features, oldPlace]
        });

        this.displayPoints(oldPlace);
      });
      
    });

    // const featuresLayer = new VectorLayer ({
    //   source: new VectorSource ({
    //     features: this.state.features
    //   })
    // })

    // Create intial Map
    const map = new Map({
      target: 'map',
      controls: [
        new Zoom({
          className: 'zoom'
        })
      ],
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner',
          }),
        }),
        // featuresLayer
      ],
      view: new View({
        center: fromLonLat([11, 20]),
        zoom: 0
      })
    });

    this.setState({
      map: map,
      // featuresLayer: featuresLayer
    });
    
    map.on('click', this.handleMapClick.bind(this));

  }

  // componentDidUpdate() {
  //   this.displayPoints();
  // }

  handleMapClick(event) {
    const rawCoord = event.coordinate;
    const transformedCoord = transform(rawCoord, 'EPSG:3857', 'EPSG:4326');
    const user = firebase.auth().currentUser;

    //Check to see if features are already present where clicked, if so display form/details
    let featuresAtClick = []
    this.state.map.forEachFeatureAtPixel(event.pixel, 
      (feature, layer) => {
        featuresAtClick.push(feature);
        if(featuresAtClick && featuresAtClick.length > 0) {
          this.setState({
            modalVisible: true,
            selectedFeature: feature
          })
        }
      },
      {hitTolerance: 4}
    );

    //Create new place in firestore and features array if no features are present where clicked
    if (!featuresAtClick || featuresAtClick.length === 0 ){
  
      this.props.firestore.collection('places').add(
        {
          latitude: rawCoord[1],
          longitude: rawCoord[0],
          userId: user.uid,
          name: null,
          country: null,
          notes: null,
        }
      ).then((docRef) => {
        const newPlace = new Feature({
          geometry: new Point([rawCoord[0], rawCoord[1]]),
          latitude: rawCoord[1],
          longitude: rawCoord[0],
          userId: user.uid,
          featureId: docRef.id,
          name: null,
          country: null,
          notes: null
        });

        this.setState({
          features: [...this.state.features, newPlace],
        });

        this.displayPoints(newPlace);
    });
    }
  }


  displayPoints(featureToAdd) {
    
    let pointStyle = null;
    this.state.features.forEach((feature) => {
      console.log(feature);
      if (feature.get('name')) {
        pointStyle = new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: 'blue',
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33',
            }),
          }),
        });
      } else {
        pointStyle = new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: 'blue',
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: 'blue',
            }),
          }),
        });
      }
    });
    
    console.log(this.state.features);

    const vectorSource = new VectorSource({
      features: [...this.state.features, featureToAdd]
    });

    // vectorSource.addFeature(featureToAdd);

    const pointsVectorLayer = new VectorLayer({
      source: vectorSource,
      style: pointStyle
    });

    // const updatedFeaturesLayer = new VectorLayer({
    //   style: pointStyle,
    //   source: vectorSource
    // })

    
    this.state.map.addLayer(pointsVectorLayer);
    
  }

  handleNewPlace = (newPlace) => {

    console.log(newPlace);
    const newPlaceFeature = new Feature({
      geometry: new Point(newPlace.longitude, newPlace.latitude),
      longitude: newPlace.longitude,
      latitude: newPlace.latitude,
      userId: newPlace.userId,
      featureId: newPlace.featureId,
      name: newPlace.name,
      country: newPlace.country,
      notes: newPlace.notes,
    })
    const newFeaturesList = this.state.features
      .filter(place => place.get('featureId')!== newPlace.featureId)
      .concat(newPlaceFeature);
      console.log(newFeaturesList);

    this.setState({
      features: newFeaturesList,
      selectedFeature: null,
      modalVisible: false
    });

    this.displayPoints(newPlaceFeature);
  }

  //Adds form values to Firestore
  handleNewPlaceFormSubmission = (event) => {
    event.preventDefault();
    const propertiesToAdd = {
      name: event.target.name.value, 
      country: event.target.country.value, 
      notes: event.target.notes.value, 
    }

    this.props.firestore.update({collection: 'places', doc: this.state.selectedFeature.get('featureId')}, propertiesToAdd)

    this.handleNewPlace({name: event.target.name.value, country: event.target.country.value, notes: event.target.notes.value, longitude: this.state.selectedFeature.get('longitude'), latitude: this.state.selectedFeature.get('latitude'), userId: this.state.selectedFeature.get('userId'), featureId: this.state.selectedFeature.get('featureId') })

  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    let featureModal = null;
    if (this.state.modalVisible && this.state.selectedFeature.get('name')) {
      featureModal = <Modal show={this.state.modalVisible} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.selectedFeature.get('name')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Country: {this.state.selectedFeature.get('country')}</p>
          <p>Notes: {this.state.selectedFeature.get('notes')}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.modalButton} onClick={this.hideModal}>Close</button>
        </Modal.Footer>
      </Modal>
    } else if (this.state.modalVisible && !this.state.selectedFeature.get('name')) {
      featureModal = 
      // featureModal = <NewPlaceForm onShow={this.state.modalVisiable} onHide={this.handleClose} onPlaceCreation={this.handleNewPlace} id={this.state.selectedFeature.get('featureId')} />
      <Modal show={this.state.modalVisible} onHide={this.hideModal} >
      <Modal.Header closeButton>
        <Modal.Title>Add a New Place</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={this.handleNewPlaceFormSubmission}>
          <input className="form-control"
            type='text'
            name='name'
            placeholder='Name of Place' 
            required />
          <input className="form-control"
            type='text'
            name='country'
            placeholder='Country' />
          <textarea className="form-control"
            name='notes'
            placeholder='Notes' />
          <button className={styles.modalButton} type='submit'>Save</button>
        </form>
      </Modal.Body>
    </Modal>
    }
    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          <Nav />
          <div className={styles.map} id='map'></div>
          {featureModal}
        </div>
      </React.Fragment>
    )
  }
}

export default withFirestore(MapControl);



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