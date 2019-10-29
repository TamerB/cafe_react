import React, { useState } from "react";
import { expect } from 'chai';
import { configure, shallow } from "enzyme";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import MenuItem from './MenuItem';

configure({adapter: new Adapter()});

describe("MenuItem", () => {
  it("should have one image", () => {
    const wrapper = shallow(<MenuItem />);
    wrapper.setProps({image: 'imagepath'});
    expect(wrapper.find('img')).to.have.lengthOf(1);
  });

  it("should have h5 type 'Main Course'", () => {
    const wrapper = shallow(<MenuItem />);
    wrapper.setProps({type: 'Main Course'});
    expect(wrapper.find('h5').text()).to.equal('Main Course');
  });

  it("should have h4 name 'Pasta'", () => {
    const wrapper = shallow(<MenuItem />);
    wrapper.setProps({name: 'Pasta'});
    expect(wrapper.find('h4').text()).to.equal('Pasta');
  });

  it("should have p price '$154'", () => {
    const wrapper = shallow(<MenuItem />);
    wrapper.setProps({price: '154'});
    expect(wrapper.find('p').text()).to.equal('$154');
  });
});