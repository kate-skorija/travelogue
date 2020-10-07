import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import styles from './PlaceModal.module.css';

function DeletePlace(props) {
  
  return(
    <React.Fragment>
      <Modal show={props.onShow} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.place.get('name')} has been deleted from your map.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.modalButton} onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

DeletePlace.propTypes = {
  onHide: PropTypes.func,
  onShow: PropTypes.bool,
  place: PropTypes.object
}

export default DeletePlace;
