import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {

  return (
    <React.Fragment>
      <div className={styles.navBar}>
        <h1 className={styles.h1}><em>TRAVELOGUE</em></h1>
        {/* <button className={styles.navButton}><Link to="/explore">Explore</Link></button> */}
        <button className={styles.navButton}><Link to="/logout">Logout</Link></button>
      </div>
    </React.Fragment>
  );
}

export default Nav;