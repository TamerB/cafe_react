import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import MenuItems from '../MenuItems/MenuItems';
import MenuForm from '../MenuForm/MenuForm';

import Aux from '../../../hoc/Aux';
import Cockpit from '../../../components/Cockpit/Cockpit';
import Spinner from '../../../components/Spinner/Spinner';

function MenuBuilder () {
  const [errorMessage, setErrorMessage] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [display, setDisplay] = useState(<Spinner />);


  return (
      <Aux>
        <Cockpit showButton={showMenu} errorMessage={errorMessage} />
        <Switch>
          <Route path="/" exact render={() => <MenuItems setErrorMessage={(msg) => setErrorMessage(msg)} showAddButton={setShowMenu} />} />
          <Route path="/new" exact render={() => <MenuForm setErrorMessage={(msg) => setErrorMessage(msg)}  id='' showAddButton={setShowMenu} submitFunction='addItem' />} />
          <Route path="/edit/:id" exact render={() => <MenuForm setErrorMessage={(msg) => setErrorMessage(msg)}  id='' showAddButton={setShowMenu} submitFunction='updateItem' />} />
        </Switch>
      </Aux>
    );
}

export default MenuBuilder;