import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import ListItem from '../../app/components/ListItem'

function setup() {
  let props = {
    title: 'Test',
    subtitle: 'Test ST',
    imageUrl: 'test://url',
    onDetailsTap: expect.createSpy(),
    onFavoriteTap: expect.createSpy(),
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<ListItem {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ListItem component', () => {
  it('should render correctly', () => {
    const { output } = setup();
    expect(TestUtils.isElementOfType(output, Card)).toBe(true);

    const [cardMedia, cardActions] = output.props.children;
    expect(TestUtils.isElementOfType(cardMedia, CardMedia)).toBe(true);
    expect(TestUtils.isElementOfType(cardActions, CardActions)).toBe(true);

    const [flatButton, iconButton] = cardActions.props.children;
    expect(TestUtils.isElementOfType(flatButton, FlatButton)).toBe(true);
    expect(TestUtils.isElementOfType(iconButton, IconButton)).toBe(true);
  });

  it('should call onDetailsTap when details button is tapped', () => {
    const { props, output } = setup();
    const flatButton = output.props.children[1].props.children[0];
    flatButton.props.onTouchTap();
    expect(props.onDetailsTap.calls.length).toBe(1);
  });

  it('should call onFavoriteTap when favorite button is tapped', () => {
    const { props, output } = setup();
    const button = output.props.children[1].props.children[1];
    button.props.onTouchTap();
    expect(props.onFavoriteTap.calls.length).toBe(1);
  });
});