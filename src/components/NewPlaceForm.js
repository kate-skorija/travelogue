import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Feature } from "ol";

function NewPlaceForm(props){

  const { place } = props;

  function handleNewPlaceSubmission(event) {
    event.preventDeafult();
    props.onPlaceCreation({name: event.target.name.value, country: event.target.country.value, notes: event.target.notes.value, featureId: place.get('featureId')})
  }

  return (
    <React.Fragment>
      <Modal show={props.onShow} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleNewPlaceSubmission}>
            <input
              type='text'
              name='name'
              placeholder='Name of Place' 
              required />
            <input
              type='text'
              name='country'
              placeholder='Country' />
            <textarea
              name='notes'/>
            <button type='submit'>Save</button>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

NewPlaceForm.propTypes = {
  onHide: PropTypes.func,
  onShow: PropTypes.bool,
  onPlaceCreation: PropTypes.func
}

export default NewPlaceForm;
