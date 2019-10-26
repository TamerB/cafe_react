import React, { useState } from 'react';

import Aux from '../../hoc/Aux';
import Menu from '../../components/Menu/Menu';
import Cockpit from '../../components/Cockpit/Cockpit';
import MenuForm from '../../components/MenuForm/MenuForm';

function MenuBuilder () {
  const [enteredMenu, setEnteredMenu] = useState([]);
  const [id, setid] = useState(0);
  const [type, settype] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [photo, setphoto] = useState('');
  const [photoClass, setphotoClass] = useState('blue');
  const [showMenu, setShowMenu] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    let submitted = {id: id, type: type, name: name, price: price, photo: photo};

    if (isValid(submitted)) {
      setEnteredMenu(enteredMenu => ([...enteredMenu, submitted]));

      setid(id + 1);
      settype('');
      setname('');
      setprice('');
      setphoto('');
      setphotoClass('blue');
      
      toggleFormHandler();
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
      let temp = /[png|PNG|jpg|JPG|jpeg|JPEG]$/.test(event.target.value) ? event.target.value : '';
      setphoto(temp);
      setphotoClass(event.target.value === '' ? 'red' : 'blue');
    } else if (tagType === 'price') {
      setprice(Number(event.target.value) || '');
    } else {
      eval('set' + tagType)(event.target.value);
    }
  }

  return (
      <Aux>
        <Cockpit showButton={showMenu} clicked={toggleFormHandler} />
        {showMenu ? (enteredMenu.length > 0 ? <Menu menu={enteredMenu} /> : <p>This menu is empty.</p>) : <MenuForm formValues={{type: type, name: name, price: price, photo: [photo, photoClass]}} changed={(event, tagType) => changeFormValue(event, tagType)} validatePhoto={validatePhoto} submitHandler={submitHandler} />}
      </Aux>
    );
}

export default MenuBuilder;