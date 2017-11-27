import React from 'react';
import { storiesOf } from '@storybook/react';
import '@uikit/styled-react';
import styled, { withTag } from '@uikit/styled';
import View from './View';

const Link = styled('a.Link', {
  root: {
    color: '#61dafb',
  },
});

const BlackSquare = styled(View, {
  root: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
});

const RedSquare = styled(BlackSquare, {
  root: {
    backgroundColor: 'red',
  },
});

const RedSquareWithBoarder = styled(RedSquare, {
  root: {
    backgroundColor: 'red',
  },
  hasBorder: {
    border: '3px solid black',
  },
  white: {
    backgroundColor: 'white',
  },
});

const SquareWithThemedBorder = styled(RedSquareWithBoarder, {
  root: {
    backgroundColor: 'red',
  },
  hasBorder: {
    border: '3px solid black',
  },
  'theme:green': {
    border: '3px solid green',
  },
});

const BlackSquareWithSize = styled(RedSquareWithBoarder, {
  root: {
    backgroundColor: 'black',
  },
  size: size => ({
    width: size,
    height: size,
  }),
});

const SomeComponent = ({ className }) => <div className={className} />;
const NotView = styled(SomeComponent, {
  root: {
    width: 200,
    height: 200,
    backgroundColor: '#333',
  },
});

const SpanLink = withTag(Link, 'span');

storiesOf('View', module)
  .add('flex box', () => (
    <View
      style={{
        width: 300,
        justifyContent: 'space-between',
        background: '#ccc',
        padding: 10,
      }}
    >
      <View>1</View>
      <View>2</View>
      <View>3</View>
    </View>
  ))
  .add('styled "a" tag', () => (
    <Link href="https://facebook.github.io/react/" target="_blank">
      React
    </Link>
  ))
  .add('styled view', () => <BlackSquare />)
  .add('styled view extend', () => <RedSquare />)
  .add('styled view with conditional', () => <RedSquareWithBoarder hasBorder />)
  .add('styled view with theme', () => (
    <SquareWithThemedBorder hasBorder theme="green" white />
  ))
  .add('styled view with style rule as func', () => (
    <BlackSquareWithSize size={400} />
  ))
  .add('styled not view component', () => <NotView />)
  .add('styled redefined "span" tag', () => <SpanLink>Span link</SpanLink>);
