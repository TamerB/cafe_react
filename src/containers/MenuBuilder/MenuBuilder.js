import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Menu from '../../components/Menu/Menu';
import Cockpit from '../../components/Cockpit/Cockpit';
import MenuForm from '../../components/MenuForm/MenuForm';

class MenuBuilder extends Component {
  state = {
    menu: [
      {id: 1, name: "Pizza Margherita", type: "MAIN COURSE", price: 5, photo: ''},
      {id: 2, name: "Pizza Margherita", type: "MAIN COURSE", price: 5, photo: ''},
      {id: 3, name: "Pizza Margherita", type: "MAIN COURSE", price: 5, photo: ''}
    ],
    temp: {id: 4, name: '', type: '', price: '', photo: ['', '']},
    showMenu: true,
    loading: false,
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.setState( { loading: true } );
    let submitted = {id: this.state.temp.id, type: this.state.temp.type, name: this.state.temp.name, price: this.state.temp.price, photo: this.state.temp.photo[0]};
    if (this.isValid(submitted)) {
      this.setState({menu: [...this.state.menu, submitted]});
      let counter = this.state.temp.id+1;
      this.setState({temp: {
        id: counter,
        type: [''],
        name: [''],
        price: [''],
        photo: ['', '']
      }});
      this.toggleFormHandler();
    }
  }

  validatePhoto = () => {
    let red = this.state.temp.photo[0] === '' ? 'red' : '';
    let temp = {id: this.state.temp.id, type: this.state.temp.type, name: this.state.temp.name, price: this.state.temp.price, photo: [this.state.temp.photo[0], red]};
    this.setState({temp: temp});
  }

  isValid = (temp) => {
    for (let value in temp) {
      if (temp[value] === '')
        return false;
    }
    return true;
  }

  toggleFormHandler = () => {
    const doesShow = this.state.showMenu;
    this.setState({showMenu: !doesShow});
  }

  changeFormValue = (event, tagType) => {
    let temp = {...this.state.temp};
    if (tagType === 'photo') {
      temp.photo[0] = /[png|PNG|jpg|JPG|jpeg|JPEG]$/.test(event.target.value) ? event.target.value : '';
      temp.photo[1] = temp.photo[0] === '' ? 'red' : '';
    } else if (tagType === 'price') {
      temp[tagType] = Number(event.target.value) || '';
    } else {
      temp[tagType] = event.target.value;
    }
    this.setState({temp: temp});
  }

  render () {
    let menu = <Menu menu={this.state.menu} />
    let menuForm = <MenuForm formValues={this.state.temp} changed={(event, tagType) => this.changeFormValue(event, tagType)} validatePhoto={this.validatePhoto} submitHandler={this.submitHandler} />
    return (
      <Aux>
        <Cockpit showButton={this.state.showMenu} clicked={this.toggleFormHandler} />
        {this.state.showMenu ? menu : menuForm}
      </Aux>
    );
  }
}

export default MenuBuilder;