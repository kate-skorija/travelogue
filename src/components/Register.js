import React from "react";
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';

function Register() {

  function doRegister(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      history.push('/explore')
    }).catch(function(error) {
      alert(error.message) 
    });
  }

  return (
    <React.Fragment>
      <h1>Travelogue</h1>
      <p>For endless exploration, create a free account.</p>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Register</button>
      </form>
    </React.Fragment>
  );
}

export default withRouter(Register);