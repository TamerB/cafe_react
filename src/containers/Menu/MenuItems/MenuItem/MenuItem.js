import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './MenuItem.module.css'

const menuItem = (props) => {
  let item = <div className={classes.Card}>
    <div className={classes.ImageContainer}>
      {props.photo === undefined ? <img className={classes.Image}></img> : <img className={classes.Image} src={props.photo}></img>}
    </div>
    <div className={classes.Description}>
      <div className={classes.Details}>
        <h5>{props.type}</h5>
        <h4>{props.name}</h4>
      </div>
      <div className={classes.Price}>
        <p>${props.price}</p>
        <Link id="toggle-display" to={'/edit/' + props.id} className={classes.edit}>Edit</Link>
        <button className={classes.delete} type="button" onClick={props.removeItem}>Delete</button>
      </div>
    </div>
  </div>;

  return item;
};

export default menuItem; 