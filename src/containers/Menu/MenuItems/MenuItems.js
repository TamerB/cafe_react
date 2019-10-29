import React, { useState, useEffect } from 'react';

import axios from '../../../axios-orders';
import MenuItem from '../../../components/MenuItem/MenuItem';
import Spinner from '../../../components/Spinner/Spinner';


const MenuItems = (props) => {
  const [enteredMenu, setEnteredMenu] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.showAddButton(true);
    setLoading(true);
    getMenu();
  }, []);

  const getMenu = () => {
    setLoading(true);
    axios.get('/menu_items.json/')
      .then(response => {
        //newItem();
        console.log(loading);
        setEnteredMenu(response.data || {});
        props.setErrorMessage('');
        //setSubmitFunction('addItem');
        setLoading(false);
      })
      .catch(error => {
        props.setErrorMessage('Something went wrong');
      });
  }

  const removeItem = (key) => {
    setLoading(true);
    axios.delete('/menu_items/' + key + '.json')
      .then(response => {
        getMenu();
      })
      .catch(error => {
        props.setErrorMessage('Something went wrong');
        setLoading(false);
      });
  }

  const editItem = (key) => {
    props.setid(key);
  }


  return (
    loading ? <Spinner /> : (Object.keys(enteredMenu).length > 0 ?
      Object.keys(enteredMenu).map(function(key, value) {
        return <MenuItem
          key={key}
          id={key}
          name={enteredMenu[key].name} 
          type={enteredMenu[key].type}
          price={enteredMenu[key].price}
          photo={enteredMenu[key].photo}
          editItem={() => editItem (key)}
          removeItem={() => removeItem (key)} />
      }) : 
    <p>This menu is empty.</p>)
  );
} 

export default MenuItems;