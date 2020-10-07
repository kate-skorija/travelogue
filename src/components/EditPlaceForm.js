import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useFirestore } from 'react-redux-firebase';
import styles from './PlaceModal.module.css';

function EditPlaceForm(props) {

  const firestore = useFirestore();

  function handleEditPlaceSubmission(event) {
    event.preventDefault();
    const propertiesToAdd = {
      name: event.target.name.value, 
      country: event.target.country.value, 
      notes: event.target.notes.value, 
    }

    firestore.update({collection: 'places', doc: props.place.get('featureId')}, propertiesToAdd);
    props.onEditPlace({name: event.target.name.value, type: event.target.type.value, country: event.target.country.value, notes: event.target.notes.value, longitude: props.place.get('longitude'), latitude: props.place.get('latitude'), userId: props.place.get('userId'), featureId: props.place.get('featureId') });
  }

  return (
    <React.Fragment>
      <Modal show={props.onShow} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditPlaceSubmission}>
          <select id="type" name="type" className="form-control">
              <option value="toGo">To Go</option>
              <option value="haveBeen">Have Been</option>
            </select>
            <input className="form-control"
              type='text'
              name='name'
              placeholder={props.place.get('name')} 
              required />
            <label for="type">Type of Place:</label>
            <input className="form-control"
              type='text'
              name='country'
              placeholder={props.place.get('country')}  />
            <textarea className="form-control"
              name='notes'
              placeholder={props.place.get('notes')} />
            <button className={styles.modalButton} type='submit'>Save</button>
            <button className={styles.modalButton} onClick={()=> props.onDeletePlace(props.place.get('featureId'))}>Delete Place</button>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

EditPlaceForm.propTypes = {
  onHide: PropTypes.func,
  onShow: PropTypes.bool,
  onEditPlace: PropTypes.func,
  onDeletePlace: PropTypes.func,
  place: PropTypes.object
}

export default EditPlaceForm;