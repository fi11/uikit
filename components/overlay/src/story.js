import React from 'react';
import { storiesOf } from '@storybook/react';
import '@uikit/styled-react';
import styled from '@uikit/styled';
import Overlay from './index';

const Root = styled('div', {
  root: {
    position: 'relative',
    width: 100,
    height: 100,
  },
});

storiesOf('Components/Overlay', module)
  .add('Default overlay', () => (
    <Root>
      <div>Text</div>
      <Overlay />
    </Root>
  ))
  .add('Custom overlay', () => (
    <Root>
      <div>Text</div>
      <Overlay color="red" opacity={0.5} />
    </Root>
  ));
