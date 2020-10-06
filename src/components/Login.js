import React from "react";
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({history}) => {  

  function doLogin(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      history.push('/explore');
    }).catch(function(error) {
      alert(error.message); 
    });
  }

  return (
    <React.Fragment>
      <div className={styles.login}>
        <div className={styles.loginContent}>
          <h1>Travelogue</h1>
          <p>Log in to your account.</p>
          <form onSubmit={doLogin}>
            <input
              type='text'
              name='signinEmail'
              placeholder='email' />
            <input
              type='password'
              name='signinPassword'
              placeholder='password' />
            <button type='submit'>Log In</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Login);