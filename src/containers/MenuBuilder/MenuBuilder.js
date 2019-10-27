import React, { useState, useEffect } from 'react';

import Aux from '../../hoc/Aux';
import Menu from '../../components/Menu/Menu';
import Cockpit from '../../components/Cockpit/Cockpit';
import MenuForm from '../../components/MenuForm/MenuForm';
import Spinner from '../../components/Spinner/Spinner';
import axios from '../../axios-orders';

function MenuBuilder () {
  const [enteredMenu, setEnteredMenu] = useState([]);
  const [id, setid] = useState(0);
  const [type, settype] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [photo, setphoto] = useState('');
  const [photoClass, setphotoClass] = useState('blue');
  const [showMenu, setShowMenu] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    setLoading(true);
    axios.get('/menu_items.json')
      .then(response => {
        setEnteredMenu(response.data);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Something went wrong');
      });
      setLoading(false);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let submitted = {type: type, name: name, price: price, photo: photo};
    if (isValid(submitted)) {
      setLoading(true);
      axios.post('/menu_items.json', submitted)
      .then(response => {
        setErrorMessage('');
        toggleFormHandler();
        
        getMenu();
        settype('');
        setname('');
        setprice('');
        setphoto('');
        setphotoClass('blue');        
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Something went wrong');
        setLoading(false);
      });
    }
  }

  const validatePhoto = () => {
    setphotoClass(photo === '' ? 'red' : 'blue');
  }

  const isValid = (temp) => {
    return eval(temp) !== '';
  }

  const toggleFormHandler = () => {
    const doesShow = showMenu;
    setShowMenu(!doesShow);
  }

  const changeFormValue = (event, tagType) => {
    if (tagType === 'photo') {
      let temp = /[png|PNG|jpg|JPG|jpeg|JPEG]$/.test(event.target.files[0].name) ? event.target.files[0].name : '';
      setphoto(temp);
      setphotoClass(event.target.value === '' ? 'red' : 'blue');
    } else if (tagType === 'price') {
      setprice(Number(event.target.value) || '');
    } else {
      eval('set' + tagType)(event.target.value);
    }
  }

  const getDisplay = () => {
    if (loading)
      return <Spinner />;
    if (showMenu) {
      if (!(Object.entries(enteredMenu).length === 0 && enteredMenu.constructor === Object))
        return <Menu menu={enteredMenu} />;
      return <p>This menu is empty.</p>;
    }
    return <MenuForm formValues={{type: type, name: name, price: price, photo: [photo, photoClass]}} changed={(event, tagType) => changeFormValue(event, tagType)} validatePhoto={validatePhoto} submitHandler={submitHandler} />;
  }

  return (
      <Aux>
        <Cockpit showButton={showMenu} clicked={toggleFormHandler} errorMessage={errorMessage} />
        {getDisplay()}
      </Aux>
    );
}

export default MenuBuilder;