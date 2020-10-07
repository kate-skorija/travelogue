import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import styles from './PlaceModal.module.css';

function PlaceDetails(props) {

  function handlePlaceType(type) {
    if (type === "haveBeen") {
      return "Have Been";
    } else {
      return "To Go";
    }
  }

  return(
    <React.Fragment>
      <Modal show={props.onShow} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.place.get('name')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Type of Place: {handlePlaceType(props.place.get('type'))}</p>
          <p>Country: {props.place.get('country')}</p>
          <p>Notes: {props.place.get('notes')}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.modalButton} onClick={props.onEditClick}>Edit</button>
          <button className={styles.modalButton} onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

PlaceDetails.propTypes = {
  onHide: PropTypes.func,
  onShow: PropTypes.bool,
  onEditClick: PropTypes.func,
  onDelete: PropTypes.func,
  place: PropTypes.object
}

export default PlaceDetails;

