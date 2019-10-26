import React, { useState } from "react";
import { expect } from 'chai';
import { configure, shallow } from "enzyme";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import MenuBuilder from "./MenuBuilder";
import Menu from '../../components/Menu/Menu';
import MenuForm from '../../components/MenuForm/MenuForm';
import Cockpit from '../../components/Cockpit/Cockpit';



configure({adapter: new Adapter()});

describe("MenuBuilder", () => {
  it("should render no menu nor form", () => {
    const wrapper = shallow(<MenuBuilder />);
    expect(wrapper.find(Menu)).to.have.lengthOf(0);
  });
  /*it("should render form", () => {
    const wrapper = render(<MenuBuilder />);
    wrapper.find('#toggle-display').props().onClick();
    expect(wrapper.find(MenuForm)).to.have.lengthOf(1);
  });*/
});