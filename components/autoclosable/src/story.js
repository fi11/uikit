import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoClosable from './AutoClosable';

const Popup = ({ children }) => (
  <div
    style={{ width: 140, height: 80, padding: 20, border: '1px solid #ccc' }}
  >
    {children}
  </div>
);

storiesOf('AutoClosable', module).add('AutoClosable Popup window', () => (
  <AutoClosable onClose={action('close')}>
    <Popup>Popup window</Popup>
  </AutoClosable>
));
