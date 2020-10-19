import React from "react";
import firebase from "firebase/app";
import styled from 'styled-components';
import Nav from './Nav';
import NewPlaceForm from './NewPlaceForm';
import EditPlaceForm from './EditPlaceForm';
import PlaceDetails from './PlaceDetails';
import DeletePlace from './DeletePlace';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Stamen from 'ol/source/Stamen';
import { transform, fromLonLat } from 'ol/proj'
import { Zoom } from 'ol/control';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Feature } from "ol";
import { Point } from 'ol/geom'
import { withFirestore } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import 'firebase/auth';
import 'ol/ol.css'

const MapWrapper = styled.section`
  background-color: black;
  width: 100vw;
  height: 100vh;
`;

const StyledMap = styled.div`
  width: 90vw;
  height: 80vh;
  margin: auto;
  border: 10px solid white;
`;

class MapControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      features: [],
      modalVisible: false,
      selectedFeature: null,
      editing: false,
      deleted: false,
      redirect: null
    };
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Get user's previously added points from firestore and add them to features array
        const previousPlaces = this.props.firestore.collection('places').where('userId', '==', user.uid).get()
          .then((querySnapshot) => {                                    
            const result = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          });
            result.forEach((place) => {
              const oldPlace = new Feature ({
                geometry: new Point([place.longitude, place.latitude]),
                userId: place.userId,
                name: place.name,
                type: place.type,
                country: place.country,
                notes: place.notes,
                longitude: place.longitude,
                latitude: place.latitude,
                featureId: place.id
              });

            this.setState({
              features: [...this.state.features, oldPlace]
            });
          });
        });
      } else {
        this.setState({
          redirect: "/Login"
        });
      }
    });

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
      ],
      view: new View({
        center: fromLonLat([11, 20]),
        zoom: 0
      })
    });

    this.setState({
      map: map
    });
    
    map.on('click', this.handleMapClick.bind(this));
  }

  componentDidUpdate() {
    this.displayPoints();
  }

  handleMapClick(event) {
    const rawCoord = event.coordinate;
    const transformedCoord = transform(rawCoord, 'EPSG:3857', 'EPSG:4326');
    const user = firebase.auth().currentUser;

    //Check to see if features are already present where clicked, if so display form/details
    let featuresAtClick = [];
    this.state.map.forEachFeatureAtPixel(event.pixel, 
      (feature, layer) => {
        featuresAtClick.push(feature);
        if(featuresAtClick && featuresAtClick.length > 0) {
          this.setState({
            modalVisible: true,
            selectedFeature: feature
          });
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
          type: null,
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
          type: null,
          country: null,
          notes: null
        });

        this.setState({
          features: [...this.state.features, newPlace],
        });
      });
    }
  }

  displayPoints() {
    //Create points on map for each feature
    const pointStyle = new Style({
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

  handleNewPlace = (newPlace) => {
    const newPlaceFeature = new Feature({
      geometry: new Point(newPlace.longitude, newPlace.latitude),
      longitude: newPlace.longitude,
      latitude: newPlace.latitude,
      userId: newPlace.userId,
      featureId: newPlace.featureId,
      name: newPlace.name,
      type: newPlace.type,
      country: newPlace.country,
      notes: newPlace.notes,
    });

    const newFeaturesList = this.state.features
      .filter(place => place.get('featureId')!== newPlace.featureId)
      .concat(newPlaceFeature);
      console.log(newFeaturesList);

    this.setState({
      features: newFeaturesList,
      selectedFeature: newPlaceFeature,
      editing: false
    });
  }

  handleEditClick = () => {
    this.setState({
      editing: true
    });
  }

  handleDeletePlace = (id) => {
    this.props.firestore.delete({collection: 'places', doc: id});
    const updatedFeatures = this.state.features.filter(place => place.get('featureId') !== id);
    this.setState({
      features: updatedFeatures,
      editing: false,
      deleted: true,
    });
  }

  closeModal = () => {
    this.setState({ 
      deleted: false,
      modalVisible: false, 
      selectedFeature: null 
    });
    window.location.reload(false);
  }

  

  render() {
    

    let featureModal = null;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    } else if (this.state.deleted) {
      featureModal = <DeletePlace onShow={this.state.modalVisible} onHide={this.closeModal} place={this.state.selectedFeature} />
    } else if (this.state.editing) {
      featureModal = <EditPlaceForm onShow={this.state.modalVisible} onHide={this.closeModal} place={this.state.selectedFeature} onEditPlace={this.handleNewPlace} onDeletePlace={this.handleDeletePlace} />
    } else if (this.state.modalVisible && this.state.selectedFeature.get('name')) {
      featureModal = <PlaceDetails onShow={this.state.modalVisible} onHide={this.closeModal} place={this.state.selectedFeature} onEditClick={this.handleEditClick} />
    } else if (this.state.modalVisible && !this.state.selectedFeature.get('name')) {
      featureModal = <NewPlaceForm onShow={this.state.modalVisible} onHide={this.closeModal} onPlaceCreation={this.handleNewPlace} place={this.state.selectedFeature} />
    }
    return (
      <React.Fragment>
        <MapWrapper>
          <Nav />
          <StyledMap id='map'></StyledMap>
          {featureModal}
        </MapWrapper>
      </React.Fragment>
    );
  }
}

export default withFirestore(MapControl);