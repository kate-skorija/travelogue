import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import styles from './Logout.module.css';

function Logout() {

  const [loggedIn, setLoggedIn] = useState(true);

  function doLogout() {
    firebase.auth().signOut().then(function() {
      console.log("Signed out!");
      setLoggedIn(false);
    }).catch(function(error) {
      alert(error.message);
    });
  }

  return (
      <React.Fragment>
        <div className={styles.logout}>
          <div className={styles.logoutContent}>
            <h3>Thanks for using Travelogue.</h3>
            <h3> See you again soon.</h3>
            {loggedIn ? <button onClick={doLogout}>Log Out</button> : <h4>You have successfully logged out!</h4>}
            <button><Link to='/explore'>Back to Travelogue</Link></button>
          </div>
        </div>
      </React.Fragment>
  )
}

export default Logout;