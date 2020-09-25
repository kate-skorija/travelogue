import React, { useState } from "react";
import firebase from "firebase/app";
import Nav from './Nav';

function Logout() {

  const [loggedIn, setLoggedIn] = useState(true)

  function doLogout() {
    firebase.auth().signOut().then(function() {
      console.log("Signed out!");
      setLoggedIn(false);
    }).catch(function(error) {
      alert(error.message) ;
    });
  }

  return (
      <React.Fragment>
        <Nav />
        <h3>Thanks for using Travelogue. See you again soon.</h3>
        {loggedIn ? <button onClick={doLogout}>Log Out</button> : <h4>You have successfully logged out!</h4>}
      </React.Fragment>
  )
}

export default Logout;