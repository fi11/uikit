import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { withTag } from '@uikit/styled-react';
import View from './View';

const Link = styled('a.Link', {
  root: {
    color: '#61dafb',
    fontSize: '16px',
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
    marginBottom: 8,
  },
  size: size => ({
    width: size,
    height: size,
  }),
});

const ExtentedView = styled(View, {
  root: {
    border: '1px solid',
    fontSize: '14px',
  },
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
const SectionNotStyled = ({ className, children }) => (
  <section className={`section ${className}`}>{children}</section>
);

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
    <div>
      <BlackSquareWithSize size={50} />
      <BlackSquareWithSize size={50} />
      <BlackSquareWithSize size={50} />
      <BlackSquareWithSize size={50} />
      <BlackSquareWithSize size={55} />
      <BlackSquareWithSize size={50} />
      <BlackSquareWithSize size={55} />
    </div>
  ))
  .add('styled not view component', () => <NotView />)
  .add('styled redefined "span" tag', () => <SpanLink>Span link</SpanLink>)
  .add('extend view with className', () => (
    <ExtentedView className={'test'}>Section</ExtentedView>
  ))
  .add('view as section', () => <View as="section">Section</View>)
  .add('extend view as section', () => (
    <ExtentedView as="section">Section</ExtentedView>
  ))
  .add('extend view as not styled react component', () => (
    <ExtentedView as={SectionNotStyled}>Section</ExtentedView>
  ))
  .add('extend view as styled Link', () => (
    <ExtentedView as={Link}>Section</ExtentedView>
  ));
