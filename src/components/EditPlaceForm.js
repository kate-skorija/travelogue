import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useFirestore } from 'react-redux-firebase';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #ffcc33;
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px 15px;
  margin: 10px 10px 0 0;
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const Select = styled.select`
  margin-bottom: 10px;
`;

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
      <Modal show={props.onShow} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit {props.place.get('name')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditPlaceSubmission}>
          <label for="type">Type of Place:</label>
          <Select id="type" name="type" className="form-control">
              <option value="toGo">To Go</option>
              <option value="haveBeen">Have Been</option>
            </Select>
            <Input className="form-control"
              type='text'
              name='name'
              placeholder={props.place.get('name')} 
              required />
            <Input className="form-control"
              type='text'
              name='country'
              placeholder={props.place.get('country')}  />
            <textarea className="form-control"
              name='notes'
              placeholder={props.place.get('notes')} />
            <Button type='submit'>Save</Button>
            <Button onClick={()=> props.onDeletePlace(props.place.get('featureId'))}>Delete Place</Button>
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