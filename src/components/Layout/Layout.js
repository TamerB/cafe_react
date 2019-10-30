import React from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

const layout = (props) => (
  <Aux>
    <div className={classes.Header}>
      <Link id="bar-link" to="/" className={classes.BarLink}><p>CAFE REACT</p></Link>
    </div>
    <main className={classes.ContentWrapper}>
      <div className={classes.Content}>{props.children}</div>
    </main>
  </Aux>
);

export default layout;