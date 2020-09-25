import React from "react";
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';

const Login = ({history}) => {  

  function doLogin(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      history.push('/')
    }).catch(function(error) {
      alert(error.message) 
    });
  }

  return (
    <React.Fragment>
      <h1>Travelogue</h1>
      <form onSubmit={doLogin}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Log In</button>
      </form>
    </React.Fragment>
  );
}

export default withRouter(Login);