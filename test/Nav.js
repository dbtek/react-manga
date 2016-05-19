import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Nav from '../app/components/Nav';

const mockItems = [{
  url: '/test/link',
  icon: 'test-icon',
  label: 'test label'
}]

describe("Nav test suite", function() {
  it("has Drawer component", function() {
    let res = shallow(
      <Nav items={[]}/>
    );
    expect(res.name()).toBe('Drawer');
  });

  it("has one MenuItem component", function() {
    let res = shallow(
      <Nav items={mockItems}/>
    );
    expect(res.find('MenuItem').length).toBe(1);
  });
});
