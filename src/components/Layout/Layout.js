import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

const layout = (props) => (
  <Aux>
    <div className={classes.Header}>
      <p>CAFE REACT</p>
    </div>
    <main className={classes.ContentWrapper}>
      <div className={classes.Content}>{props.children}</div>
    </main>
  </Aux>
);

export default layout;