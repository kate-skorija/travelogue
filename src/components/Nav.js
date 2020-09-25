import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <React.Fragment>
      <h1>Travelogue</h1>
      <button><Link to="/explore">Explore</Link></button>
      <button><Link to="/logout">Logout</Link></button>
    </React.Fragment>
  );
}

export default Nav;