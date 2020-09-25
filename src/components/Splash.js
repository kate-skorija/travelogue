import React from 'react';
import { Link } from 'react-router-dom';

function Splash() {

  return (
    <React.Fragment>
      <h1>Travelogue</h1>
      <p>Your visual travel journal. Explore our map to keep track of places you want to go, and places you’ve been. Create a free account to save your pins.</p>
      <button><Link to="/register">Register</Link></button>
      <button><Link to="/login">Login</Link></button>
    </React.Fragment>
  );
}

export default Splash;