import React from 'react';

import MenuItem from './MenuItem/MenuItem'

const menu = (props) => props.menu.map((item, index) => {
            return <MenuItem
              key={item.id}
              name={item.name} 
              type={item.type}
              price={item.price}
              photo={item.photo} />
          });

export default menu;