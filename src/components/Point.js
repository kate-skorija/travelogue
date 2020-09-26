import React from "react";
import PropTypes from "prop-types";
import styles from './Point.module.css';

function Point(props){

  return (
    <React.Fragment>
      <div className={styles.point} onClick = {() => props.whenPointClicked(props.id)}></div>
    </React.Fragment>
  );
}

Point.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  name: PropTypes.string,
  country: PropTypes.string,
  notes: PropTypes.string,
  userId: PropTypes.string,
  whenPointClicked: PropTypes.func
}

export default Point;

