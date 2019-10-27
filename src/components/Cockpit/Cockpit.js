import React from 'react';

import classes from './Cockpit.module.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {
  return (
    <Aux>
      <div className={classes.Container}>
        <div className={classes.Wrapper}>
          <div className={classes.Title}>
            <h2>{props.showButton ? 'Menu' : 'Add menu item'}</h2>
          </div>
          <div className={classes.AddButton}>
            {props.showButton ? <button id="toggle-display" className={classes.Button} onClick={props.clicked}>Add menu item</button> : null}
          </div>
        </div>
        {props.errorMessage ? <div className={classes.Wrapper}>
          <p className={classes.error}>{props.errorMessage}</p>
        </div>: null}
      </div>
    </Aux>
  );
};

export default cockpit;