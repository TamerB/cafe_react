import React, { useState, useEffect } from 'react';

import Aux from '../../hoc/Aux';
import Menu from '../../components/Menu/Menu';
import Cockpit from '../../components/Cockpit/Cockpit';
import MenuForm from '../../components/MenuForm/MenuForm';
import Spinner from '../../components/Spinner/Spinner';
import axios from '../../axios-orders';

function MenuBuilder () {
  const [enteredMenu, setEnteredMenu] = useState({});
  const [id, setid] = useState(null);
  const [type, settype] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [photo, setphoto] = useState('');
  const [photoClass, setphotoClass] = useState('blue');
  const [showMenu, setShowMenu] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitFunction, setSubmitFunction] = useState('addItem');
  const [formFunction, setFormFunction] = useState('add')

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    setLoading(true);
    axios.get('/menu_items.json/')
      .then(response => {
        newItem();
        setEnteredMenu(response.data || {});
        setErrorMessage('');
        setSubmitFunction('addItem');
      })
      .catch(error => {
        setErrorMessage('Something went wrong');
      });
      setLoading(false);
      setErrorMessage('');
  }

  const removeItem = (key) => {
    setLoading(true);
    axios.delete('/menu_items/' + key + '.json')
      .then(response => {
        getMenu();
      })
      .catch(error => {
        setErrorMessage('Something went wrong');
        setLoading(false);
      });
  }

  const editItem = (key) => {
    setid(key)
    settype(enteredMenu[key].type);
    setname(enteredMenu[key].name);
    setprice(enteredMenu[key].price);
    setphoto(enteredMenu[key].photo || '');
    setphotoClass('blue');
    setSubmitFunction('updateItem');
    toggleFormHandler();
  }

  const updateItem = (submitted) => {
    setLoading(true);
    axios.put('/menu_items/' + id + '.json', submitted)
    .then(response => {
      setErrorMessage('');
      toggleFormHandler();
      getMenu();
    })
    .catch(error => {
      setErrorMessage('Something went wrong');
      setLoading(false);
    });
  }

  const newItem = () => {
    setid(null);
    settype('');
    setname('');
    setprice('');
    setphoto('');
    setphotoClass('blue');
  }

  const addItem = (submitted) => {
    setLoading(true);
    axios.post('/menu_items.json', submitted)
    .then(response => {
      setErrorMessage('');
      toggleFormHandler();
      getMenu();     
    })
    .catch(error => {
      setErrorMessage('Something went wrong');
      setLoading(false);
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let submitted = {type: type, name: name, price: price, photo: photo};
    if (isValid(submitted)) {
      eval(submitFunction)(submitted);
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
    if(!doesShow) {
      eval(submitFunction)();
    }
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
      if (Object.keys(enteredMenu).length > 0)
        return <Menu menu={enteredMenu} removeItem={(key) => removeItem(key)} editItem={(key) => editItem(key)} />;
      return <p>This menu is empty.</p>;
    }
    return <MenuForm formValues={{type: type, name: name, price: price, photo: [photo, photoClass]}} changed={(event, tagType) => changeFormValue(event, tagType)} validatePhoto={validatePhoto} submitHandler={submitHandler} formFunction={submitFunction} />;
  }

  return (
      <Aux>
        <Cockpit showButton={showMenu} clicked={toggleFormHandler} errorMessage={errorMessage} />
        {getDisplay()}
      </Aux>
    );
}

export default MenuBuilder;