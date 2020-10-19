import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';

const Button = styled.button`
  background-color: #ffcc33;
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px 15px;
  margin: 10px 10px 0 0;
`;

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
      <Modal show={props.onShow} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.place.get('name')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Type of Place: {handlePlaceType(props.place.get('type'))}</p>
          <p>Country: {props.place.get('country')}</p>
          <p>Notes: {props.place.get('notes')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onEditClick}>Edit</Button>
          <Button onClick={props.onHide}>Close</Button>
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

