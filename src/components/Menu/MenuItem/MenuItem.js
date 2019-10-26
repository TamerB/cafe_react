import React from 'react';
import PropTypes from 'prop-types';


import classes from './MenuItem.module.css'

const menuItem = (props) => {
  let item = <div className={classes.Card}>
    <img src={props.photo}></img>
    <div className={classes.Description}>
      <div className={classes.Details}>
        <h5>{props.type}</h5>
        <h4>{props.name}</h4>
      </div>
      <div className={classes.Price}>
        <p>${props.price}</p>
      </div>
    </div>
  </div>;

  return item;
};

menuItem.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired
}

export default menuItem; 