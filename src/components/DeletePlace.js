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

function DeletePlace(props) {
  
  return(
    <React.Fragment>
      <Modal show={props.onShow} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Place has been deleted from your map.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
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
