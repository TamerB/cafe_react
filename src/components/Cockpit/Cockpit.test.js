import React, { useState } from "react";
import { expect } from 'chai';
import { configure, shallow } from "enzyme";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import Cockpit from './Cockpit';

configure({adapter: new Adapter()});

describe("Cockpit", () => {
  it("should have a 'Menu' title and 'Add menu item' button", () => {
    const wrapper = shallow(<Cockpit />);
    wrapper.setProps({showButton: true});
    expect(wrapper.find('h2').text()).to.equal('Menu');
    expect(wrapper.find('#toggle-display').text()).to.equal('Add menu item');
  });

  it("should have a 'Add menu item' title and no buttons", () => {
    const wrapper = shallow(<Cockpit />);
    wrapper.setProps({showButton: false});
    expect(wrapper.find('h2').text()).to.equal('Add menu item');
    expect(wrapper.find('#toggle-display').text()).to.equal('Go Back');
  });
});