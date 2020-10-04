import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Splash.module.css';

function Splash() {

  return (
    <React.Fragment>
      <div className={styles.splash}>
          <h1>Travelogue</h1>
          <div className={styles.splashContent}>
            <p>Your visual travel journal. Explore our map to keep track of places you want to go, and places you’ve been. Create a free account to save your pins.</p>
            <button><Link to="/register">Register</Link></button>
            <button><Link to="/login">Login</Link></button>
          </div>
      </div>
    </React.Fragment>
  );
}

export default Splash;