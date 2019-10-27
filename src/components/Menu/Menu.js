import React from 'react';

import MenuItem from './MenuItem/MenuItem'

const menu = (props) => Object.keys(props.menu).map(function(key, value) {
  return <MenuItem
    key={key}
    name={props.menu[key].name} 
    type={props.menu[key].type}
    price={props.menu[key].price}
    photo={props.menu[key].photo} />
});

export default menu;