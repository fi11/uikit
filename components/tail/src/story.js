import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import Tail from './Tail';

storiesOf('Components/Tail', module)
  .addDecorator(withKnobs)
  .add('main', () => (
    <div style={{ padding: 60 }}>
      <Tail
        direction={text('direction', 'top')}
        size={number('size', 14)}
        shadow={text('shadow', '0px 0px 6px rgba(114, 125, 129, .75)')}
        color={text('color', '#fff')}
      />
    </div>
  ));
